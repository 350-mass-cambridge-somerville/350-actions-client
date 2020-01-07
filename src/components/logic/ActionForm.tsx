import moment from 'moment';
import React, { Component, ChangeEvent, ReactNode } from 'react';
import { Paper, Button } from '@material-ui/core';
import { ActionGeographyForm } from './ActionGeographyForm';
import { GeographyType } from '../../interfaces/GeographyType';
import { ActionDateForm } from './ActionDateForm';
import { ActionDescriptionForm } from './ActionDescriptionForm';
import { ActionTagsForm } from './ActionTagsForm';
import { ActionCardForm } from './ActionCardForm';
import { DateType } from '../../interfaces/DateType';
import { ActionCard } from '../../interfaces/ActionCard';
import SimpleSnackbar from '../presentation/SimpleSnackbar';
import { AuthContext } from '../providers/AuthProvider';
import {ACTION_CARD_URL, ACTION_URL} from '../../urls';

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
	actionCardNumber: number,
	showSnackbar: boolean,
	snackbarMessage: string,
	snackbarIsError: boolean
};

type ActionFormProps = {
	cards: ActionCard[]
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
		actionCardNumber: 0,
		showSnackbar: false,
		snackbarMessage: '',
		snackbarIsError: false
	};

	constructor(props: ActionFormProps) {
		super({cards: []});

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
		this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
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

	handleSnackbarClose(event: any): void {
		this.setState({showSnackbar: false});
	}

	onSubmit(): void {
		const stateString: string = JSON.stringify(this.state);
		console.log(`state string: ${stateString}`)

		if(this.state.actionCardId === -1 ) {
			console.log(`submitting action card with unknown id ${this.state.actionCardId}`)
			// need to create new card before submitting action
			fetch(ACTION_CARD_URL,{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ this.context.token,
					// 'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: JSON.stringify({
					  date: this.state.actionCardDate, 
					  number: this.state.actionCardNumber
				  }) // body data type must match "Content-Type" header
			}).then((response: Response) => {
				if(!response.ok) {
					throw(response.text);
				}
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

	formatDate(date: Date) {
		return moment(date).format('YYYY-MM-DD');
	}

	submitAction(actionCardId: number): Promise<any> {
		console.log(`request body: ${JSON.stringify({
			actionCardId: actionCardId,
			description: this.state.description,
			date: this.formatDate(this.state.date),
			dateStart: this.formatDate(this.state.dateStart),
			dateEnd: this.formatDate(this.state.dateEnd),
			tags: this.state.tags,
			dateType: this.state.dateType,
			geographyType: this.state.geographyType
		})}`);
		return fetch(ACTION_URL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': 'Bearer '+ this.context.token,
			  // 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				//actionCardId: actionCardId,
				description: this.state.description,
				date: this.formatDate(this.state.date),
				date_start: this.formatDate(this.state.dateStart),
				date_end: this.formatDate(this.state.dateEnd),
				taggit: this.state.tags,
				date_type: this.state.dateType,
				geography_type: this.state.geographyType
			}) // body data type must match "Content-Type" header
		  }).then((response) => {
			console.log(`response ok ${response.ok} status ${response.status} text ${response.statusText}`)
			if(!response.ok) {
				throw(response.text);
			}
			return response.json();
		  }).then((json) => {
			  console.log(`got response json: ${JSON.stringify(json)}`);
			  this.setState({showSnackbar: true, snackbarIsError: false, snackbarMessage: `Success! ${JSON.stringify(json)}`})
		  })
		  .catch((error) => {
			  console.log(`submit failed with error: ${error}`);
			  this.setState({showSnackbar: true, snackbarIsError: true, snackbarMessage: `Something went wrong. Try again later. Error: ${error.message}`})
		  })
	}

	render() {
		return (
			<Paper>
				<SimpleSnackbar message={this.state.snackbarMessage} isError={this.state.snackbarIsError} open={this.state.showSnackbar} handleClose={this.handleSnackbarClose}/>
				<form>
					<ActionCardForm 
						onIdChange={this.onActionCardIdChange}
						cards={this.props.cards}
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
ActionForm.contextType = AuthContext;