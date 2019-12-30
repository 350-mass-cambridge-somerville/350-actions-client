import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

type SignInFormDisplayProps = {
	email: string,
	password: string,
	onEmailChange: (email: string) => void,
	onPasswordChange: (password: string) => void,
	onSubmit: () => void
}

export function SignInFormDisplay(props: SignInFormDisplayProps) {
	//const classes = useStyles();

	function onEmailChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onEmailChange(event.target.value);
	}

	function onPasswordChange(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
		props.onPasswordChange(event.target.value);
	}

	function onGoogleResponse(response: any): void {
		console.log(response);
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
						id="registration-password"
						//class="registration-text"
						label="Password"
						type="password"
						value={props.password}
						onChange={onPasswordChange}
					/>
				</Grid>
				<Grid item>
					<GoogleLogin
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Login with Google"
					onSuccess={onGoogleResponse}
					onFailure={onGoogleResponse}
					cookiePolicy={'single_host_origin'}
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