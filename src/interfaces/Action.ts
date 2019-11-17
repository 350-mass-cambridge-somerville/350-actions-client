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