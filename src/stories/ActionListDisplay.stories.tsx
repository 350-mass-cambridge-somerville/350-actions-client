import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {ActionListDisplay} from '../components/ActionListDisplay';

import {Action} from '../interfaces/Action';
import { DateType } from '../interfaces/DateType';
import { GeographyType } from '../interfaces/GeographyType';

export const actions = {
	onActionDoneChange: action('onActionDoneChange'),
};

export const actionShort: Action = {
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

export const actionList = [actionShort, actionLong];

storiesOf('ActionListDisplay', module)
	.add('default', () => (
	<ActionListDisplay actions={actionList}
					   doneActions={[1]}
					   onActionDoneChange={actions.onActionDoneChange}
					   surveyResponses={[]}
		/>))