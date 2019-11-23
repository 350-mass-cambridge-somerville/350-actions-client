import React, { Component, ChangeEvent, ReactNode } from "react";
import { 
	Select, 
	MenuItem,
	Typography,
	FormControl,
	Grid,
	Box
 } from "@material-ui/core";

 import { 
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { DateType } from '../interfaces/DateType';
import { useStyles } from '../styles/style';

type DateFormProps = {
	dateType: DateType,
	date?: Date,
	dateStart?: Date,
	dateEnd?: Date,
	onDateTypeChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void
	onDateChange: (date: any) => void,
	onDateStartChange: (date: any) => void,
	onDateEndChange: (date: any) => void
};

const DateTypeDisplay: Record<DateType, string> = {
	[DateType.ON]: "on",
	[DateType.BEFORE]: "before",
	[DateType.RANGE]: "between",
	[DateType.NONE]: "none"
}

export function ActionDateForm(props: DateFormProps) 
{
	const classes = useStyles();
	function generateDatePickers(props: DateFormProps): ReactNode {
		switch(props.dateType) {
			case DateType.ON:
			case DateType.BEFORE:
				return (
					<Grid item xs={3} className={classes.gridItem}>
						<KeyboardDatePicker 
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="date"
							value={props.date ? props.date : new Date()} 
							onChange={props.onDateChange}
						/>
					</Grid>)
			case DateType.RANGE:
					return (
						<Grid item className={classes.gridItem}>
							<Grid container justify='space-between' alignItems='flex-end'>
								<Grid className={classes.gridItem}>
									<KeyboardDatePicker 
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-inline"
										label="start date"
										value={props.dateStart ? props.dateStart : new Date()} 
										onChange={props.onDateStartChange}
									/>
								</Grid>
								<Grid item className={classes.gridItem}>
									<Typography>&</Typography>
								</Grid>
								<Grid item className={classes.gridItem}>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="MM/dd/yyyy"
										margin="normal"
										id="date-picker-inline"
										label="end date" 
										value={props.dateEnd ? props.dateEnd : new Date()} 
										onChange={props.onDateEndChange}
									/>
								</Grid>
							</Grid>
						</Grid>
					);
			default:
				return (
					<Grid item xs={3} className={classes.gridItem}>
						<Typography align='center' variant='subtitle1'>No date set.</Typography>
					</Grid>
				);
		}
	}
	return (
		<Grid container alignItems='center'>
			<Grid item xs={3} className={classes.gridItem}>
				<FormControl className={classes.formControl} variant="outlined">
					<Select onChange={props.onDateTypeChange} value={props.dateType}>
						{Object.values(DateType).map((value) => {
							//console.log(`DT value is ${value}`);
							return <MenuItem value={value}>{DateTypeDisplay[value as DateType]}</MenuItem>;
						})}
					</Select>
				</FormControl>
			</Grid>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				{generateDatePickers(props)}
			</MuiPickersUtilsProvider>
		</Grid>
	);
}