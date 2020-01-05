import React, { useState } from 'react';
import { SignInFormDisplay } from '../presentation/SignInFormDisplay';
import {useAuth} from '../providers/AuthProvider';
import {Redirect} from 'react-router-dom';
type SignInFormProps = {
};

export function SignInForm(props: SignInFormProps) {
	const authContext = useAuth()
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [toHome, setToHome] = useState(false)

	//todo these functions can be delted
	function onEmailChange(email: string): void {
		setEmail(email)
	}

	function onPasswordChange(password: string): void {
		setPassword(password)
	}

	function onSubmit(): void {
		//todo add data
		//todo should this return a promise? or have another state isFailed?
		authContext.login(email, password).then((good) => {
			setToHome(good);
		});
	}

	if (toHome === true) {
		return <Redirect to='/' />
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