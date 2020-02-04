import React from 'react';
import { useStyles } from '../../styles/style';
import { List, ListItem, Divider } from '@material-ui/core';
import { ActionDisplay } from './ActionDisplay';
import { Action } from '../../interfaces/Action';
import { SurveyResponse } from '../../interfaces/SurveyResponse';


export type ActionListDisplayPropsNoCheck = {
  actions: Action[],
  surveyResponses:  SurveyResponse[]
}

export function ActionListDisplay(props: ActionListDisplayPropsNoCheck) {
  const classes = useStyles();

  return (
    <List className={classes.chipBox}>
      {props.actions.map(action => {
        let count: number = 0;
        props.surveyResponses.map(response => {
          count = count + response.doneActions.filter(id => id === action.id).length
        })
        return (
              <ListItem data-cy="action-display">
                  <ActionDisplay
                    action={action}
                    count={count}
                  />
                <Divider/>
              </ListItem>
        );
      })}
    </List>
  );
}
