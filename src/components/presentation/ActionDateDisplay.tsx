import React, { ReactNode} from "react";
import { Typography, Grid } from '@material-ui/core';
import { DateType } from '../../interfaces/DateType';
import { useStyles } from '../../styles/style';

export type DateDisplayProps = {
	dateType: DateType,
	date: Date,
	dateStart: Date,
	dateEnd: Date,
};

export function ActionDateDisplay(props: DateDisplayProps) 
{
	const classes = useStyles();
	switch(props.dateType) {
		case DateType.ON:
			return (<Grid container>
						<Typography className={classes.dateDisplayDescription}>do on</Typography>
						<Typography className={classes.dateDisplayDate}>{props.date.toDateString()}</Typography>
					</Grid>);
		case DateType.BEFORE:
			return (<Grid container>
						<Typography className={classes.dateDisplayDescription}>do before</Typography>
						<Typography className={classes.dateDisplayDate}>{props.date.toDateString()}</Typography>
					</Grid>);
		case DateType.RANGE:
			return (<Grid container>
						<Typography className={classes.dateDisplayDescription}>do between</Typography>
						<Typography className={classes.dateDisplayDate}>{props.dateStart.toDateString()}</Typography>
						<Typography className={classes.dateDisplayDescription}>and</Typography>
						<Typography className={classes.dateDisplayDate}>{props.dateEnd.toDateString()}</Typography>
					</Grid>);
		default:
			return <span></span>
	}
}