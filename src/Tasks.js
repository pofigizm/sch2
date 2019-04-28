import React from 'react'
import './Tasks.css'

class Tasks extends React.PureComponent {
  render() {
    const { tasks } = this.props

    return (
      <ol className="tasks">
        { tasks.map(task => (
          <li key={task.id}>
            <span dangerouslySetInnerHTML={{ __html: task.content }} />
            { this.renderButtons() }
          </li>
        )) }
      </ol>
    )
  }

  renderButtons() {
    return (
      <div className="buttons">
        <button >Легко</button>
        <button >Сложно</button>
      </div>
    )
  }
}

export default Tasks
