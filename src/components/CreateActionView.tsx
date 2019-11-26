import React, { Component, ReactNode } from 'react';
import { ActionDisplay } from './ActionDisplay';
import { Action } from '../interfaces/Action';
import { ActionCard, actionCardFromJson } from '../interfaces/ActionCard';
import { SurveyResponse } from '../interfaces/SurveyResponse';

import { Paper, Typography } from '@material-ui/core';
import { ActionSurveyDisplay } from './ActionSurveyDisplay';
import { surveyResponse } from '../stories/ActionSurveyDisplay.stories';
import { ActionForm } from './ActionForm';

export class CreateActionView extends Component {
	state: {
		ids: number[]
	} = {
		ids: []
	};

	componentDidMount() {
		Promise.all([this.fetchActionCards()])
		.then((vals) => {
			const actionCards = vals[0];
			
			console.log(`action cards are: ${JSON.stringify(actionCards)}`);
			let ids: number[] = [];
			actionCards.map((card: any) => {
				ids.push(card.id);
			})

			this.setState({ids: ids})
		})
		.catch((err) => {
			console.log(`Error fetching actions: ${err}`, err);
		})
	}

	fetchActionCards(): Promise<Array<any>> {
		return fetch('http://localhost:3000/action-cards', {method: 'GET'})
		.then((data: Response) => {
			const dj = data.json();
			console.log(`got data! ${JSON.stringify(dj)}`, dj);
			return dj;
		  })
	}

	render(): ReactNode {
		console.log(`Rendering with state: ${JSON.stringify(this.state)}`);
		return (<div>
			<Paper>
				<ActionForm
					ids={this.state.ids}
				/>
			</Paper>
		</div>);
	}
}