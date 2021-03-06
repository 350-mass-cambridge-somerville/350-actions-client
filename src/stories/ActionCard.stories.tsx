import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ActionDisplay } from '../components/presentation/ActionDisplay'
import { Action } from '../interfaces/Action'
import { DateType } from '../interfaces/DateType'
import { GeographyType } from '../interfaces/GeographyType'

export const actionShort: Action = {
	id: 1,
	description: 'Heres a thing',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actionLong: Action = {
	id: 1,
	description:
		'Heres a thing. There are lots of words here! asknfaune;asnf;ksadfnadkllkj',
	tags: ['tag1', 'tag2'],
	date: new Date(),
	dateType: DateType.ON,
	geographyType: GeographyType.LOCAL,
}

export const actions = {
	onActionDoneChange: action('onActionDoneChange'),
}

storiesOf('ActionDisplay', module)
	.add('default', () => <ActionDisplay count={10} action={actionShort} />)
	.add('long action', () => <ActionDisplay count={0} action={actionLong} />)
