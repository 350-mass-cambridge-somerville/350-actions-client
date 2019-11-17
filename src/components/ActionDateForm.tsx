import React, { Component, ChangeEvent, ReactNode } from "react";
import { 
	Select, 
	MenuItem,
	Typography
 } from "@material-ui/core";

 import { 
	DatePicker,
	TimePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { DateType } from '../interfaces/DateType';


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
	function generateDatePickers(props: DateFormProps): ReactNode {
		switch(props.dateType) {
			case DateType.ON:
				return <DatePicker value={props.date ? props.date : new Date()} onChange={props.onDateChange}/>
			case DateType.BEFORE:
					return <DatePicker value={props.date ? props.date : new Date()} onChange={props.onDateChange}/>
			case DateType.RANGE:
					return (<div>
							<DatePicker value={props.dateStart ? props.dateStart : new Date()} onChange={props.onDateStartChange}/>
							<DatePicker value={props.dateEnd ? props.dateEnd : new Date()} onChange={props.onDateEndChange}/>
						</div>);
			default:
				return <Typography>No date set.</Typography>
		}
	}
	return (
		<div>
			<Select onChange={props.onDateTypeChange} value={props.dateType}>
				{Object.values(DateType).map((value) => {
					//console.log(`DT value is ${value}`);
					return <MenuItem value={value}>{DateTypeDisplay[value as DateType]}</MenuItem>;
				})}
			</Select>
			<div>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					{generateDatePickers(props)}
				</MuiPickersUtilsProvider>
			</div>
		</div>
	);
}