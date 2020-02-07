import React, { useState, ReactNode } from 'react';
import { Action } from '../../interfaces/Action';
import {
	Box,
	Checkbox,
	Typography,
	Grid
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ActionDisplay } from './ActionDisplay';
import { useStyles, theme } from '../../styles/style';


export function ActionCheckDisplay(props: {
	action: Action,
	onActionDoneChange: (id: number, done: boolean) => void,
	done: boolean,
	count: number,
	canCheck: boolean
}) {
	const classes = useStyles(theme);

	function onCheck(event: any) {
		props.onActionDoneChange(props.action.id, event.target.checked)
	};

	return (
		<Box>
			<Grid container direction='row' justify='flex-start'>
				<Grid item xs={1}>
					<Checkbox checked={props.done} onChange={onCheck} disabled={props.canCheck} />
				</Grid>
				<Grid item xs={11}>
					<ActionDisplay action={props.action} count={props.count} />
				</Grid>
			</Grid>
		</Box>);
}
