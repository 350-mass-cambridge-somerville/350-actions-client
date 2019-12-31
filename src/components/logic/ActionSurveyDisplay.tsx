import React, { Component, } from 'react';
import { Grid } from '@material-ui/core';
import { ActionListDisplay } from '../presentation/ActionListDisplay';
import { ActionSurveyForm } from '../presentation/ActionSurveyForm';
import { Action } from '../../interfaces/Action';
import { ActionCard } from '../../interfaces/ActionCard';
import { SurveyResponse } from '../../interfaces/SurveyResponse';
import  SimpleSnackbar  from '../presentation/SimpleSnackbar';
import { UserData } from '../../interfaces/UserData';
import { SURVEY_RESPONSE_URL } from '../../urls';
type ActionSurveyDisplayState = {
	responderName: string,
	doneActions: number[],
	snackbarMessage: string,
	snackbarIsError: boolean,
	showSnackbar: boolean
};

type ActionSurveyDisplayProps = {
	actionCard: ActionCard,
	userData: UserData,
	onChange: () => void
}
export class ActionSurveyDisplay extends Component<ActionSurveyDisplayProps, ActionSurveyDisplayState> {
	state: ActionSurveyDisplayState = {
		responderName: '',
		doneActions: [],
		snackbarIsError: false,
		showSnackbar: false,
		snackbarMessage: ''
	}

	constructor(props: ActionSurveyDisplayProps) {
		super(props);
		this.onResponderNameChange = this.onResponderNameChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onActionDoneChange = this.onActionDoneChange.bind(this);
		this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
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

	handleSnackbarClose(event: any): void {
		this.setState({showSnackbar: false});
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
				this.setState({showSnackbar: true, snackbarIsError: false, snackbarMessage: `Thanks ${this.state.responderName}, you have been counted!`})
				this.props.onChange();
			})
	}

	render() {
		return (
		<React.Fragment>
			<SimpleSnackbar message={this.state.snackbarMessage} 
			isError={this.state.snackbarIsError} 
			open={this.state.showSnackbar} 
			handleClose={this.handleSnackbarClose}
			/>
			<Grid container direction='column' alignItems='stretch'>
					<Grid item>
						<ActionSurveyForm responderName={this.state.responderName}
							userData={this.props.userData}
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
		</React.Fragment>
		);
	}
}