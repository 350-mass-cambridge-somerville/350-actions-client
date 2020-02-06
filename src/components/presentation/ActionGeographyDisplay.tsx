import React from "react";
import { Typography } from '@material-ui/core';
import { GeographyType } from '../../interfaces/GeographyType';
import { useStyles } from '../../styles/style';

export function ActionGeographyDisplay(props: {geographyType: GeographyType})
{
	const classes = useStyles();
	return (
		<Typography className={classes.geography}>{props.geographyType}</Typography>
	);
}
