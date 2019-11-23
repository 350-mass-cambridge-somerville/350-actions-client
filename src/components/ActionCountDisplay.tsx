import {Box, Typography} from '@material-ui/core';
import React, {ReactNode} from 'react';
import { useStyles } from '../styles/style';

export type CountDisplayProps = {
	count: number
};

export function ActionCountDisplay(props: CountDisplayProps) 
{
	const classes = useStyles();
	return <Box border={2} borderRadius={16} borderColor='red'><Typography variant='h2' className={classes.countDisplayTypography}>{props.count}</Typography></Box>
}