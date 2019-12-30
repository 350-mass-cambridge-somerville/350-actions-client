import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {RegistrationForm} from '../components/logic/RegistrationForm';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'

export const actions = {
	onEmailChange: action('onEmailChange'),
	onNameChange: action('onNameChange'),
	onPasswordChange: action('onPasswordChange'),
	onConfirmPasswordChange: action('onPasswordChange'),
	onSubmit: action('onSubmit')
};

export const defaultRegistrationProps = {
	name: 'Katy',
	email: 'katy@katy.com',
	password: 'akdsnfue4',
	confirmPassword: 'akdsnfue4'
}

export const invalidRegistrationProps = {
	name: '',
	email: 'notanemail',
	password: 'password',
	confirmPassword: 'pass'
}

storiesOf('RegistrationForm', module)
	.add('default', () => ((<ThemeProvider theme={theme}>
			<RegistrationForm {...defaultRegistrationProps} {...actions} />
		</ThemeProvider>)))
	.add('invalid', () => (<ThemeProvider theme={theme}><RegistrationForm {...invalidRegistrationProps} {...actions} /></ThemeProvider>))