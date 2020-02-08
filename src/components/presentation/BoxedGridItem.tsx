import React, { ReactNode } from 'react'
import { Box, Grid } from '@material-ui/core'

export function BoxedGridItem(component: ReactNode, xs: any) {
	return (
		<Box border={1}>
			<Grid item xs={xs}>
				{component}
			</Grid>
		</Box>
	)
}
