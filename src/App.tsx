import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AppBar, Tabs, Tab} from '@material-ui/core';
import {CurrentActionView} from './components/CurrentActionView';
import {ActionTextInput} from './components/ActionTextInput';
import 'typeface-roboto';
import { ActionForm } from "./components/ActionForm";

export default function App() {
  return (
    <Router>
      <div>
        <AppBar position="sticky">
          <Tabs value={false} aria-label="simple tabs example" centered>
            <Tab label="Current" component={Link} to="/"/>
            <Tab label="Past"    component={Link} to="/past"/>
            <Tab label="About"   component={Link} to="/about"/>
          </Tabs>
        </AppBar>
      </div>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/past">
            <Past />
          </Route>
          <Route path="/">
            <Current />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Current() {
  return <CurrentActionView/>;
}

function About() {
  return <h2>About</h2>;
}

function Past() {
  return (<div><ActionForm/></div>);
}