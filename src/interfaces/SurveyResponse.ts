export interface SurveyResponse {
	responderName: string
	id?: number
	actionCardId: number
	doneActions: number[]
}

export function surveyResponseFromJson(json: any) {
	return {
		responderName: json.name ? json.name : '',
		id: json.id,
		actionCardId: json.action_card,
		doneActions: json.actions
	};
}
