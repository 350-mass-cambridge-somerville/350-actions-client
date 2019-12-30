import React, { ChangeEvent, useState } from 'react';
import { SignInFormDisplay } from '../presentation/SignInFormDisplay';
import { SIGN_IN_URL } from '../../urls';
import {useAuth} from '../providers/AuthProvider';

type SignInFormProps = {
};

export function SignInForm(props: SignInFormProps) {
	const authContext = useAuth()
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	//todo these functions can be delted
	function onEmailChange(email: string): void {
		setEmail(email)
	}

	function onPasswordChange(password: string): void {
		setPassword(password)
	}

	function onSubmit(): void {
		//todo add data
		authContext.login({});
	}

	return (
		<SignInFormDisplay
			password={password}
			email={email}
			onEmailChange={onEmailChange}
			onPasswordChange={onPasswordChange}
			onSubmit={onSubmit}
		/>
		);
}