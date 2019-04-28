import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: 30,
  },
 	button: {
    	margin: theme.spacing.unit,
    	marginLeft: 0,
    	marginRight: 20,
    	width: 80,
 	},
  	input: {
    	display: 'none',
  	},
});


function Buttons({
	onPressStart = () => {},	
	onPressClear = () => {},
	count,
	classes,
}) {
	return (
    <div className={classes.root}>
			<Button
				variant="contained"
				color="primary"
       			onClick={() => onPressStart('s')}
       			className={classes.button}
       		>
       			{count ? 'stop' : 'start'}
       		</Button>
			<Button
				variant="contained"
				color="primary"
       			onClick={() => onPressClear('c')}
       			className={classes.button}
       		>
       			clear
       		</Button>
		</div>
	)
}

export default withStyles(styles)(Buttons)
