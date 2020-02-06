import React from 'react';
import { ActionCard } from '../../interfaces/ActionCard';

import { Paper } from '@material-ui/core';
import { useStyles, theme } from '../../styles/style';

import { MainContentHeader } from './MainContentHeader';
import { ActionCardListDisplay } from './ActionCardListDisplay';

type PastActionDisplayProps = {
	actionCards: ActionCard[]
}
export function PastActionDisplay(props: PastActionDisplayProps) {
	const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			<MainContentHeader mainTitle={"Past Actions"} />
			<ActionCardListDisplay actionCards={props.actionCards}/>
		</Paper>
	</div>);
}
