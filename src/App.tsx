import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {AppBar, Tabs, Tab} from '@material-ui/core';
import {CurrentActionView} from './components/CurrentActionView';
import {CreateActionView} from './components/CreateActionView';
import 'typeface-roboto';


export default function App() {
  return (
    <Router>
      <div>
        <AppBar position="sticky">
          <Tabs value={false} aria-label="simple tabs example" centered>
            <Tab label="Current" component={Link} to="/"/>
            <Tab label="Past"    component={Link} to="/past"/>
            <Tab label="Create"   component={Link} to="/create"/>
          </Tabs>
        </AppBar>
      </div>
      <div>
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
      </div>
    </Router>
  );
}

function Current() {
  return <CurrentActionView/>;
}

function Create() {
  return <CreateActionView/>;
}

function Past() {
  return (<div></div>);
}