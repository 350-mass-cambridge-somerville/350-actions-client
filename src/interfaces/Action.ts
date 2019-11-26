import {DateType} from './DateType';
import {GeographyType} from './GeographyType'

export interface Action {
	id: number;
	description: string;
	tags: string[];
	date: Date;
	dateType: DateType;
	geographyType: GeographyType;
	[x: string]: any;
}

export function actionFromJson(json: any) : Action {
	return {
		id: json.id,
		description: json.description,
		tags: json.tags,
		date: new Date(json.date),
		dateType: json.dateType,
		geographyType: json.geographyType,
	}
}