import React from 'react'
import { storiesOf } from '@storybook/react'

import { ActionGeographyDisplay } from '../components/presentation/ActionGeographyDisplay'
import { GeographyType } from '../interfaces/GeographyType'

export const defaultGeographyProps = {
	geographyType: GeographyType.LOCAL,
}

storiesOf('ActionGeographyDisplay', module).add('default', () => (
	<ActionGeographyDisplay {...defaultGeographyProps} />
))
