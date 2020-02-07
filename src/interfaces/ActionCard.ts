import { SurveyResponse, surveyResponseFromJson } from './SurveyResponse'
import { Action, actionFromJson } from './Action'
export interface ActionCard {
	id?: number
	date: Date
	number: number
	surveyResponses: SurveyResponse[]
	actions: Action[]
}

export function actionCardFromJson(json: any) {
	return {
		id: json.id,
		date: new Date(json.date),
		number: json.number,
		actions: json.actions
			? json.actions.map((actionJson: any) => {
				return actionFromJson(actionJson)
			})
			: [],
		surveyResponses: json.survey_responses
			? json.survey_responses.map((surveyJson: any) => {
				return surveyResponseFromJson(surveyJson)
			})
			: [],
	}
}
