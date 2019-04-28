import React from 'react'
import Trial from './Trial'
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

const generate = tasks => {
  const all = Object.values(tasks)

  return shuffle(all.filter(t => t.hard && !t.solved)).slice(0, 10)
}

class App extends React.PureComponent {
  state = {
    ...(read() || tasksData),
    current: null,
  }

  render() {
    const { current } = this.state

    return (
      <div className="app">
 
        { current && (
          <Trial
            id={current.id}
            tasks={current.tasks}
            onSolved={this.handleSolve}
            onFinish={this.handleFinish}
          />
        ) }

        { !current && (
          <div>
            <ul>
              { (this.state.trials || []).map(trial => (
                <li key={trial.id}>
                  {trial.id}: {(new Date(trial.ts)).toString()} 
                </li>
              )) }
            </ul>
            <button className="newButton" onClick={this.handleStart}> Новое </button>
          </div>
        ) }
          
      </div>
    )
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
}

export default App
