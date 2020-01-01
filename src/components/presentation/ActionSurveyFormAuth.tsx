import React, { Component, } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

type ActionSurveyFormState = {

};

type ActionSurveyFormAuthProps = {
	responderName: string,
	onSubmit: () => void,
	submitAllowed: boolean,
}

export function ActionSurveyFormAuth(props: ActionSurveyFormAuthProps) {
	return (
		<form>
			<Grid container justify='space-around' alignItems='center'>
					<Grid item>
						<Typography>{props.responderName}</Typography>
					</Grid>
					<Grid item>
						<Button variant="contained"
						 color="primary"
						 onClick={props.onSubmit}
						 disabled={!props.submitAllowed}
						 >
        					Track my actions!
      					</Button>
					</Grid>
			</Grid>
		</form>
	);
}