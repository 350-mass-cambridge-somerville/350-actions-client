import React from 'react';
import { ActionCard } from '../interfaces/ActionCard';

import { Paper, Typography } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';

import { ActionSurveyDisplay } from './ActionSurveyDisplay';

type CurrentActionDisplayProps = {
	actionCard: ActionCard
}
export function CurrentActionDisplay(props: CurrentActionDisplayProps) {
	const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			{props.actionCard && 
				<div>
					<Typography className={classes.contentTitle} variant="h1" >Current Actions: {props.actionCard.actions.length}</Typography>
					<ActionSurveyDisplay actionCard={props.actionCard}/>
				</div>
			}
		</Paper>
	</div>);
}