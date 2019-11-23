import React from 'react';
import { useStyles } from '../styles/style';
import { Chip, Box } from '@material-ui/core';

export type TagsDisplayProps = {
	tags: string[]
}
export default function ActionTagsDisplay(props: TagsDisplayProps) {
  const classes = useStyles();

  return (
    <Box className={classes.chipBox}>
      {props.tags.map(tag => {
        return (
          <Chip
            label={tag}
            className={classes.chip}
          />
        );
      })}
    </Box>
  );
}