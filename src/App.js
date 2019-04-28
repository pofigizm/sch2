import React from 'react'
import Try from './Try'
import tasksData from './tasks.json'
import './App.css'

class App extends React.PureComponent {
  state = {
    id: 1,
    current: Object.values(tasksData).slice(0, 10),
  }

  render() {
    const { id, current } = this.state

    return (
      <div className="app">
        { Boolean(id) && (
          <Try
            id={1}
            tasks={current}
            onFinish={this.handleFinish}
          />
        ) }
      </div>
    )
  }

  handleFinish = (id, data) => {
    this.setState({
      id: 0,
    })
    console.log(data)
  }
}

export default App
