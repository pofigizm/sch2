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

  const easy = all.filter(t => !t.hard && t.list > 5)
  const hard = all.filter(t => t.hard && t.list < 12)
  const extraHard = all.filter(t => t.hard && t.list > 11)

  const res = []
    .concat(shuffle(easy).slice(0, 1))
    .concat(shuffle(hard).slice(0, 8))
    .concat(shuffle(extraHard).slice(0, 1))
  
  return shuffle(res)
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

  handleFinish = (id, data) => {
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
