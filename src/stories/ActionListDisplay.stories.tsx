import React from 'react';
import { storiesOf } from '@storybook/react';

import {ActionListDisplay} from '../components/ActionListDisplay';

import {Action} from '../interfaces/Action';
import { DateType } from '../interfaces/DateType';
import { GeographyType } from '../interfaces/GeographyType';

export const action: Action = {
	id: 1,
	description: 'Here\s a thing',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actionLong: Action = {
	id: 1,
	description: 'Here\s a thing. There are lots of words here! asknfaune;asnf;ksadfnadkllkj',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actions = [action, actionLong];

storiesOf('ActionListDisplay', module)
	.add('default', () => (<ActionListDisplay actions={actions} />))