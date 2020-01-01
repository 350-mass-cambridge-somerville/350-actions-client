import React from 'react';
import { ActionCard } from '../../interfaces/ActionCard';

import { Paper, Grid } from '@material-ui/core';
import { useStyles, theme } from '../../styles/style';

//import { ActionSurveyDisplay } from '../logic/ActionSurveyDisplay';
import { MainContentHeader } from './MainContentHeader';
import { ActionSurveyForm } from './ActionSurveyForm';
import { ActionSurveyFormAuth } from './ActionSurveyFormAuth';
import { ActionCheckListDisplay } from './ActionCheckListDisplay';

type CurrentActionDisplayProps = {
	actionCard?: ActionCard
	isAuthorized: boolean,
	username: string,
	responderName: string,
	canSubmit: boolean,
	onSubmit: () => void,
	onResponderNameChange: (name: string) => void,
	doneActions: number[],
	onActionDoneChange: (id: number, done: boolean) => void
}

export function CurrentActionDisplay(props: CurrentActionDisplayProps) {
	const classes = useStyles(theme);
	
	function generateSurveyForm() {
		if(props.isAuthorized) {
			return <ActionSurveyFormAuth 
			responderName={props.username}
			onSubmit={props.onSubmit}
			submitAllowed={props.canSubmit}
			/>
		} else if (!props.canSubmit) {
			return <ActionSurveyFormAuth 
			responderName={props.responderName}
			onSubmit={props.onSubmit}
			submitAllowed={props.canSubmit}
			/>
		} else {
			return <ActionSurveyForm 
				responderName={props.responderName}
				onSubmit={props.onSubmit}
				onResponderNameChange={props.onResponderNameChange}
			/>
		}
	}

	return (<div>
		<Paper className={classes.contentMain}>
				<div>
					{props.actionCard && 
						<MainContentHeader mainTitle={`Action Card ${props.actionCard.number}`} date={props.actionCard.date}/>
					}
					<Grid container direction='column' alignItems='stretch'>
					<Grid item>
						{generateSurveyForm()}
					</Grid>
					<Grid item>
						{props.actionCard && 
							<ActionCheckListDisplay actions={props.actionCard.actions}
								doneActions={props.doneActions}
								onActionDoneChange={props.onActionDoneChange}
								surveyResponses={props.actionCard.surveyResponses}
								canSubmit={props.canSubmit}
							/>
						}
					</Grid>
			</Grid>
				</div>
		</Paper>
	</div>);
}