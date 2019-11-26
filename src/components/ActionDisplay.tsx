import React, { useState, ReactNode } from 'react';
import {Action} from '../interfaces/Action';
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
import { useStyles, theme } from '../styles/style';


export function ActionDisplay(props: {action: Action, 
	onActionDoneChange: (id: number, done: boolean) => void,
	done: boolean,
	count: number
}) 
{
	const classes = useStyles(theme);
	console.log(`rendering action ${JSON.stringify(props.action)}`);
	function onCheck(event: any) {
		props.onActionDoneChange(props.action.id, event.target.checked)
	};

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
				<Grid container justify='space-between'>
					<Grid item>
						<Grid container>
							<Grid item>
								<Checkbox checked={props.done} onChange={onCheck}/>
							</Grid>
							<Grid item>
								<Typography dangerouslySetInnerHTML={{__html: props.action.description}}></Typography>
							</Grid>
						</Grid>
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