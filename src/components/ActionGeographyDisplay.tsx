import React, { ReactNode} from "react";
import { Typography } from '@material-ui/core';
import { GeographyType } from '../interfaces/GeographyType';
import { useStyles } from '../styles/style';

export function ActionGeographyDisplay(props: {geographyType: GeographyType}) 
{
	const classes = useStyles();
	return ( 
		<Typography>{props.geographyType}</Typography>
	);
}