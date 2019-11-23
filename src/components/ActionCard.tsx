import React, { useState, ReactNode } from 'react';
import {Action} from '../interfaces/Action';
import {
	Paper,
	Checkbox,
	Typography,
	Grid
} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { ActionGeographyDisplay } from './ActionGeographyDisplay';
import { ActionDateDisplay } from './ActionDateDisplay'
import { ActionCountDisplay } from './ActionCountDisplay';

const useStyles = makeStyles(theme => ({
	card: {
	  display: 'flex',
	},
	content: {
	  flex: '1 0.33 auto',
	},
	done: {
		width: '30%'
	},
  }));

export function ActionCard(props: {action: Action}) {
	const classes = useStyles();
	//const theme = useTheme();
	const [done, setDone] = useState(false);

	function onCheck(event: any) {
		setDone(event.target.checked);
	};

	return (
	<Paper className={classes.card}>
		<Grid container direction='column' alignItems='stretch'>
			<Grid item>
				<Grid container justify='space-between'>
					<Grid item>
						<ActionGeographyDisplay geographyType={props.action.geographyType}/>
					</Grid>
					<Grid item>
						<ActionDateDisplay 
							dateType={props.action.dateType} 
							date={props.action.date}
							dateStart={props.action.dateStart}
							dateEnd={props.action.dateEnd}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Grid container justify='space-between'>
					<Grid item>
						<Grid container>
							<Grid item>
								<Checkbox checked={done} onChange={onCheck}/>
							</Grid>
							<Grid item>
								<Typography dangerouslySetInnerHTML={{__html: props.action.description}}></Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<ActionCountDisplay count={10}/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Paper>);
}
