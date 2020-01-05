import React, { useState } from 'react';
import {useAuth} from '../providers/AuthProvider';
import {Redirect} from 'react-router-dom';
import {RegistrationFormDisplay} from '../presentation/RegistrationFormDisplay';
type RegistrationFormProps = {
}

export function RegistrationForm(props: RegistrationFormProps) {
	const authContext = useAuth()
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [toHome, setToHome] = useState(false)
	
	function onSubmit(): void {
		console.log(`Doing registration: ${email} ${name}`);
		// todo return a promise with success/error
		authContext.register('').then((good: any) => {
			setToHome(good);
		});
	}

	if (toHome === true) {
		return <Redirect to='/' />
	}

	return (
		<RegistrationFormDisplay
		name={name}
		onNameChange={setName}
		nameValid={true}
		email={email}
		onEmailChange={setEmail}
		emailValid={true}
		password={password}
		onPasswordChange={setPassword}
		passwordValid={true}
		confirmPassword={confirmPassword}
		onConfirmPasswordChange={setConfirmPassword}
		confirmPasswordValid={true}
		onSubmit={onSubmit}
		validationMsg=''
		/>
	);
}