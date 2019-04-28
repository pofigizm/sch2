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
    }
  }

  render() {
    return (
      <div className="try">
        <Timer 
          stage={this.state.stage}
          onNextStage={this.handleNextStage}
        />
        <Tasks
          stage={this.state.stage}
          tasks={this.props.tasks}
          answers={this.state.answers}
          onSolved={this.handleSolved}
          onAnswer={this.handleAnswer}
        />
      </div>
    )
  }

  handleNextStage = (time) => {
    const { stage } = this.state

    if (stage === 0) {
      this.setState({
        stage: 1,
      })
      return
    }

    if (stage === 1) {
      this.setState({
        stage: 2,
        timeSimple: time,
      })
      return
    }

    this.setState({
      timeHard: time,
    }, () => {
      this.props.onFinish({
        id: this.props.id,
        ...this.state
      })
    })
  }

  handleSolved = (id) => {
    const { tasks, onSolved } = this.props
    const ix = tasks.findIndex(t => t.id === id)
  
    onSolved(ix)
  }

  handleAnswer = (id, value) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [id]: value,
      }
    })
  }
}

export default Try
