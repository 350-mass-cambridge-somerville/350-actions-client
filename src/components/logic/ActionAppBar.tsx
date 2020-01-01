import React , { ReactNode, useState } from 'react';
import { AppBar, Tab, Tabs, Button, Popover } from '@material-ui/core';
import {
	BrowserRouter,
	Link
  } from "react-router-dom";
  import { useStyles, theme } from '../../styles/style';
import { SignInForm } from './SignInForm';
import { useAuth } from '../providers/AuthProvider';

type ActionAppBarProps = {
}

export function ActionAppBar(props: ActionAppBarProps) {
	const classes = useStyles(theme);
	const authContext = useAuth();
	const [popoverOpen, setPopoverOpen] = useState(true);
	
	function generateLogoutLogin(): ReactNode {
		if (authContext.userData.isAuthorized) {
			return (<React.Fragment>
				<Button>Logout</Button>
			</React.Fragment>);
		} else {
			return 	(<React.Fragment>
			<Button>Login</Button>
			</React.Fragment>);
		}
	}

	function generateLogoutLoginForm(): ReactNode {
		return (
			<SignInForm />
		);
	}

	function handleClose(): void {
		setPopoverOpen(false);
	}


	return (
		//<BrowserRouter>
		<AppBar 
		className={classes.appBar}
		position="sticky">
		<Tabs value={false} aria-label="nav" centered>
		  <Tab label="About" component={Link} to="/"/>
		  <Tab label="Current" component={Link} to="/"/>
		  <Tab label="Past"    component={Link} to="/past"/>
		  <Tab label="Create"  component={Link} to="/create" disabled/>
		</Tabs>
		{generateLogoutLogin()}
		<Popover 
			open={popoverOpen}
			onClose={handleClose}
		>
			{generateLogoutLoginForm()}
		</Popover>
	  </AppBar>
	  //</BrowserRouter>
	);
}