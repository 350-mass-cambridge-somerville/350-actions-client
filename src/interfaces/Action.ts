import { DateType } from './DateType'
import { GeographyType } from './GeographyType'

export interface Tag {
	id: number
	tag: string
}

export interface Action {
	id: number
	description: string
	tags: string[]
	date: Date
	dateType: DateType
	geographyType: GeographyType
	[x: string]: any
}

export function actionFromJson(json: any): Action {
	const geographyType =
		json.geography_type === 'UNDEFINED' ? undefined : json.geography_type
	return {
		id: json.id,
		description: json.description,
		tags: json.taggit ? json.taggit : [],
		date: new Date(json.date),
		dateStart: json.start_date ? new Date(json.start_date) : undefined,
		dateEnd: json.end_date ? new Date(json.end_date) : undefined,
		dateType: json.date_type,
		geographyType,
	}
}
