import React, { Component, ReactNode } from 'react';
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard';
import { PastActionDisplay } from '../presentation/PastActionDisplay';
import {ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL } from '../../urls';

export class PastActionView extends Component {
	state: {
		actionCards: ActionCard[],
	} = {
		actionCards: []
	};

	componentDidMount() {
		Promise.all([this.fetchActions(), this.fetchActionCards(), this.fetchSurveyResponses()])
		.then((vals) => {
			const actions = vals[0];
			const actionCards = vals[1];
			const surveyResponses = vals[2];
			console.log(`actions are: ${JSON.stringify(actions)}`);
			console.log(`actioncards are: ${JSON.stringify(actionCards)}`);
			console.log(`surveyresponses are: ${JSON.stringify(surveyResponses)}`);
			
			if(actionCards.length > 0) {
				let allActionCards: ActionCard[] = [];
				actionCards.map((actionCardJson) => {
					actionCardJson.actions = actions.filter(action => action.actionCardId === actionCardJson.id);
					actionCardJson.surveyResponses = surveyResponses.filter(surveyResponse => surveyResponse.actionCardId === actionCardJson.id);
					let actionCard = actionCardFromJson(actionCardJson);
					//console.log(`action card is: ${actionCard}`);
					allActionCards.push(actionCard);
				});
				// sort by date, not id
				// todo - move this to backend?
				allActionCards.sort((a,b) => b.date.getTime() - a.date.getTime());
				// remove the first element - don't display current actions in past view
				allActionCards.shift();
				this.setState({actionCards: allActionCards});
			}
		})
		.catch((err) => {
			console.log(`Error fetching actions: ${err}`, err);
		})
	}

	fetchActions(): Promise<Array<any>> {
		return fetch(ACTION_URL, {
			method: 'GET',
			mode: 'cors'
		}).then((data: Response) => {
				console.log(`got actions response: ${JSON.stringify(data)}`);
				//return [];
				const dj = data.json();
				//console.log(`got data! ${JSON.stringify(dj)}`, dj);
				return dj;
			})
	}

	fetchActionCards(): Promise<Array<any>> {
		return fetch(ACTION_CARD_URL, {method: 'GET', mode:'cors'})
		.then((data: Response) => {
			const dj = data.json();
			//console.log(`got data! ${JSON.stringify(dj)}`, dj);
			return dj;
		  })
	}

	fetchSurveyResponses(): Promise<Array<any>> {
		return fetch(SURVEY_RESPONSE_URL, {method: 'GET', mode: 'cors'})
		.then((data: Response) => {
			const dj = data.json();
			//console.log(`got data! ${JSON.stringify(dj)}`, dj);
			return dj;
		  })
	}

	render(): ReactNode {
		//console.log(`Rendering with state: ${JSON.stringify(this.state)}`);
		return (<PastActionDisplay actionCards={this.state.actionCards}/>);
	}
}