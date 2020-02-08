import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ActionAppBar } from '../components/logic/ActionAppBar';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'
import { BrowserRouter } from 'react-router-dom';


export const defaultAppBarProps = {
}

export const logoutAppBarProps = {
}

storiesOf('ActionAppBar', module)
	.add('default', () => (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<ActionAppBar {...defaultAppBarProps} />
			</ThemeProvider>
		</BrowserRouter>))
	.add('invalid', () => (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<ActionAppBar {...logoutAppBarProps} />
			</ThemeProvider>
		</BrowserRouter>))