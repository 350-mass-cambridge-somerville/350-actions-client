import React, { Component, ReactNode } from 'react';
import { ActionCardFormDisplay } from './ActionCardFormDisplay';

type ActionCardFormState = {
	submitted: boolean,
	error?: string
}

type ActionCardFormProps = {
	ids: number[],
	selectedId: number,
	date: Date,
	number: number,
	onNumberChange: (number: number) => void,
	onDateChange: (date: any) => void,
	onIdChange: (id: number) => void
}

export class ActionCardForm extends Component<ActionCardFormProps, ActionCardFormState> {
	state: ActionCardFormState = {
		submitted: false,
	}

	classes: any;

	constructor(props: ActionCardFormProps) {
		super(props);
		//this.classes = useStyles(theme);
		this.onIdChange = this.onIdChange.bind(this);
		this.onNumberChange = this.onNumberChange.bind(this);
	}

	onIdChange(event: any): void {
		this.props.onIdChange(event.target.value);
	}

	onNumberChange(event: any): void {
		this.props.onNumberChange(event.target.value);
	}

	render() {
		return <ActionCardFormDisplay {...this.props} onNumberChange={this.onNumberChange} onIdChange={this.onIdChange}/>
	}
}