import React from 'react';
import { useStyles } from '../styles/style';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ActionListDisplay } from './ActionListDisplay'
import { ActionCard } from '../interfaces/ActionCard'
import { ActionList } from 'material-ui/svg-icons';

export type ActionCardListDisplayProps = {
	actionCards: ActionCard[]
}
export default function ActionTagsDisplay(props: ActionCardListDisplayProps) {
  const classes = useStyles();

  return (
    <div className={classes.actionExpansionPanels}>
      {props.actionCards.map(actionCard => {
        return (
          <ExpansionPanelSummary>
			  <Typography>Action Card {actionCard.id}</Typography>
		  </ExpansionPanelSummary>
		  <ExpansionPanelDetails>
			  <ActionListDisplay
			  	actions={actionCard.actions}
			  />
		  </ExpansionPanelDetails>
        );
      })}
    </dive>
  );
}