import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AppBar, Tabs, Tab, Typography} from '@material-ui/core';
import {ActionAppBar} from './components/logic/ActionAppBar';
import {CurrentActionView} from './components/logic/CurrentActionView';
import {CreateActionView} from './components/logic/CreateActionView';
import {PastActionView} from './components/logic/PastActionView';
import 'typeface-roboto';
//import { classes } from "istanbul-lib-coverage";
import { useStyles, theme } from './styles/style'
import { useTheme, ThemeProvider } from '@material-ui/styles';

export default function App() {
  //const theTheme = useTheme();
  const classes = useStyles();

  //todo add state for logged in, pass logged in state
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div className={classes.root}>
      <div>
        <ActionAppBar/>
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
  return <div>This is disabled, how did you get here?</div>
  //return <CreateActionView/>;
}

function Past() {
  return (<PastActionView/>);
}