import React from 'react';
import { useStyles } from '../../styles/style';
import { Box, List, ListItem, Divider } from '@material-ui/core';
import { ActionCheckDisplay } from './ActionCheckDisplay';
import { Action } from '../../interfaces/Action';
import { SurveyResponse } from '../../interfaces/SurveyResponse';

export type ActionListDisplayPropsCheck = {
  actions: Action[],
  doneActions: number[],
  onActionDoneChange: (id: number, done: boolean) => void,
  surveyResponses: SurveyResponse[],
  canSubmit: boolean
}

export function ActionCheckListDisplay(props: ActionListDisplayPropsCheck) {
  const classes = useStyles();

  return (
    <List className={classes.chipBox}>
      {props.actions.map(action => {
        let count: number = 0;
        props.surveyResponses.map(response => {
          count = count + response.doneActions.filter(id => id === action.id).length
        })
        return (
              <Box>
                  <ActionCheckDisplay
                    action={action}
                    done={props.doneActions.includes(action.id)}
                    onActionDoneChange={props.onActionDoneChange}
					count={count}
					canCheck={!props.canSubmit}
                  />
                <Divider/>
              </Box>
        );
      })}
    </List>
  );
}