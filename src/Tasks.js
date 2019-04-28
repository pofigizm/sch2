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
            { this.renderInput(task.id, task.problem) }
          </li>
        )) }
      </ol>
    )
  }

  renderInput(id, problem) {
    const { stage, answers, onSolved, onProblem, onAnswer } = this.props
    const current = answers[id] || ''

    return (
      <div className="input">
        <input value={ current } onChange={ (ev) => onAnswer(id, ev.target.value) } />
        <div className="buttons" >
          <button
            className={stage === 3 ? '' : 'green'}
            disabled={stage === 3}
            onClick={ () => onSolved(id) }
          >
            Solved
          </button>
          <button
            className={(stage < 2 || problem) ? '' : 'red'}
            disabled={(stage < 2 || problem)}
            onClick={ () => onProblem(id) }
          >
            Problem
          </button>
        </div>
      </div>
    )
  }
}

export default Tasks
