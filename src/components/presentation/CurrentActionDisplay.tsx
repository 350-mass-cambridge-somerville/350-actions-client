import React from 'react';
import { ActionCard } from '../../interfaces/ActionCard';

import { Paper, Typography } from '@material-ui/core';
import { useStyles, theme } from '../../styles/style';

import { ActionSurveyDisplay } from './ActionSurveyDisplay';
import { MainContentHeader } from './MainContentHeader';

type CurrentActionDisplayProps = {
	actionCard?: ActionCard,
	onChange: () => void
}
export function CurrentActionDisplay(props: CurrentActionDisplayProps) {
	const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			{props.actionCard && 
				<div>
					<MainContentHeader mainTitle={`Action Card ${props.actionCard.number}`} date={props.actionCard.date}/>
					<ActionSurveyDisplay actionCard={props.actionCard} onChange={props.onChange}/>
				</div>
			}
		</Paper>
	</div>);
}