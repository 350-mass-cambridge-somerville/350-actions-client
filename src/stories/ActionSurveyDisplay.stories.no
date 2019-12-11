import React from 'react';
import { storiesOf } from '@storybook/react';

import { ActionSurveyDisplay } from '../components/ActionSurveyDisplay';
import { Action } from '../interfaces/Action';
import { SurveyResponse } from '../interfaces/SurveyResponse';
import { GeographyType } from '../interfaces/GeographyType';
import { DateType } from '../interfaces/DateType';
import { ActionCard } from '../interfaces/ActionCard';

export const action: Action = {
	id: 1,
	description: 'Here\s a thing',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actionLong: Action = {
	id: 2,
	description: 'Here\s a thing. There are lots of words here! asknfaune;asnf;ksadfnadkllkj',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actionCard: ActionCard = {
	id: 0,
	date: new Date(),
	number: 0,
	actions: [action, actionLong],
	surveyResponses: [{
		actionCardId: 0,
		doneActions: []
	}]
}

export const surveyResponse = {
	actionCardId: 0,
	doneActions: [2],
	responderName: 'katy'
}

storiesOf('ActionSurveyDisplay', module)
	.add('default', () => (<ActionSurveyDisplay actionCard={actionCard} />))