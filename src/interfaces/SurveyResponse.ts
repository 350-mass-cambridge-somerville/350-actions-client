export interface SurveyResponse {
	responderName: string
	id?: number
	actionCardId: number
	doneActions: number[]
}

export function surveyResponseFromJson(json: any) {
	return json
}
