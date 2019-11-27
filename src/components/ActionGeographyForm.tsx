import React, { Component, ChangeEvent, ReactNode} from "react";
import { Select, MenuItem, FormControl, FormHelperText } from "@material-ui/core";
import { GeographyType } from '../interfaces/GeographyType';
import { useStyles } from '../styles/style';

export function ActionGeographyForm(props: {selected: GeographyType, 
	onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void}) 
{
	const classes = useStyles();
	return ( 
		<FormControl className={classes.formControl} variant="outlined">
			<Select className={classes.selectPrimary} onChange={props.onChange} value={props.selected}>
				{Object.values(GeographyType).map((value) => {
					//console.log(`GT value is ${value}`);
					return <MenuItem value={value}>{value}</MenuItem>;
				})}
			</Select>
			<FormHelperText>Action geography</FormHelperText>
		</FormControl>
	);
}