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
import { ActionCard } from '../interfaces/ActionCard';

type ActionCardFormDisplayProps = {
	cards: ActionCard[],
	selectedId: number,
	date: Date,
	number: number,
	onNumberChange: (number: any) => void,
	onDateChange: (date: any) => void,
	onIdChange: (event: any) => void
}

export function ActionCardFormDisplay(props: ActionCardFormDisplayProps) {
	const classes = useStyles();

	return (<Grid container justify='flex-start' alignItems='stretch'>
		<Grid item className={classes.gridItem}>
		<FormControl  variant="outlined" className={classes.formControl}>
				<Select
					className={classes.selectPrimary}
					onChange={props.onIdChange} 
					value={props.selectedId}
					>
						{props.cards.map((card: ActionCard) => {
							return <MenuItem value={card.id}>{card.number}</MenuItem>
						})}
						<MenuItem value={-1}>new card</MenuItem>
				</Select>
				<FormHelperText>Card Number</FormHelperText>
			</FormControl>
		</Grid>
		{props.selectedId === -1 &&
			<React.Fragment>
				<Grid item className={classes.gridItem}>
					<FormControl>
						<TextField 
							onChange={props.onNumberChange}
							type="number"
							label="card number"
						>
							{props.number}
						</TextField>
						<FormHelperText>card number</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item className={classes.gridItem}>
					<FormControl>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								value={props.date} 
								onChange={props.onDateChange}
							/>
						</MuiPickersUtilsProvider>
						<FormHelperText>card date</FormHelperText>
					</FormControl>
				</Grid>
			</React.Fragment>
		}
	</Grid>);

}