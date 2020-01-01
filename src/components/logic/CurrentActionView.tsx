import React, { Component, ReactNode } from 'react';
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard';
import { SurveyResponse } from '../../interfaces/SurveyResponse';
import { ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL, LATEST_ACTION_CARD_URL } from '../../urls';
import { AuthContext} from '../providers/AuthProvider';
import { ActionSurveyFormAuth } from '../presentation/ActionSurveyFormAuth';
import { ActionSurveyForm } from '../presentation/ActionSurveyForm';
import { MainContentHeader } from '../presentation/MainContentHeader';

export class CurrentActionView extends Component {
	state: {
		actionCard?: ActionCard,
		nextSurveyResponse: SurveyResponse,
		canSubmit: boolean
	} = {
		nextSurveyResponse: {
			responderName: '',
			actionCardId: 0,
			doneActions: []
		},
		canSubmit: true
	};

	constructor(props: any) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
			this.setState({actionCard: actionCard});
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

	}

	onResponderNameChange(name: string): void {
		let newSurveyResponse: SurveyResponse = {
			responderName: name,
			actionCardId: this.state.nextSurveyResponse.actionCardId,
			doneActions: this.state.nextSurveyResponse.doneActions.slice()
		}
		this.setState({nextSurveyResponse: newSurveyResponse})
	}

	generateSurveyForm() {
		if(this.context.userData.isAuthorized) {
			return <ActionSurveyFormAuth 
			responderName={this.context.userData.username}
			onSubmit={this.onSubmit}
			submitAllowed={this.state.canSubmit}
			/>
		} else if (!this.state.canSubmit) {
			return <ActionSurveyFormAuth 
			responderName={this.state.nextSurveyResponse.responderName}
			onSubmit={this.onSubmit}
			submitAllowed={this.state.canSubmit}
			/>
		} else {
			return <ActionSurveyForm 
				responderName={this.state.nextSurveyResponse.responderName}
				onSubmit={this.onSubmit}
				onResponderNameChange={this.onResponderNameChange}
			/>
		}
	}
	render(): ReactNode {
		return (
			<React.Fragment>
				{this.state.actionCard && 
					<div>
						<MainContentHeader mainTitle={`Action Card ${this.state.actionCard.number}`} date={this.state.actionCard.date}/>
						{this.generateSurveyForm()}
					</div>
				}
			</React.Fragment>
		);
	}
}
CurrentActionView.contextType = AuthContext;