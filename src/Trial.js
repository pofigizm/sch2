import React from 'react'
import Timer from './Timer'
import Tasks from './Tasks'
import './Trial.css'

class Try extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      complexity: {},
      timeComplexity: 0,

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
          complexity={this.state.complexity}
          answers={this.state.answers}
          onComplexity={this.handleComplexity}
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
        timeComplexity: time,
      })
      return
    }

    if (stage === 2) {
      this.setState({
        stage: 3,
        timeSimple: time,
      })
      return
    }

    this.setState({
      timeHard: time,
    }, () => {
      this.props.onFinish(this.props.id, {
        id: this.props.id,
        ...this.state
      })
    })
  }

  handleComplexity = (id, value) => {
    this.setState({
      complexity: {
        ...this.state.complexity,
        [id]: value,
      }
    })
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
