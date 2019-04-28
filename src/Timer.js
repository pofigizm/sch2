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
   		width: 440,
      display: 'flex',
      position: 'fixed',
      top: 10,
      left: 'calc(50% - 220px)',
      backgroundColor: 'white',
      zIndex: 100,
  	},
})

const zero = (dig) => ('0' + dig).slice(-2)

class Timer extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			count: false,
			result: 0
		}

		window.setInterval(() => {
			if (this.state.count) {
				const result = this.state.result + 1
				this.setState({ result })
			} 
		}, 100);

	}

	render() {

		let mSec = this.state.result
		const hours = mSec / 36000 | 0
		mSec = mSec - hours * 36000
		const min = mSec / 600 | 0
		mSec = mSec - min * 600
		const sec = mSec / 10 | 0
		mSec = mSec - sec * 10

		const { classes } = this.props
		return (
			<div>
				<Paper className={classes.root} elevation={5}>
					<Typography 
						variant="h3" 
						component="h3"
					>
						{zero(hours)}:{zero(min)}:{zero(sec)}.{mSec}
					</Typography>				
					<Buttons
						count={this.state.count} 
						onPressStart={this.handleStart}
						onPressClear={this.handleClear}
					/>
				</Paper>
			</div>
		)
	}

	handleClear = () => {
		this.setState({ result: 0 })
	}

	handleStart = () => {
		this.setState({ count: !this.state.count })
	}
}

export default withStyles(styles)(Timer);
