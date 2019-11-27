import React from 'react';
import { ActionCard } from '../interfaces/ActionCard';

import { Paper, Typography } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';

import { ActionSurveyDisplay } from './ActionSurveyDisplay';

type CurrentActionDisplayProps = {
	actionCard?: ActionCard
}
export function CurrentActionDisplay(props: CurrentActionDisplayProps) {
	const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			<Typography>
              Sustained, Coordinated, Relentless, Collective Climate Action
            </Typography>
			{props.actionCard && 
				<div>
					<Typography className={classes.contentTitle} variant="h1" >Action Card #{props.actionCard.number}</Typography>
					<Typography>{props.actionCard.date.toDateString()}</Typography>
					<ActionSurveyDisplay actionCard={props.actionCard}/>
				</div>
			}
		</Paper>
	</div>);
}