import React, { useState, ReactNode } from 'react';
import {Action} from '../interfaces/Action';
import {
	Card, 
	CardActionArea,
	CardContent, 
	Switch, 
	Typography,
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	card: {
	  display: 'flex',
	},
	content: {
	  flex: '1 0.33 auto',
	},
	done: {
		width: '30%'
	},
  }));

export function ActionCard(props: {action: Action}) {
	const classes = useStyles();
	//const theme = useTheme();
	const [done, setDone] = useState(false);

	function onCheck(event: any, checked: boolean) {
		setDone(checked);
	};

	return (<Card className={classes.card}>
		<CardActionArea className={classes.done}>
			<Switch checked={done} onChange={onCheck}/>
		</CardActionArea>
		<CardContent className={classes.content}>
			<Typography dangerouslySetInnerHTML={{__html: props.action.description}}></Typography>
		</CardContent>
	</Card>);
}
