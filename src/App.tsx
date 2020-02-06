import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {ActionAppBar} from './components/logic/ActionAppBar';
import {CurrentActionView} from './components/logic/CurrentActionView';
import {PastActionView} from './components/logic/PastActionView';
import {AuthProvider} from './components/providers/AuthProvider';
import 'typeface-roboto';
import { useStyles, theme } from './styles/style'
import { ThemeProvider } from '@material-ui/styles';

export default function App() {
  const classes = useStyles();

  //todo add state for logged in, pass logged in state
  return (
    <AuthProvider>
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
    </AuthProvider>

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
