import {Box, Typography} from '@material-ui/core';
import React, {ReactNode} from 'react';
import { useStyles, theme } from '../styles/style';

export type CountDisplayProps = {
	count: number
};

export function ActionCountDisplay(props: CountDisplayProps) 
{
	const classes = useStyles(theme);
	return <Box className={classes.countDisplayBox}><Typography variant='h2' className={classes.countDisplayTypography}>{props.count}</Typography></Box>
}