import React, { useState, ReactNode } from 'react';
import {Action} from '../../interfaces/Action';
import {
	Box,
	Checkbox,
	Typography,
	Grid
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { ActionGeographyDisplay } from './ActionGeographyDisplay';
import { ActionDateDisplay } from './ActionDateDisplay'
import { ActionCountDisplay } from './ActionCountDisplay';
import ActionChipDisplay from './ActionChipDisplay';
import { useStyles, theme } from '../../styles/style';


export function ActionDisplay(props: {action: Action, 
	count: number
}) 
{
	const classes = useStyles(theme);
	console.log(`rendering action ${JSON.stringify(props.action)}`);

	return (
	<Box>
		<Grid container direction='column' alignItems='stretch'>
			<Grid item>
				<Grid container justify='space-between'>
					<Grid item>
						<ActionGeographyDisplay geographyType={props.action.geographyType}/>
					</Grid>
					<Grid item>
						<ActionDateDisplay 
							dateType={props.action.dateType} 
							date={props.action.date}
							dateStart={props.action.dateStart}
							dateEnd={props.action.dateEnd}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container justify='space-between' wrap='nowrap'>
					<Grid item>
						<Typography dangerouslySetInnerHTML={{__html: props.action.description}}/>
					</Grid>
					<Grid item>
						<ActionCountDisplay count={props.count}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<ActionChipDisplay tags={props.action.tags}/>
			</Grid>
		</Grid>
	</Box>);
}
