import { SurveyResponse } from "./SurveyResponse";
import { Action } from './Action';

export interface ActionCard {
	id?: number,
	date: Date,
	number: number,
	surveyResponse: SurveyResponse[],
	actions: Action[]
}