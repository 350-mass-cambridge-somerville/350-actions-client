import React, { Component, ChangeEvent, ReactNode } from 'react';
import { Paper, Button } from '@material-ui/core';
import { ActionGeographyForm } from './ActionGeographyForm';
import { GeographyType } from '../interfaces/GeographyType';
import { ActionDateForm } from './ActionDateForm';
import { ActionDescriptionForm } from './ActionDescriptionForm';
import { ActionTagsForm } from './ActionTagsForm';
import { DateType } from '../interfaces/DateType';

type ActionFormState = {
	geographyType: GeographyType, 
	dateType: DateType, 
	date: Date,
	dateStart: Date,
	dateEnd: Date,
	description: string,
	tags: string[]
};
export class ActionForm extends Component {
	state: ActionFormState = {
		geographyType: GeographyType.LOCAL,
		dateType: DateType.ON,
		date: new Date(),
		dateStart: new Date(),
		dateEnd: new Date(),
		description: '',
		tags: []
	};

	constructor() {
		super({});

		this.onGeographyTypeChange = this.onGeographyTypeChange.bind(this);
		this.onDateTypeChange = this.onDateTypeChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onDateStartChange = this.onDateStartChange.bind(this);
		this.onDateEndChange = this.onDateEndChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onTagsChange = this.onTagsChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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

	onDescriptionChange(description: string): void {
		this.setState({description: description});
	}

	onTagsChange(tags: string[]): void {
		this.setState({tags: tags});
	}

	onSubmit(): void {
		const stateString: string = JSON.stringify(this.state);
		console.log(`state string: ${stateString}`)
		fetch('http://localhost:3000/actions', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify(this.state) // body data type must match "Content-Type" header
		  }).then((response) => {
			return response.json()
		  }).then((json) => {
			  console.log(`got response json: ${JSON.stringify(json)}`);
		  })
		  .catch((error) => {
			  console.log(`submit failed with error: ${error}`);
		  })
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
				<Button variant="contained" color="secondary" onClick={this.onSubmit}>
        			Submit
      			</Button>
			</Paper>
		);
	}
}