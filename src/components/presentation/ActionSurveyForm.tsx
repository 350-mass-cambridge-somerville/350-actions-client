import React, { ChangeEvent } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

type ActionSurveyFormProps = {
	responderName: string
	onSubmit: () => void
	onResponderNameChange: (name: string) => void
}

export function ActionSurveyForm(props: ActionSurveyFormProps) {
	function onResponderNameChange(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		props.onResponderNameChange(event.target.value)
	}

	return (
		<form data-cy="track-action-form">
			<Grid container justify="space-around" alignItems="center">
				<Grid item>
					<TextField
						id="standard-basic"
						label="Name (optional)"
						margin="normal"
						value={props.responderName}
						onChange={onResponderNameChange}
					/>
				</Grid>
				<Grid item>
					<Button
						data-cy="track-my-actions"
						variant="contained"
						color="primary"
						onClick={props.onSubmit}
					>
						Track my actions!
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}
