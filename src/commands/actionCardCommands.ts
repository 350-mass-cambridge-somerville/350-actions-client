import moment from 'moment';
import {ACTION_CARD_URL} from '../urls';

function formatDate(date: Date) {
	return moment(date).format('YYYY-MM-DD');
}

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
	});
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
	});
}