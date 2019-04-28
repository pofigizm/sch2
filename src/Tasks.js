import React from 'react'
import './Tasks.css'

const btnClass = (cur = null, ref) => {
  if (cur === null) {
    return 'none'
  }

  if (cur === ref) {
    return ref ? 'green' : 'red'
  }

  return 'gray'
}

const contentClass = (stage, cur) => {
  if ((stage === 0) || (stage === 2 && !cur) || (stage === 3 && cur)) {
    return 'blur'
  }

  return ''
}

class Tasks extends React.PureComponent {
  render() {
    const { stage, tasks, complexity } = this.props

    return (
      <ol className="tasks" >
        { tasks
          .map(task => (
          <li key={task.id}>
            <span 
              className={ contentClass(stage, complexity[task.id]) }
              dangerouslySetInnerHTML={{ __html: task.content }}
            />
            { stage > 1 ? this.renderInput(task.id) : this.renderButtons(task.id) }
          </li>
        )) }
      </ol>
    )
  }

  renderButtons(id) {
    const { stage, complexity, onComplexity } = this.props
    const current = complexity[id]

    if (stage === 0) {
      return (
        <div className="buttons" />
      )
    }

    return (
      <div className="buttons">
        <button className={ btnClass(current, true) } onClick={ () => onComplexity(id, true) }>Легко</button>
        <button className={ btnClass(current, false) } onClick={ () => onComplexity(id, false) }>Сложно</button>
      </div>
    )
  }

  renderInput(id) {
    const { stage, complexity, answers, onAnswer } = this.props
    const current = answers[id] || ''

    if ((stage === 2 && !complexity[id]) || (stage === 3 && complexity[id])) {
      return (
        <div className="input" />
      )
    }

    return (
      <div className="input">
        <input value={ current } onChange={ (ev) => onAnswer(id, ev.target.value) } />
      </div>
    )
  }
}

export default Tasks
