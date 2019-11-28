import React, { Component } from 'react';
import { FormControl, Select, MenuItem, Chip, FormHelperText } from '@material-ui/core';
import { useStyles, theme } from '../styles/style';

type ActionTagsProps = {tags: string[], onTagsChange: (tags: string[]) => void}

export function ActionTagsForm(props: ActionTagsProps) {
	const classes = useStyles();

	function handleChange(event: any) : void {
		props.onTagsChange(props.tags);
	}
	return(
		<FormControl className={classes.formControl} variant="outlined">
			<Select
			className={classes.selectPrimary}
			labelId="demo-mutiple-chip-label"
			id="demo-mutiple-chip"
			multiple
			value={props.tags}
			onChange={handleChange}
			//input={<Input id="select-multiple-chip" />}
			renderValue={selected => (
				<div>
				{(selected as string[]).map(value => (
					<Chip key={value} label={value} className={classes.chip} />
				))}
				</div>
			)}
			>
			{props.tags.map(tag => (
				<MenuItem key={tag} value={tag}>
					{tag}
				</MenuItem>
			))}
			<MenuItem>new tag</MenuItem>
			</Select>
			<FormHelperText>action tags</FormHelperText>
      </FormControl>
);
}