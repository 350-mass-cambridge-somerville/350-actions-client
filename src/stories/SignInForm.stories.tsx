import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SignInFormDisplay } from '../components/presentation/SignInFormDisplay';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'
import { BrowserRouter } from 'react-router-dom';

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
	.add('default', () => ((
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<SignInFormDisplay {...defaultRegistrationProps} {...actions} />
			</ThemeProvider>
		</BrowserRouter>)))
	.add('invalid', () => (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<SignInFormDisplay {...invalidRegistrationProps} {...actions} />
			</ThemeProvider>
		</BrowserRouter>))