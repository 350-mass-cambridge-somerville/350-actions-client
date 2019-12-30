import React, { Component, } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { ActionListDisplay } from '../presentation/ActionListDisplay';
import { Action } from '../../interfaces/Action';
import { ActionCard } from '../../interfaces/ActionCard';
import { SurveyResponse } from '../../interfaces/SurveyResponse';

type ActionSurveyFormState = {

};

type ActionSurveyFormProps = {
	responderName: string,
	onSubmit: () => void,
	onResponderNameChange: (name: string) => void 
}

export class ActionSurveyForm extends Component<ActionSurveyFormProps, ActionSurveyFormState> {
	state: ActionSurveyFormState = {
	}

	constructor(props: ActionSurveyFormProps) {
		super(props);
		this.onResponderNameChange = this.onResponderNameChange.bind(this);
	}

	onResponderNameChange(event: any): void {
		this.props.onResponderNameChange(event.target.value);
	}

	render() {
		return (
		<form>
			<Grid container justify='space-around' alignItems='center'>
					<Grid item>
					<TextField
          				id="standard-basic"
          				label="Name"
						margin="normal"
						value={this.props.responderName}
						onChange={this.onResponderNameChange}
        			/>
					</Grid>
					<Grid item>
						<Button variant="contained"
						 color="primary"
						 onClick={this.props.onSubmit}
						 >
        					Track my actions!
      					</Button>
					</Grid>
			</Grid>
		</form>
		);
	}
}