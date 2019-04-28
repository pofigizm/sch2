import React from 'react'
import './Tasks.css'

class Tasks extends React.PureComponent {
  render() {
    const { stage, tasks } = this.props
    const tasksClass = stage === 0 ? 'tasks blur' : 'tasks'

    return (
      <ol className={tasksClass} >
        { tasks
          .map(task => (
          <li key={task.id}>
            <span dangerouslySetInnerHTML={{ __html: task.content }} />
            { this.renderInput(task.id) }
          </li>
        )) }
      </ol>
    )
  }

  renderInput(id) {
    const { answers, onSolved, onAnswer } = this.props
    const current = answers[id] || ''

    return (
      <div className="input">
        <input value={ current } onChange={ (ev) => onAnswer(id, ev.target.value) } />
        <button onClick={ () => onSolved(id) }>Solved</button>
      </div>
    )
  }
}

export default Tasks
