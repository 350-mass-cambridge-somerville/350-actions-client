import React from 'react';
import { useStyles } from '../styles/style';
import { Box, List, ListItem, Divider } from '@material-ui/core';
import { ActionCheckDisplay } from './ActionCheckDisplay';
import { ActionDisplay } from './ActionDisplay';
import { Action } from '../interfaces/Action';
import { SurveyResponse } from '../interfaces/SurveyResponse';

export type ActionListDisplayPropsCheck = {
  actions: Action[],
  doneActions: number[],
  onActionDoneChange: (id: number, done: boolean) => void,
  surveyResponses: SurveyResponse[],
}

export type ActionListDisplayPropsNoCheck = {
  actions: Action[],
  surveyResponses:  SurveyResponse[]
}

export function ActionListDisplay(props: ActionListDisplayPropsCheck | ActionListDisplayPropsNoCheck) {
  const classes = useStyles();

  function hasCheckBox(props: ActionListDisplayPropsCheck | ActionListDisplayPropsNoCheck): props is ActionListDisplayPropsCheck {
    return (props as ActionListDisplayPropsCheck).doneActions !== undefined;
  };

  return (
    <List className={classes.chipBox}>
      {props.actions.map(action => {
        let count: number = 0;
        props.surveyResponses.map(response => {
          count = count + response.doneActions.filter(id => id === action.id).length
        })
        return (
              <Box>
                {hasCheckBox(props) && 
                  <ActionCheckDisplay
                    action={action}
                    done={props.doneActions.includes(action.id)}
                    onActionDoneChange={props.onActionDoneChange}
                    count={count}
                  />
                }
                {!hasCheckBox(props) && 
                  <ActionDisplay
                    action={action}
                    count={count}
                  />
                }
                <Divider/>
              </Box>
        );
      })}
    </List>
  );
}