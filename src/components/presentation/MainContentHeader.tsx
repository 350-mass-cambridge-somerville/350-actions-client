import React, { Component, ChangeEvent, ReactNode} from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from '../../styles/style';

type MainContentHeaderProps = {
	mainTitle: string,
	date?: Date
}

export function MainContentHeader(props: MainContentHeaderProps) {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography className={classes.contentMainTitle} variant="h1">
				All Together Now
			</Typography>
			<Typography className={classes.contentTitleItalic} variant="h2">
				Sustained, Coordinated, Relentless, Collective Climate Action
	  		</Typography>
			<Typography className={classes.contentTitle} variant="h3" >
				  {props.mainTitle}
			</Typography>
			{props.date && 
			  <Typography variant="subtitle1" className={classes.contentTitleDate}>{props.date.toDateString()}</Typography>
	  		}
		</React.Fragment>
		);
}