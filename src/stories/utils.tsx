import React, { FunctionComponent, Component, ReactNode } from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { theme } from '../styles/style'
export function addThemeProvider(WrappedComponent: any) {
	return function newComponent(props: any) {
		return (
			<ThemeProvider theme={theme}>
				<WrappedComponent {...props} />
			</ThemeProvider>
		)
	}
}
