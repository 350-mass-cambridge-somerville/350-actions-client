import React, { Component, ReactNode } from 'react';
import { ActionDisplay } from './ActionDisplay';
import { Action } from '../interfaces/Action';
import { Paper, Typography } from '@material-ui/core';

export class CurrentActionView extends Component {
	state: {actions: Action[]} = {
		actions: []
	};

	componentDidMount() {
		this.fetchActions()
		.then((actions) => {
			console.log(`actions are: ${JSON.stringify(actions)}`);
			this.setState({actions: actions});
		})
		.catch((err) => {
			console.log(`Error fetching actions: ${err}`, err);
		})
	}

	fetchActions(): Promise<Array<any>> {
		return fetch('http://localhost:3000/actions', {method: 'GET'})
      		.then((data: Response) => {
				  const dj = data.json();
				  console.log(`got data! ${JSON.stringify(dj)}`, dj);
				  return dj;
				})
	}

	render(): ReactNode {
		return (<div>
			<Paper>
				<Typography variant="h1" >Current Actions: {this.state.actions.length}</Typography>
				<ul>
					{this.state.actions.map((value, index) => {
						return <li key={index}><ActionDisplay action={value}/></li>;
					})}
				</ul>
			</Paper>
		</div>);
	}
}