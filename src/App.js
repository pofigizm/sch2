import React from 'react'
import Timer from './Timer'
import Tasks from './Tasks'
import tasksData from './tasks.json'
import './App.css'

class App extends React.PureComponent {
  state = {
    current: Object.values(tasksData).slice(0, 10),
  }

  render() {
    return (
      <div className="app">
        <Timer />
        <Tasks tasks={this.state.current} />
      </div>
    )
  }
}

export default App
