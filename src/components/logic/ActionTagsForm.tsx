import React, { Component } from 'react';
import { FormControl, TextField, Chip, FormHelperText } from '@material-ui/core';
import { useStyles } from '../styles/style';
import ChipInput  from 'material-ui-chip-input'

type ActionTagsProps = {tags: string[], onTagsChange: (tags: string[]) => void}

export function ActionTagsForm(props: ActionTagsProps) {
	const classes = useStyles();

	function handleAddTag(tag: string) {
		let newTags: string[] = props.tags.concat([tag]);
		props.onTagsChange(newTags);
	}

	function handleDeleteTag(tag: string, index: number) {
		let newTags: string[] = props.tags.filter(t => t != tag);
		props.onTagsChange(newTags);
	}

	return(
		<FormControl className={classes.formControl} variant="outlined">
			<ChipInput
				value={props.tags}
				onAdd={(chip) => handleAddTag(chip)}
				onDelete={(chip, index) => handleDeleteTag(chip, index)}
			/>
			<FormHelperText>action tags</FormHelperText>
      </FormControl>
);
}