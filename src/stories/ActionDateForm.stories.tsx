import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {ActionDateForm} from '../components/logic/ActionDateForm';
import {DateType} from '../interfaces/DateType';

export const actions = {
	onDateEndChange: action('onDateEndChange'),
	onDateStartChange: action('onDateStartChange'),
	onDateChange: action('onDateChange'),
	onDateTypeChange: action('onDateTypeChange')
};

export const defaultDateProps = {
	dateType: DateType.ON,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date()

}

export const betweenDateProps = {
	dateType: DateType.RANGE,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date()

}

export const beforeDateProps = {
	dateType: DateType.BEFORE,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date()

}

export const noneDateProps = {
	dateType: DateType.NONE,
	date: new Date(),
	dateStart: new Date(),
	dateEnd: new Date()

}

storiesOf('ActionDateForm', module)
	.add('on', () => (<ActionDateForm {...defaultDateProps} {...actions} />))
	.add('between', () => (<ActionDateForm {...betweenDateProps} {...actions} />))
	.add('before', () => (<ActionDateForm {...beforeDateProps} {...actions} />))
	.add('none', () => (<ActionDateForm {...noneDateProps} {...actions} />))