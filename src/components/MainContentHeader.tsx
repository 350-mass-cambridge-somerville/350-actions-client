import React, { Component, ChangeEvent, ReactNode} from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from '../styles/style';

type MainContentHeaderProps = {
	mainTitle: string,
	date?: Date
}

export function MainContentHeader(props: MainContentHeaderProps) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography>
				Sustained, Coordinated, Relentless, Collective Climate Action
	  		</Typography>
			<Typography className={classes.contentTitle} variant="h1" >
				  {props.mainTitle}
			</Typography>
			{props.date && 
			  <Typography>{props.date.toDateString()}</Typography>
	  		}
		</React.Fragment>
		);
}