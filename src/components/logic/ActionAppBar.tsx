import React , { ReactNode, useState } from 'react';
import { AppBar, Toolbar, Tab, Tabs, Button, Popover } from '@material-ui/core';
import { Link, useLocation } from "react-router-dom";
import { useStyles, theme } from '../../styles/style';
import { SignInForm } from './SignInForm';
import { useAuth } from '../providers/AuthProvider';

type ActionAppBarProps = {
}

export function ActionAppBar(props: ActionAppBarProps) {
	const classes = useStyles(theme);
	const authContext = useAuth();
	const location = useLocation();
	//const [popoverOpen, setPopoverOpen] = useState(true);
	
	function generateLogoutLogin(): ReactNode {
		if (authContext.userData.isAuthorized) {
			return (<React.Fragment>
				<Button
				variant="contained"
				color="secondary" 
				onClick={() => authContext.logout()}
				>Logout</Button>
			</React.Fragment>);
		} else {
			return 	(<React.Fragment>
			<Button 
			 variant="contained"
			 color="secondary" 
			 component={Link} 
			 to={'/sign-in'}>Login</Button>
			</React.Fragment>);
		}
	}



	return (
		//<BrowserRouter>
		<AppBar 
		className={classes.appBar}
		position="sticky">
		<Toolbar>
			<Tabs value={false} aria-label="nav" centered>
				<Tab label="About" component={Link} to="/"/>
				<Tab label="Current" component={Link} to="/"/>
				<Tab label="Past"    component={Link} to="/past"/>
				{authContext.userData.isAuthorized && 
				<React.Fragment>
					<Tab label="Create"  component={Link} to={{
							pathname: `/create`,
							// This is the trick! This link sets
							// the `background` in location state.
							// state: { background: location }
					}}/>
					<Tab label="Export" component={Link} to="/export" />
				</React.Fragment>
				}
			</Tabs>
			{generateLogoutLogin()}
		</Toolbar>
	  </AppBar>
	  //</BrowserRouter>
	);
}