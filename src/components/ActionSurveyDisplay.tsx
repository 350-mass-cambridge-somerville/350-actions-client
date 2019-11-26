import React, { Component, } from 'react';
import { Grid } from '@material-ui/core';
import { ActionListDisplay } from './ActionListDisplay';
import { ActionSurveyForm } from './ActionSurveyForm';
import { Action } from '../interfaces/Action';
import { ActionCard } from '../interfaces/ActionCard';
import { SurveyResponse } from '../interfaces/SurveyResponse';

type ActionSurveyDisplayState = {

};

type ActionSurveyDisplayProps = {
	surveyResponse: SurveyResponse, 
	actionCard: ActionCard
}

export class ActionSurveyDisplay extends Component<ActionSurveyDisplayProps, ActionSurveyDisplayState> {
	state: ActionSurveyDisplayState = {
	}

	constructor(props: ActionSurveyDisplayProps) {
		super(props);
	}

	onActionDoneChange(actionId: number, done: boolean) {
		// add or remove it from survey response list
		return;
	}

	render() {
		return (<Grid container direction='column' alignItems='stretch'>
					<Grid item>
						<ActionSurveyForm surveyResponse={this.props.surveyResponse}/>
					</Grid>
					<Grid item>
						<ActionListDisplay actions={this.props.actionCard.actions}
							doneActions={this.props.surveyResponse.doneActions}
							onActionDoneChange={this.onActionDoneChange}
							surveyResponses={this.props.actionCard.surveyResponses}
						/>
					</Grid>
			</Grid>
		);
	}
}