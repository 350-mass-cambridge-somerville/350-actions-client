import React from 'react';
import { useStyles } from '../styles/style';
import { Box, List, ListItem, Divider } from '@material-ui/core';
import { ActionDisplay } from './ActionDisplay';
import { Action } from '../interfaces/Action';

export type ActionListDisplayProps = {
	actions: Action[]
}
export function ActionListDisplay(props: ActionListDisplayProps) {
  const classes = useStyles();

  return (
    <List className={classes.chipBox}>
      {props.actions.map(action => {
        return (
		  <Box>
			<ActionDisplay
				action={action}
			/>
			<Divider/>
		  </Box>
        );
      })}
    </List>
  );
}