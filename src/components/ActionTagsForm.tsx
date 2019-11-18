import React, { Component } from 'react';

type ActionTagsState = {tags: string[]}
type ActionTagsProps = {tags: string[], onTagsChange: (tags: string[]) => void}
export class ActionTagsForm extends Component<ActionTagsProps, ActionTagsState> {
	state: ActionTagsState = {
		tags: []
	}

	constructor(props: ActionTagsProps) {
		super(props);
	}

	render() {
		return <div></div>;
	}
}