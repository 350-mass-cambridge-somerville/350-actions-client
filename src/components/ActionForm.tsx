import React, { Component, ChangeEvent, ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import { ActionGeographyForm } from './ActionGeographyForm';
import { GeographyType } from '../interfaces/GeographyType';
import { ActionDateForm } from './ActionDateForm';
import { DateType } from '../interfaces/DateType';
type ActionFormState = {
	geographyType: GeographyType, 
	dateType: DateType, 
	date: Date,
	dateStart: Date,
	dateEnd: Date
};
export class ActionForm extends Component {
	state: ActionFormState = {
		geographyType: GeographyType.LOCAL,
		dateType: DateType.ON,
		date: new Date(),
		dateStart: new Date(),
		dateEnd: new Date()
	};

	constructor() {
		super({});

		this.onGeographyTypeChange = this.onGeographyTypeChange.bind(this);
		this.onDateTypeChange = this.onDateTypeChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onDateStartChange = this.onDateStartChange.bind(this);
		this.onDateEndChange = this.onDateEndChange.bind(this);
	}

	onGeographyTypeChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) {
		this.setState({geographyType: event.target.value});
	}
	
	onDateTypeChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) {
		this.setState({dateType: event.target.value});
	}

	onDateChange(date: Date): void {
		this.setState({date: date});
	}

	onDateStartChange(date: Date): void {
		this.setState({dateStart: date});
	}

	onDateEndChange(date: Date): void {
		this.setState({dateEnd: date});
	}

	render() {
		return (
			<Paper>
				<form>
					<ActionGeographyForm 
						onChange={this.onGeographyTypeChange} 
						selected={this.state.geographyType}/>
					<ActionDateForm 
					    onDateTypeChange={this.onDateTypeChange} 
						dateType={this.state.dateType}
						onDateChange={this.onDateChange}
						date={this.state.date}
						onDateStartChange={this.onDateStartChange}
						dateStart={this.state.dateStart}
						onDateEndChange={this.onDateEndChange}
						dateEnd={this.state.dateEnd}
					 />
					 <ActionDescriptionForm
						 onDescriptionChange={this.onDescriptionChange}
						 description={this.state.description}
					 />
					 <ActionTagsForm
						 onTagsChange={this.onTagsChange}
						 tags={this.state.tags}
					 />
				</form>
			</Paper>
		);
	}
}