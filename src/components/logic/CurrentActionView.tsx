import React, { Component, ReactNode } from 'react';
import { Paper } from '@material-ui/core';
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard';
import { SurveyResponse } from '../../interfaces/SurveyResponse';
import { ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL, LATEST_ACTION_CARD_URL } from '../../urls';
import { AuthContext} from '../providers/AuthProvider';
import { CurrentActionDisplay } from '../presentation/CurrentActionDisplay';

export class CurrentActionView extends Component {
	state: {
		actionCard?: ActionCard,
		responderName: string,
		doneActions: number[],
		actionCardId: number,
		canSubmit: boolean
	} = {
		responderName: '',
		actionCardId: 0,
		doneActions: [],
		canSubmit: true
	};

	constructor(props: any) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onActionDoneChange = this.onActionDoneChange.bind(this);
		this.onResponderNameChange = this.onResponderNameChange.bind(this);
	}

	componentDidMount() {
		this.getServerState();
	}

	getServerState(): void {
		this.fetchLatestActionCard()
		.then((actionCardJson) => {
			let actionCard = actionCardFromJson(actionCardJson);
			console.log(`action card is: ${actionCard}`);
			this.setState({actionCard: actionCard, actionCardId: actionCard.id});
		})
		.catch((err) => {
			console.log(`Error fetching actions: ${err}`, err);
		})
	}
	
	fetchLatestActionCard(): Promise<Array<any>> {
		return fetch(LATEST_ACTION_CARD_URL, {method: 'GET'})
		.then((data: Response) => {
			const dj = data.json();
			//console.log(`got data! ${JSON.stringify(dj)}`, dj);
			return dj;
		  })
	}

	onChange(): void {
		this.getServerState();
	}

	onSubmit(): void {
		fetch(SURVEY_RESPONSE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			    responderName: this.state.responderName, 
				doneActions: this.state.doneActions,
				actionCardId: this.state.actionCardId
			}) 
		}).then(() => {
			this.setState({canSubmit: false})
		})
	}

	onResponderNameChange(name: string): void {
		this.setState({responderName: name})
	}

	onActionDoneChange(id: number, done: boolean): void {
		console.log(`done actions: ${JSON.stringify(this.state.doneActions)}`)
		if (done && !this.state.doneActions.includes(id)) {
			const newDoneActions = this.state.doneActions.slice()
			newDoneActions.push(id);
			console.log(`1. newDoneActions: ${this.state.doneActions.slice()} ${JSON.stringify(newDoneActions)}`)
			this.setState({doneActions: newDoneActions});
		}
		if (!done && this.state.doneActions.includes(id)) {
			const newDoneActions = this.state.doneActions.slice().filter(i => i !== id)
			console.log(`2. newDoneActions: ${this.state.doneActions.slice()} ${JSON.stringify(newDoneActions)}`)
			this.setState({doneActions: newDoneActions});
		}

	}
	
	render(): ReactNode {
		return (
			<CurrentActionDisplay 
				actionCard={this.state.actionCard}
				responderName={this.state.responderName}
				onResponderNameChange={this.onResponderNameChange}
				username={this.context.userData.username}
				isAuthorized={this.context.userData.isAuthorized}
				canSubmit={this.state.canSubmit}
				onSubmit={this.onSubmit}
				doneActions={this.state.doneActions}
				onActionDoneChange={this.onActionDoneChange}
			/>
		);
	}
}
CurrentActionView.contextType = AuthContext;