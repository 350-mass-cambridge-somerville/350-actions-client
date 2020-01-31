import {ACTION_CARD_URL} from '../urls';
import {formatDate} from '../utils/dates';
import {responseToJson} from '../utils/fetch';

export function createActionCard(date: Date, number: number, actions: number[], token: string) {
	return fetch(ACTION_CARD_URL, {
		method: 'POST',
		//mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ token,
		  },
		  body: JSON.stringify({
			  date: formatDate(date), 
			  number: number,
			  actions: actions
		  })
	}).then(responseToJson);
}

export function updateActionCard(id: number, actions: number[], token: string) {
	return fetch(ACTION_CARD_URL + `${id}/`, {
		method: 'PATCH',
		//mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+ token,
		  },
		  body: JSON.stringify({
			  actions: actions
		  })
	}).then(responseToJson);
}