import React, { Component, } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { UserData } from '../../interfaces/UserData';

type ActionSurveyFormState = {

};

type ActionSurveyFormProps = {
	responderName: string,
	userData: UserData,
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
						{!this.props.userData.isAuthorized && 
							<TextField
								id="standard-basic"
								label="Name"
								margin="normal"
								value={this.props.responderName}
								onChange={this.onResponderNameChange}
							/>
						}
						{this.props.userData.isAuthorized &&
							<Typography>{this.props.userData.name}</Typography>
						}
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