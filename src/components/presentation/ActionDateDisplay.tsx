import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { DateType } from '../../interfaces/DateType'
import { useStyles } from '../../styles/style'
import moment from 'moment'

export type DateDisplayProps = {
	dateType: DateType
	date: Date
	dateStart: Date
	dateEnd: Date
}

function formatDate(date: Date): string {
	// todo fix timezone on server...
	return moment(date)
		.add(6, 'hours')
		.format('MMMM Do YYYY')
}

export function ActionDateDisplay(props: DateDisplayProps) {
	const classes = useStyles()

	switch (props.dateType) {
		case DateType.ON:
			return (
				<Grid container>
					<Typography className={classes.dateDisplayDescription}>
						do on
					</Typography>
					<Typography className={classes.dateDisplayDate}>
						{formatDate(props.date)}
					</Typography>
				</Grid>
			)
		case DateType.BEFORE:
			return (
				<Grid container>
					<Typography className={classes.dateDisplayDescription}>
						do before
					</Typography>
					<Typography className={classes.dateDisplayDate}>
						{formatDate(props.date)}
					</Typography>
				</Grid>
			)
		case DateType.RANGE:
			return (
				<Grid container>
					<Typography className={classes.dateDisplayDescription}>
						do between
					</Typography>
					<Typography className={classes.dateDisplayDate}>
						{formatDate(props.dateStart)}
					</Typography>
					<Typography className={classes.dateDisplayDescription}>
						and
					</Typography>
					<Typography className={classes.dateDisplayDate}>
						{formatDate(props.dateEnd)}
					</Typography>
				</Grid>
			)
		default:
			return <span></span>
	}
}
