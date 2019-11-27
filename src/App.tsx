import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AppBar, Tabs, Tab, Typography} from '@material-ui/core';
import {CurrentActionView} from './components/CurrentActionView';
import {CreateActionView} from './components/CreateActionView';
import {PastActionView} from './components/PastActionView';
import 'typeface-roboto';
//import { classes } from "istanbul-lib-coverage";
import { useStyles, theme } from './styles/style'
import { useTheme, ThemeProvider } from '@material-ui/styles';

export default function App() {
  const theTheme = useTheme();
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div className={classes.root}>
      <div>
        <AppBar 
          className={classes.appBar}
          position="sticky">
          <Tabs value={false} aria-label="simple tabs example" centered>
            <Tab label="Current" component={Link} to="/"/>
            <Tab label="Past"    component={Link} to="/past"/>
            <Tab label="Create"   component={Link} to="/create"/>
          </Tabs>
        </AppBar>
      </div>
      <main className={classes.contentMain}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/past">
            <Past />
          </Route>
          <Route path="/">
            <Current />
          </Route>
        </Switch>
      </main>
      </div>
      </ThemeProvider>
    </Router>
  );
}

function Current() {
  return (<React.Fragment>
            <CurrentActionView/>
  </React.Fragment>);
}

function Create() {
  return <CreateActionView/>;
}

function Past() {
  return (<PastActionView/>);
}