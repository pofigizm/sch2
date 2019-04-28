import React from 'react'
import Buttons from './Buttons'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	root: {
   		...theme.mixins.gutters(),
   		paddingTop: theme.spacing.unit * 2,
   		paddingBottom: theme.spacing.unit * 2,
   		width: 350,
      display: 'flex',
      position: 'fixed',
      top: 10,
      left: 'calc(50% - 175px)',
      backgroundColor: 'white',
      zIndex: 100,
  	},
})

const zero = (dig) => ('0' + dig).slice(-2)
const humanTime = (seconds) => {
  let sec = seconds

  const hours = sec / 3600 | 0
  sec = sec - hours * 3600
  const min = sec / 60 | 0
  sec = sec - min * 60

  return `${zero(hours)}:${zero(min)}:${zero(sec)}`
}

class Timer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			sec: props.sec || 0,
		}

		this.timer = window.setInterval(() => {
      const { stage } = this.props
			if (stage > 0 && stage < 3) {
				const sec = this.state.sec + 1
				this.setState({ sec })
			} 
		}, 1000);
	}

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

	render() {
    const { stage } = this.props
		let { sec } = this.state

		const { classes } = this.props
		return (
			<div>
				<Paper className={classes.root} elevation={5}>
					<Typography 
						variant="h3" 
						component="h3"
					>
						{humanTime(sec)}
					</Typography>
          <Buttons
            stage={stage} 
            onPress={this.handleButton}
          />
				</Paper>
			</div>
		)
	}

	handleButton = () => {
    const { stage, onNextStage, onClose } = this.props;

    if (stage === 3) {
      onClose()
      return
    }

    onNextStage(humanTime(this.state.sec), this.state.sec)
	}
}

export default withStyles(styles)(Timer);
