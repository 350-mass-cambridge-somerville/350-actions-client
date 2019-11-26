import React, { Component, ReactNode } from 'react';
import { Grid, Select, MenuItem } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';
import { 
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

type ActionCardFormState = {
	submitted: boolean,
	error?: string
}

type ActionCardFormProps = {
	ids: number[],
	selectedId: number,
	date: Date,
	onDateChange: (date: any) => void,
	onIdChange: (id: number) => void
}

export class ActionCardForm extends Component<ActionCardFormProps, ActionCardFormState> {
	state: ActionCardFormState = {
		submitted: false,
	}

	classes: any;

	constructor(props: ActionCardFormProps) {
		super(props);
		//this.classes = useStyles(theme);
		this.onIdChange = this.onIdChange.bind(this);
	}

	onIdChange(event: any, child: ReactNode): void {
		this.props.onIdChange(event.target.value);
	}

	render() {
		return (<Grid container>
			<Grid item>
				<Select 
					onChange={this.onIdChange} 
					value={this.props.selectedId}>
						{this.props.ids.map((id: number) => {
							return <MenuItem value={id}>{id}</MenuItem>
						})}
						<MenuItem value={-1}>new card</MenuItem>
				</Select>
			</Grid>
			{this.props.selectedId === -1 &&
				<Grid item>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="card date"
							value={this.props.date} 
							onChange={this.props.onDateChange}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
			}
		</Grid>);
	}
}