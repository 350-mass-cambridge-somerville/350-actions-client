import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { RegistrationFormDisplay } from '../components/presentation/RegistrationFormDisplay'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../styles/style'
import { BrowserRouter } from 'react-router-dom'

export const actions = {
	onEmailChange: action('onEmailChange'),
	onNameChange: action('onNameChange'),
	onPasswordChange: action('onPasswordChange'),
	onConfirmPasswordChange: action('onPasswordChange'),
	onSubmit: action('onSubmit'),
	onSignIn: action('onSignIn'),
}

export const defaultRegistrationProps = {
	name: 'Katy',
	email: 'katy@katy.com',
	password: 'akdsnfue4',
	confirmPassword: 'akdsnfue4',
	emailValid: true,
	nameValid: true,
	passwordValid: true,
	confirmPasswordValid: true,
	validationMsg: '',
}

export const invalidRegistrationProps = {
	name: '',
	email: 'notanemail',
	password: 'password',
	confirmPassword: 'pass',
	emailValid: false,
	nameValid: false,
	passwordValid: false,
	confirmPasswordValid: false,
	validationMsg: 'everything sucks',
}

storiesOf('RegistrationForm', module)
	.add('default', () => (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<RegistrationFormDisplay {...defaultRegistrationProps} {...actions} />
			</ThemeProvider>
		</BrowserRouter>
	))
	.add('invalid', () => (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<RegistrationFormDisplay {...invalidRegistrationProps} {...actions} />
			</ThemeProvider>
		</BrowserRouter>
	))
