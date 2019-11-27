import React, { Component, ReactNode } from 'react';
import { Grid, 
		Select,
		MenuItem, 
		TextField, 
		FormControl,
		FormHelperText
	 } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';
import { 
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

type ActionCardFormDisplayProps = {
	ids: number[],
	selectedId: number,
	date: Date,
	number: number,
	onNumberChange: (event: any) => void,
	onDateChange: (date: any) => void,
	onIdChange: (event: any) => void
}

export function ActionCardFormDisplay(props: ActionCardFormDisplayProps) {
	const classes = useStyles();

	return (<Grid container alignItems='center'>
		<Grid item>
		<FormControl  variant="outlined" className={classes.formControl}>
				<Select
					className={classes.selectPrimary}
					onChange={props.onIdChange} 
					value={props.selectedId}
					>
						{props.ids.map((id: number) => {
							return <MenuItem value={id}>{id}</MenuItem>
						})}
						<MenuItem value={-1}>new card</MenuItem>
				</Select>
				<FormHelperText>Card Number</FormHelperText>
			</FormControl>
		</Grid>
		{props.selectedId === -1 &&
			<React.Fragment>
				<Grid item>
					<TextField 
						onChange={props.onNumberChange}
						type="number"
						label="card number"
					>
						{props.number}
					</TextField>
				</Grid>
				<Grid item>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="card date"
							value={props.date} 
							onChange={props.onDateChange}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			</React.Fragment>
		}
	</Grid>);

}