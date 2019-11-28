import React, { Component, ChangeEvent, ReactNode } from 'react';
import { Paper, Button } from '@material-ui/core';
import { ActionGeographyForm } from './ActionGeographyForm';
import { GeographyType } from '../interfaces/GeographyType';
import { ActionDateForm } from './ActionDateForm';
import { ActionDescriptionForm } from './ActionDescriptionForm';
import { ActionTagsForm } from './ActionTagsForm';
import { ActionCardForm } from './ActionCardForm';
import { DateType } from '../interfaces/DateType';

const ACTION_CARD_URL='http://localhost:3000/action-cards';

type ActionFormState = {
	geographyType: GeographyType, 
	dateType: DateType, 
	date: Date,
	dateStart: Date,
	dateEnd: Date,
	description: string,
	tags: string[],
	actionCardDate: Date,
	actionCardId: number,
	actionCardNumber: number
};

type ActionFormProps = {
	ids: number[]
}
export class ActionForm extends Component<ActionFormProps, ActionFormState> {
	state: ActionFormState = {
		geographyType: GeographyType.LOCAL,
		dateType: DateType.ON,
		date: new Date(),
		dateStart: new Date(),
		dateEnd: new Date(),
		description: '',
		tags: [],
		actionCardDate: new Date(),
		actionCardId: 1,
		actionCardNumber: 0
	};

	constructor(props: ActionFormProps) {
		super({ids: props.ids});

		this.onGeographyTypeChange = this.onGeographyTypeChange.bind(this);
		this.onDateTypeChange = this.onDateTypeChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onDateStartChange = this.onDateStartChange.bind(this);
		this.onDateEndChange = this.onDateEndChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onTagsChange = this.onTagsChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onActionCardDateChange = this.onActionCardDateChange.bind(this);
		this.onActionCardIdChange = this.onActionCardIdChange.bind(this);
		this.onActionCardNumberChange = this.onActionCardNumberChange.bind(this);
	}

	onGeographyTypeChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) {
		this.setState({geographyType: event.target.value as GeographyType});
	}
	
	onDateTypeChange(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) {
		this.setState({dateType: event.target.value as DateType});
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

	onActionCardDateChange(date: any): void {
		this.setState({actionCardDate: date})
	}

	onActionCardIdChange(id: number): void {
		this.setState({actionCardId: id})
	}

	onActionCardNumberChange(num: number): void {
		this.setState({actionCardNumber: num})
	}

	onSubmit(): void {
		const stateString: string = JSON.stringify(this.state);
		console.log(`state string: ${stateString}`)

		if(this.state.actionCardId === -1 ) {
			console.log(`submitting action card with unknown id ${this.state.actionCardId}`)
			// need to create new card before submitting action
			fetch(ACTION_CARD_URL,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: JSON.stringify({
					  date: this.state.actionCardDate, 
				  }) // body data type must match "Content-Type" header
			}).then((response: Response) => {
				return response.json();
			}).then((responseJson: any) => {
				const actionCardId = responseJson.id;
				return this.submitAction(actionCardId);
			}).catch((error: any) => {
				console.log(`action card submit failed with: ${error}`);
			})
		} else {
			console.log(`submitting action with known id ${this.state.actionCardId}`);
			this.submitAction(this.state.actionCardId);
		}
	}

	submitAction(actionCardId: number): Promise<any> {
		return fetch('http://localhost:3000/actions', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
			  'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				actionCardId: actionCardId,
				description: this.state.description,
				date: this.state.date,
				dateStart: this.state.dateStart,
				dateEnd: this.state.dateEnd,
				tags: this.state.tags,
				dateType: this.state.dateType,
				geographyType: this.state.geographyType
			}) // body data type must match "Content-Type" header
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
					<ActionCardForm 
						onIdChange={this.onActionCardIdChange}
						ids={this.props.ids}
						date={this.state.actionCardDate}
						number={this.state.actionCardNumber}
						selectedId={this.state.actionCardId}
						onDateChange={this.onActionCardDateChange}
						onNumberChange={this.onActionCardNumberChange}
					/>
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
					<ActionTagsForm
						 onTagsChange={this.onTagsChange}
						 tags={this.state.tags}
					 />
					 <ActionDescriptionForm
						 onDescriptionChange={this.onDescriptionChange}
						 description={this.state.description}
					 />
				</form>
				<Button variant="contained" color="secondary" onClick={this.onSubmit}>
        			Submit
      			</Button>
			</Paper>
		);
	}
}