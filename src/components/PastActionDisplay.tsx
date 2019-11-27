import React from 'react';
import { ActionCard } from '../interfaces/ActionCard';

import { Paper, Typography } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';

import { ActionCardListDisplay } from './ActionCardListDisplay';

type PastActionDisplayProps = {
	actionCards: ActionCard[]
}
export function PastActionDisplay(props: PastActionDisplayProps) {
	const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			<Typography>
              Sustained, Coordinated, Relentless, Collective Climate Action
            </Typography>
			<ActionCardListDisplay actionCards={props.actionCards}/>
		</Paper>
	</div>);
}