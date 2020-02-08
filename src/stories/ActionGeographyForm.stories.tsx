import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ActionGeographyForm } from '../components/logic/ActionGeographyForm'
import { GeographyType } from '../interfaces/GeographyType'

export const actions = {
	onChange: action('onChange'),
}

export const defaultGeographyProps = {
	selected: GeographyType.LOCAL,
}

storiesOf('ActionGeographyForm', module).add('default', () => (
	<ActionGeographyForm {...defaultGeographyProps} {...actions} />
))
