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
    	width: 120,
 	},
  	input: {
    	display: 'none',
  	},
});


function Buttons({
	onPress = () => {},	
	stage,
	classes,
}) {
	return (
    <div className={classes.root}>
			<Button
				variant="contained"
				color="primary"
        onClick={() => onPress('s')}
        className={classes.button}
      >
        {stage} - {stage ? 'next' : 'start'}
      </Button>
		</div>
	)
}

export default withStyles(styles)(Buttons)
