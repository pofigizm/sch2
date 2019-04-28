import React from 'react'
import Timer from './Timer'
import Tasks from './Tasks'
import './Trial.css'

class Try extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      answers: {},
      timeSimple: 0,
      timeHard: 0,

      stage: 0,

      ...props.current,
    }
  }

  render() {
    const { sec, stage, answers } = this.state
    const { tasks } = this.props.current

    return (
      <div className="try">
        <Timer 
          sec={sec}
          stage={stage}
          onNextStage={this.handleNextStage}
          onClose={this.handleClose}
        />
        <Tasks
          stage={stage}
          tasks={tasks}
          answers={answers}
          onSolved={this.handleSolved}
          onProblem={this.handleProblem}
          onAnswer={this.handleAnswer}
        />
      </div>
    )
  }

  handleNextStage = (time, sec) => {
    const { stage } = this.state

    if (stage === 0) {
      this.setState({
        sec,
        stage: 1,
      })
      return
    }

    if (stage === 1) {
      this.setState({
        sec,
        stage: 2,
        timeSimple: time,
      })
      return
    }

    this.setState({
      sec,
      stage: 3,
      timeHard: time,
    }, () => {
      this.props.onFinish({
        ...this.state
      })
    })
  }

  handleClose = () => {
    const { onHide } = this.props
    onHide()
  }

  handleSolved = (id) => {
    const { current, onSolved } = this.props
    const { tasks } = current

    const ix = tasks.findIndex(t => t.id === id)
 
    onSolved(ix)
  }

  handleProblem = (id) => {
    const { onProblem } = this.props
 
    onProblem(id)
  }

  handleAnswer = (id, value) => {
    const { answers } = this.state

    this.setState({
      answers: {
        ...answers,
        [id]: value,
      }
    })
  }
}

export default Try
