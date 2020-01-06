import {Grid, Typography} from '@material-ui/core';
import React, {ReactNode} from 'react';
import { useStyles, theme } from '../../styles/style';

export type CountDisplayProps = {
	count: number
};

export function ActionCountDisplay(props: CountDisplayProps) 
{
	const classes = useStyles(theme);
	return (<Grid className={classes.countDisplayBox}>
			<Grid item>
				<Typography variant='h2' className={classes.countDisplayTypography}>{props.count}</Typography>
			</Grid>
			<Grid item>
				<Typography variant='subtitle1' align='center' className={classes.countDisplayTypography}>{props.count === 1 ? 'person has acted' : 'people have acted'}</Typography>
			</Grid>
		</Grid>);
}