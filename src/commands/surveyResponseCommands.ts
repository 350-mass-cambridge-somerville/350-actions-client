import {SURVEY_RESPONSE_URL} from '../urls';
import moment from 'moment';
import { UserData } from '../interfaces/UserData';
import { responseToJson } from '../utils/fetch';

export function submitSurveyResponse(responderName: string, doneActions: number[], actionCardId: number, date?: Date, userData?: UserData): Promise<any> {
	// todo check if user is defined
	return fetch(SURVEY_RESPONSE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: responderName,
			date: moment().format('YYYY-MM-DD'), 
			actions: doneActions,
			action_card: actionCardId
		})
		}).then(responseToJson);
};

export function updateSurveyResponse(id: number, doneActions: number[], actionCardId: number): Promise<any> {
	// todo check if user is defined
	const url = SURVEY_RESPONSE_URL + `${id}/`;
	return fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: id,
			date: moment().format('YYYY-MM-DD'), 
			actions: doneActions,
			action_card: actionCardId
		})
		}).then(responseToJson);
};