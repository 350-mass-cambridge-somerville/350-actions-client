import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SignInForm } from '../components/SignInForm';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'

export const actions = {
	onEmailChange: action('onEmailChange'),
	onPasswordChange: action('onPasswordChange'),
	onSubmit: action('onSubmit')
};

export const defaultRegistrationProps = {
	email: 'katy@katy.com',
	password: 'akdsnfue4',
}

export const invalidRegistrationProps = {
	email: 'notanemail',
	password: 'password',
}

storiesOf('SignInForm', module)
	.add('default', () => ((<ThemeProvider theme={theme}>
			<SignInForm {...defaultRegistrationProps} {...actions} />
		</ThemeProvider>)))
	.add('invalid', () => (<ThemeProvider theme={theme}><SignInForm {...invalidRegistrationProps} {...actions} /></ThemeProvider>))