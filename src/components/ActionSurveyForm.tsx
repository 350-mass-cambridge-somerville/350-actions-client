import React, { Component, } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { ActionListDisplay } from './ActionListDisplay';
import { Action } from '../interfaces/Action';
import { ActionCard } from '../interfaces/ActionCard';
import { SurveyResponse } from '../interfaces/SurveyResponse';

type ActionSurveyFormState = {

};

type ActionSurveyFormProps = {
	surveyResponse: SurveyResponse, 
}

export class ActionSurveyForm extends Component<ActionSurveyFormProps, ActionSurveyFormState> {
	state: ActionSurveyFormState = {
	}

	constructor(props: ActionSurveyFormProps) {
		super(props);
	}

	render() {
		return (
		<form>
			<Grid container justify='space-between'>
					<Grid item>
					<TextField
          				id="standard-basic"
          				label="Name"
						 margin="normal"
						 value={this.props.surveyResponse.responderName}
        			/>
					</Grid>
					<Grid item>
						<Button variant="contained" color="primary">
        					Track my actions!
      					</Button>
					</Grid>
			</Grid>
		</form>
		);
	}
}