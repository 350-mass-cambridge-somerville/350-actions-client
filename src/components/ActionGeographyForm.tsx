import React, { Component, ChangeEvent, ReactNode } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { GeographyType } from '../interfaces/GeographyType';

export function ActionGeographyForm(props: {selected: GeographyType, 
	onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void}) 
{
	return ( 
		<Select onChange={props.onChange} value={props.selected}>
			{Object.values(GeographyType).map((value) => {
				//console.log(`GT value is ${value}`);
				return <MenuItem value={value}>{value}</MenuItem>;
			})}
		</Select>
	);
}