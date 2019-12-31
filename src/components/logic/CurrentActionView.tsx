import React, { Component, ReactNode } from 'react';
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard';
import { SurveyResponse } from '../../interfaces/SurveyResponse';
import { CurrentActionDisplay } from '../presentation/CurrentActionDisplay';
import { ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL, LATEST_ACTION_CARD_URL } from '../../urls';
import { AuthContext} from '../providers/AuthProvider';
export class CurrentActionView extends Component {
	state: {
		actionCard?: ActionCard,
		nextSurveyResponse: SurveyResponse
	} = {
		nextSurveyResponse: {
			responderName: '',
			actionCardId: 0,
			doneActions: []
		}
	};

	constructor(props: any) {
		super(props);
		this.onChange = this.onChange.bind(this);
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

	render(): ReactNode {
		//console.log(`Rendering with state: ${JSON.stringify(this.state)}`);
		return (
			<CurrentActionDisplay actionCard={this.state.actionCard}  onChange={this.onChange} userData={this.context.userData}/>);
	}
}
CurrentActionView.contextType = AuthContext;