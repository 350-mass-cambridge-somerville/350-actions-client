import React from 'react';
import { useStyles } from '../../styles/style';
import { ExpansionPanel, 
  ExpansionPanelDetails, 
  ExpansionPanelSummary,
  Typography
 } from '@material-ui/core';
import { ActionListDisplay } from '../presentation/ActionListDisplay'
import { ActionCard } from '../../interfaces/ActionCard'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type ActionCardListDisplayProps = {
	actionCards: ActionCard[]
};

export function ActionCardListDisplay(props: ActionCardListDisplayProps) {
  const classes = useStyles();

  return (<div className={classes.actionExpansionPanels}>
      {props.actionCards.map(actionCard => {
        const expansionPanelData = `expansion-panel-${actionCard.id}`
        return (<ExpansionPanel data-cy={expansionPanelData}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Action Card #{actionCard.number}</Typography>
                  </ExpansionPanelSummary>
                  <ActionListDisplay actions={actionCard.actions} surveyResponses={actionCard.surveyResponses}/>
                </ExpansionPanel>);
    })}
    </div>
  );
}