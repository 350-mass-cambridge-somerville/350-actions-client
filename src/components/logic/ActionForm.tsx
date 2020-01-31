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
import {updateActionCard, createActionCard} from '../../commands/actionCardCommands';
import { createAction } from '../../commands/actionCommands';
 
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
	cards: ActionCard[],
	onSubmit: () => void
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
		actionCardId: -1,
		actionCardNumber: 0,
		showSnackbar: false,
		snackbarMessage: '',
		snackbarIsError: false,
	};

	constructor(props: ActionFormProps) {
		super(props);
		//super({cards: [], onSubmit: props.onSubmit});

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
		Promise.all([
		this.getOrCreateActionCard(), 
		createAction(this.state.description, this.state.date, this.state.dateStart,
				this.state.dateEnd, this.state.tags, this.state.dateType,
				this.state.geographyType, this.context.token)])
		.then((idAndJson: any[]) => {
			const actionCardId = idAndJson[0];
			const actionId = idAndJson[1].id;
			return this.addActionToCard(actionCardId, actionId);
		})
		.then((json: any) => {
			console.log(`got update response ${json}`)
			this.props.onSubmit();
			this.clearFormState(json.id);
		})
		.catch((error) => {
			console.log(`submit failed with error: ${error}`);
			this.setState({showSnackbar: true, snackbarIsError: true, snackbarMessage: `Something went wrong. Try again later. Error: ${error.message}`})
		})

	}

	getOrCreateActionCard(): Promise<number> {
		if (this.state.actionCardId !== -1) {
			return Promise.resolve(this.state.actionCardId);
		} else {
			return 	createActionCard(this.state.actionCardDate, 
				this.state.actionCardNumber, 
				[], 
				this.context.token).then((json) => {
					return json.id;
				})
		}
	}

	addActionToCard(actionCardId: number, actionId: number) {
		// find the current actions on the action card
		const cards: ActionCard[] = this.props.cards.filter((card) => {return card.id === actionCardId});
		let newActions: number[] = [];
		if (cards.length > 0) {
			newActions = cards[0].actions.map((action) => {return action.id}); 
		}
		newActions.push(actionId);
		return updateActionCard(actionCardId, newActions, this.context.token)
	}

	clearFormState(actionCardId?: number) {
		// todo identify best ux for form state after submit
		// todo add success message
		this.setState({actionCardId: actionCardId ? actionCardId: -1,
			 description: '', 
			 tags: [],
			 geographyType: GeographyType.LOCAL,
			 dateType: DateType.ON
			});
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