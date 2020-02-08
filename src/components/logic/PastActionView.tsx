import React, { Component, ReactNode } from 'react'
import { ActionCard, actionCardFromJson } from '../../interfaces/ActionCard'
import { PastActionDisplay } from '../presentation/PastActionDisplay'
import { ACTION_URL, ACTION_CARD_URL, SURVEY_RESPONSE_URL } from '../../urls'

export class PastActionView extends Component {
	state: {
		actionCards: ActionCard[]
	} = {
		actionCards: [],
	}

	componentDidMount() {
		this.fetchActionCards()
			.then(cards => {
				const allActionCards: ActionCard[] = []
				cards.map(card => {
					allActionCards.push(actionCardFromJson(card))
				})
				this.setState({ actionCards: allActionCards })
			})
			.catch(err => {
				console.log(`Error fetching actions: ${err}`, err)
			})
	}

	fetchActions(): Promise<Array<any>> {
		return fetch(ACTION_URL, {
			method: 'GET',
			mode: 'cors',
		}).then((data: Response) => {
			const dj = data.json()
			return dj
		})
	}

	fetchActionCards(): Promise<Array<any>> {
		return fetch(ACTION_CARD_URL, { method: 'GET', mode: 'cors' }).then(
			(data: Response) => {
				const dj = data.json()
				return dj
			},
		)
	}

	fetchSurveyResponses(): Promise<Array<any>> {
		return fetch(SURVEY_RESPONSE_URL, { method: 'GET', mode: 'cors' }).then(
			(data: Response) => {
				const dj = data.json()
				return dj
			},
		)
	}

	render(): ReactNode {
		return <PastActionDisplay actionCards={this.state.actionCards} />
	}
}
