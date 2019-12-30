import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {ActionAppBar} from '../components/ActionAppBar';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'
import { addThemeProvider } from './utils'
export const actions = {
	onEmailChange: action('onEmailChange'),
	onNameChange: action('onNameChange'),
	onPasswordChange: action('onPasswordChange'),
	onSubmit: action('onSubmit'),
	onLoginSubmit: action('onLoginSubmit')
};

export const defaultAppBarProps = {
	isLoggedIn: false
}

export const logoutAppBarProps = {
	isLoggedIn: true
}

storiesOf('ActionAppBar', module)
	.add('default', () => (<ThemeProvider theme={theme}>
			<ActionAppBar {...defaultAppBarProps} {...actions} />
		</ThemeProvider>))
	.add('invalid', () => (<ThemeProvider theme={theme}>
			<ActionAppBar {...logoutAppBarProps} {...actions} />
		</ThemeProvider>))