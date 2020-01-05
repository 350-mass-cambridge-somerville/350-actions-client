import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid, Box } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useStyles } from '../../styles/style';
import { Link, useLocation } from 'react-router-dom';

type SignInFormDisplayProps = {
	email: string,
	password: string,
	onEmailChange: (email: string) => void,
	onPasswordChange: (password: string) => void,
	onSubmit: () => void
}

export function SignInFormDisplay(props: SignInFormDisplayProps) {
	const classes = useStyles();
	const location = useLocation();

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
		<Box>
				<Grid item>
					<Typography className={classes.registrationTitle}>Sign In</Typography>
				</Grid>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
				>
				<Grid item>
					<TextField required
						id="sign-in-email"
						label="Email"
						value={props.email}
						onChange={onEmailChange}
						className={classes.registrationItem}
					/>
				</Grid>
				<Grid item>
					<TextField required
						id="sign-in-password"
						//class="registration-text"
						label="Password"
						type="password"
						value={props.password}
						onChange={onPasswordChange}
						className={classes.registrationItem}
					/>
				</Grid>
				<Grid item>
					<GoogleLogin
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Login with Google"
					onSuccess={onGoogleResponse}
					onFailure={onGoogleResponse}
					cookiePolicy={'single_host_origin'}
					className={classes.registrationItem}
					/>
				</Grid>
				<Grid item>
				<Button variant="contained" color="secondary" onClick={props.onSubmit}>
        			Submit
      			</Button>
				</Grid>
				<Grid item>
					<Typography className={classes.registrationItem}>Don't have an account? </Typography>
					<Link
						to={{
							pathname: `/register`,
							// This is the trick! This link sets
							// the `background` in location state.
							state: { background: location }
						}}
					>
						<Typography>Register</Typography>
        			</Link>
				</Grid>
			</Grid>
		</Box>
		);
}