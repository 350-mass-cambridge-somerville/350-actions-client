import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid } from '@material-ui/core';
type RegistrationFormProps = {
	email: string,
	name: string,
	password: string,
	confirmPassword: string,
	onEmailChange: (email: string) => void,
	onNameChange: (name: string) => void,
	onPasswordChange: (password: string) => void,
	onConfirmPasswordChange: (password: string) => void,
	onSubmit: () => void
}

export function RegistrationForm(props: RegistrationFormProps) {
	//const classes = useStyles();

	function onEmailChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onEmailChange(event.target.value);
	}

	function onNameChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onNameChange(event.target.value);
	}

	function onPasswordChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onPasswordChange(event.target.value);
	}

	function onConfirmPasswordChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onConfirmPasswordChange(event.target.value);
	}

	return (
		<React.Fragment>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
				>
				<Grid item>
					<TextField required
						id="registration-email"
						label="Email"
						value={props.email}
						onChange={onEmailChange}
					/>
				</Grid>
				<Grid item>
				<TextField required
					id="registration-name"
					//class="registration-text"
					label="Name"
					value={props.name}
					onChange={onNameChange}
				/>
				</Grid>
				<Grid item>
					<TextField required
						id="registration-password"
						//class="registration-text"
						label="Password"
						type="password"
						value={props.password}
						onChange={onPasswordChange}
					/>
				</Grid>
				<Grid item>
					<TextField required
						id="registration-confirm-password"
						//class="registration-text"
						label="Confirm Password"
						type="password"
						value={props.confirmPassword}
						onChange={onConfirmPasswordChange}
					/>
				</Grid>
				<Grid item>
				<Button variant="contained" color="secondary" onClick={props.onSubmit}>
        			Submit
      			</Button>
				</Grid>
			</Grid>
		</React.Fragment>
		);
}