import React from 'react'
import Trial from './Trial'
import Tasks from './Tasks'
import tasksData from './tasks.json'
import './App.css'

const KEY = 'SCH2'
const read = () => {
  return JSON.parse(localStorage.getItem(KEY))
}

const save = (data = {}) => {
  return localStorage.setItem(KEY, JSON.stringify(data))
}

const shuffle = arr => {
  const res = [...arr]
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res
}

const generate = (tasks, problem) => {
  const all = Object.values(tasks)

  if (problem) {
    return all.filter(t => !t.solved && t.problem)
  }

  const hard = all.filter(t => t.hard && !t.solved && !t.problem)
  return shuffle(hard).slice(0, 10)
}

const urlParams = new URLSearchParams(window.location.search)
const problem = urlParams.get('problem')

class App extends React.PureComponent {
  state = {
    version: 1,
    ...(read() || tasksData),
    current: null,
  }

  render() {
    const { current } = this.state

    return (
      <div className="app">
 
        { current && (
          <Trial
            current={current}
            onSolved={this.handleSolve}
            onProblem={this.handleProblem}
            onFinish={this.handleFinish}
            onHide={this.handleHide}
          />
        ) }

        { (!problem && !current) && (
          <div>
            <ul>
              { (this.state.trials || []).map(trial => (
                <li key={trial.id} onClick={() => this.handleShow(trial)} >
                  {trial.id}: {(new Date(trial.ts)).toString()} 
                </li>
              )) }
            </ul>
            <button className="button" onClick={this.handleStart}> New </button>
            <button className="button" onClick={this.handleDowndload}> Download </button>
          </div>
        ) }

        { Boolean(problem) && (
          <Tasks
            stage={1}
            tasks={generate(this.state.tasks, true)}
            answers={{}}
            onSolved={() => {}}
            onProblem={() => {}}
            onAnswer={() => {}}
          />
        ) }
          
      </div>
    )
  }

  handleShow = (trial) => {
    this.setState({
      current: trial,
    })
  }

  handleHide = () => {
    this.setState({
      current: null,
    })
  }

  handleSolve = (ix) => {
    const { tasks, current } = this.state
    const task = current.tasks[ix]
    const curIds = current.tasks.map(t => t.id)
    const nextTask = generate(tasks).filter(t => !curIds.includes(t.id))[0] || {}
    const next = [ ...current.tasks ]
    next[ix] = nextTask

    this.setState({
      tasks: {
        ...tasks,
        [task.id]: {
          ...task,
          solved: true,
        },
      },
      current: {
        ...current,
        tasks: next,
      },
    })
  }

  handleProblem = (id) => {
    const { current, tasks } = this.state

    this.setState({
      tasks: {
        ...tasks,
        [id]: {
          ...tasks[id],
          problem: true,
        },
      },
    }, () => {
      const next = current.tasks.map(t => this.state.tasks[t.id])
      this.setState({
        current: {
          ...current,
          tasks: next,
        },
      })
    })
  }

  handleStart = () => {
    const tasks = generate(this.state.tasks)
    const id = Math.max(...(this.state.trials || [{ id: 0 }]).map(t => t.id)) + 1
    const ts = Date.now()

    this.setState({
      current: {
        id,
        ts,
        tasks,
      },
    })
  }

  handleFinish = (data) => {
    const { current, trials } = this.state
    const trial = { ...current, ...data }
    this.setState({
      current: null,
      trials: [ ...(trials || []), trial ],
    }, () => {
      console.log(this.state)
      save(this.state)
    })
  }

  handleDowndload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', `sch2-local-data-${Date.now()}.json`)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
}

export default App
