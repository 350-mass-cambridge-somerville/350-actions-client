import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {ActionAppBar} from '../components/logic/ActionAppBar';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../styles/style'


export const defaultAppBarProps = {
}

export const logoutAppBarProps = {
}

storiesOf('ActionAppBar', module)
	.add('default', () => (<ThemeProvider theme={theme}>
			<ActionAppBar {...defaultAppBarProps} />
		</ThemeProvider>))
	.add('invalid', () => (<ThemeProvider theme={theme}>
			<ActionAppBar {...logoutAppBarProps} />
		</ThemeProvider>))