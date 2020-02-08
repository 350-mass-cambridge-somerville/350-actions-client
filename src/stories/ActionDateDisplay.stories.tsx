import React from 'react'
import { storiesOf } from '@storybook/react'

import {
	ActionDateDisplay,
	DateDisplayProps,
} from '../components/presentation/ActionDateDisplay'
import { DateType } from '../interfaces/DateType'

export const defaultDateProps: DateDisplayProps = {
	dateType: DateType.RANGE,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date(),
}

export const beforeDateProps: DateDisplayProps = {
	dateType: DateType.BEFORE,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date(),
}

storiesOf('ActionDateDisplay', module)
	.add('default', () => <ActionDateDisplay {...defaultDateProps} />)
	.add('before', () => <ActionDateDisplay {...beforeDateProps} />)
