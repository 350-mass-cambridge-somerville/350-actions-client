import React, { Component, } from 'react';
import { Grid } from '@material-ui/core';
import { ActionListDisplay } from './ActionListDisplay';
import { ActionSurveyForm } from './ActionSurveyForm';
import { Action } from '../interfaces/Action';
import { ActionCard } from '../interfaces/ActionCard';
import { SurveyResponse } from '../interfaces/SurveyResponse';
import { surveyResponse } from '../stories/ActionSurveyDisplay.stories';
import { SURVEY_RESPONSE_URL } from '../urls';
type ActionSurveyDisplayState = {
	responderName: string,
	doneActions: number[],
};

type ActionSurveyDisplayProps = {
	actionCard: ActionCard
}
export class ActionSurveyDisplay extends Component<ActionSurveyDisplayProps, ActionSurveyDisplayState> {
	state: ActionSurveyDisplayState = {
		responderName: '',
		doneActions: [],
	}

	constructor(props: ActionSurveyDisplayProps) {
		super(props);
		this.onResponderNameChange = this.onResponderNameChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onActionDoneChange = this.onActionDoneChange.bind(this);
	}

	onActionDoneChange(actionId: number, done: boolean) {
		// add or remove it from survey response list
		let newDoneActions: number[] = []
		if(!done && this.state.doneActions.includes(actionId)) {
			newDoneActions = this.state.doneActions.filter(id=> id != actionId)
		} 

		if(done && !this.state.doneActions.includes(actionId)) {
			newDoneActions = this.state.doneActions.concat([actionId])
		}

		this.setState({doneActions: newDoneActions});
	}

	onResponderNameChange(name: string) {
		this.setState({responderName: name});
	}

	onSubmit() {
		fetch(SURVEY_RESPONSE_URL,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: JSON.stringify({
				  responderName: this.state.responderName,
				  actionCardId: this.props.actionCard.id,
				  doneActions: this.state.doneActions, 
			  }),
			}).then((response: Response) => {
				return response.json()
			}).then((json: string) => {
				console.log(`got survey submit response ${json}`);
			})
	}

	render() {
		return (<Grid container direction='column' alignItems='stretch'>
					<Grid item>
						<ActionSurveyForm responderName={this.state.responderName}
							onResponderNameChange={this.onResponderNameChange}
							onSubmit={this.onSubmit}
						/>
					</Grid>
					<Grid item>
						<ActionListDisplay actions={this.props.actionCard.actions}
							doneActions={this.state.doneActions}
							onActionDoneChange={this.onActionDoneChange}
							surveyResponses={this.props.actionCard.surveyResponses}
						/>
					</Grid>
			</Grid>
		);
	}
}