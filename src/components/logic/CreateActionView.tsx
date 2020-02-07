import React, { Component, ReactNode } from 'react';
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard';
import { Paper, Typography } from '@material-ui/core';
import { ActionForm } from './ActionForm';
import { MainContentHeader } from '../presentation/MainContentHeader';
import { ACTION_CARD_URL } from '../../urls';

export class CreateActionView extends Component {
	state: {
		cards: ActionCard[]
	} = {
			cards: []
		};

	componentDidMount() {
		Promise.all([this.fetchActionCards()])
			.then((vals) => {
				const actionCards = vals[0];

				let cards: ActionCard[] = [];
				actionCards.map((json: any) => {
					cards.push(actionCardFromJson(json));
				})

				this.setState({ cards: cards })
			})
			.catch((err) => {
				console.log(`Error fetching actions: ${err}`, err);
			})
	}

	fetchActionCards(): Promise<Array<any>> {
		return fetch(ACTION_CARD_URL, { method: 'GET' })
			.then((data: Response) => {
				const dj = data.json();
				return dj;
			})
	}

	render(): ReactNode {
		return (<div>
			<Paper>
				<MainContentHeader mainTitle="Create an action" />
				<ActionForm
					cards={this.state.cards}
				/>
			</Paper>
		</div>);
	}
}