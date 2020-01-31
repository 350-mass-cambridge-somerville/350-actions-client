import {ACTION_URL} from '../urls';
import { DateType } from '../interfaces/DateType';
import { GeographyType } from '../interfaces/GeographyType';
import {formatDate} from '../utils/dates';
import { responseToJson } from '../utils/fetch';

export function createAction(description: string, date: Date, dateStart: Date, 
	dateEnd: Date, tags: string[], dateType: DateType, geographyType: GeographyType,
	token: string) {
	return fetch(ACTION_URL, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': 'Bearer ' + token,
		},
		body: JSON.stringify({
			//actionCardId: actionCardId,
			description: description,
			date: formatDate(date),
			date_start: formatDate(dateStart),
			date_end: formatDate(dateEnd),
			// todo rename this in back end
			taggit: tags,
			date_type: dateType,
			geography_type: geographyType
		}) // body data type must match "Content-Type" header
	}).then(responseToJson);
}