import React, { Component, ReactNode } from 'react';
import { ActionCard, actionCardFromJson } from '../interfaces/ActionCard';
import { SurveyResponse } from '../interfaces/SurveyResponse';
import { CurrentActionDisplay } from './CurrentActionDisplay';
import { ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL } from '../urls';

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
		Promise.all([this.fetchActions(), this.fetchActionCards(), this.fetchSurveyResponses()])
		.then((vals) => {
			const actions = vals[0];
			const actionCards = vals[1];
			const surveyResponses = vals[2];
			//console.log(`actions are: ${JSON.stringify(actions)}`);
			//console.log(`actioncards are: ${JSON.stringify(actionCards)}`);
			//console.log(`surveyresponses are: ${JSON.stringify(surveyResponses)}`);
			
			if(actionCards.length > 0) {
				let maxInd: number = 0;
				let maxDate: Date = new Date(actionCards[0].date);
				for(let i=0; i < actionCards.length; i++) {
					let cardDate = new Date(actionCards[i]);
					if (cardDate > maxDate) {
						maxInd = i;
						maxDate = cardDate;
					}
				}
				let actionCardJson = actionCards[maxInd];
				actionCardJson.actions = actions.filter(action => action.actionCardId === actionCardJson.id);
				actionCardJson.surveyResponses = surveyResponses.filter(surveyResponse => surveyResponse.actionCardId === actionCardJson.id);
				let actionCard = actionCardFromJson(actionCardJson);
				console.log(`action card is: ${actionCard}`);
				this.setState({actionCard: actionCard});
			}
		})
		.catch((err) => {
			console.log(`Error fetching actions: ${err}`, err);
		})
	}

	fetchActions(): Promise<Array<any>> {
		return fetch(ACTION_URL, {method: 'GET'})
      		.then((data: Response) => {
				  const dj = data.json();
				  //console.log(`got data! ${JSON.stringify(dj)}`, dj);
				  return dj;
				})
	}

	fetchActionCards(): Promise<Array<any>> {
		return fetch(ACTION_CARD_URL, {method: 'GET'})
		.then((data: Response) => {
			const dj = data.json();
			//console.log(`got data! ${JSON.stringify(dj)}`, dj);
			return dj;
		  })
	}

	fetchSurveyResponses(): Promise<Array<any>> {
		return fetch(SURVEY_RESPONSE_URL, {method: 'GET'})
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
			<CurrentActionDisplay actionCard={this.state.actionCard}  onChange={this.onChange}/>);
	}
}