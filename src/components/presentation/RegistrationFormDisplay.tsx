import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid } from '@material-ui/core';
import {useStyles} from '../../styles/style';
import {Link} from 'react-router-dom';
type RegistrationFormDisplayProps = {
	email: string,
	name: string,
	password: string,
	confirmPassword: string,
	onEmailChange: (email: string) => void,
	onNameChange: (name: string) => void,
	onPasswordChange: (password: string) => void,
	onConfirmPasswordChange: (password: string) => void,
	onSubmit: () => void,
	emailValid: boolean,
	nameValid: boolean,
	passwordValid: boolean,
	confirmPasswordValid: boolean,
	validationMsg: string
}

export function RegistrationFormDisplay(props: RegistrationFormDisplayProps) {
	const classes = useStyles();

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
						<Typography className={classes.registrationTitle}>Register</Typography>
					</Grid>
					<Grid item>
						<TextField required
							id="registration-email"
							label="Email"
							value={props.email}
							onChange={onEmailChange}
							className={classes.registrationItem}
						/>
					</Grid>
					<Grid item>
					<TextField required
						id="registration-name"
						//class="registration-text"
						label="Name"
						value={props.name}
						onChange={onNameChange}
						className={classes.registrationItem}
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
							className={classes.registrationItem}
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
							className={classes.registrationItem}
						/>
					</Grid>
					<Grid item>
					<Button variant="contained" color="secondary" onClick={props.onSubmit}>
						Submit
					</Button>
					</Grid>
					<Grid item>
					<Typography className={classes.registrationItem}>Already have an account? </Typography>
					<Link to='/sign-in'>
						<Typography>Sign In</Typography>
        			</Link>
				</Grid>
				</Grid>
		</React.Fragment>
		);
}