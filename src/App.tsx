import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import { Paper } from '@material-ui/core';
import { ActionAppBar } from './components/logic/ActionAppBar';
import { MainContentHeader } from './components/presentation/MainContentHeader';
import { CurrentActionView } from './components/logic/CurrentActionView';
import { PastActionView } from './components/logic/PastActionView';
import { AuthProvider } from './components/providers/AuthProvider';
import 'typeface-roboto';
import { useStyles, theme } from './styles/style'
import { ThemeProvider } from '@material-ui/styles';
import { RegistrationForm } from "./components/logic/RegistrationForm";

export default function App() {
  const classes = useStyles();
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <div>
              <ActionAppBar />
            </div>
            <main className={classes.contentMain}>
              <ActionRoutes />
            </main>
          </div>
        </ThemeProvider>
      </Router>
    </AuthProvider>

  );
}

function Current() {
  return (<React.Fragment>
    <CurrentActionView />
  </React.Fragment>);
}

function Create() {
  return <div>This is disabled, how did you get here?</div>
  //return <CreateActionView/>;
}

function Past() {
  return (<PastActionView />);
}

function SignInView() {
  const classes = useStyles(theme);
	/**return (<div>
		<Paper className={classes.contentMain}>
			<MainContentHeader mainTitle={""} />
			<SignInForm />
		</Paper>
  </div>);**/
  return (<div>
    <Paper className={classes.contentMain}>
      <MainContentHeader mainTitle={""} />
      Coming soon!
		</Paper>
  </div>)
}

function RegisterView() {
  const classes = useStyles(theme);
  return (<div>
    <Paper className={classes.contentMain}>
      <MainContentHeader mainTitle={""} />
      <RegistrationForm />
    </Paper>
  </div>);
}

function ActionRoutes() {
  let location = useLocation();

  // This piece of state is set when one of the
  // gallery links is clicked. The `background` state
  // is the location that we were at when one of
  // the gallery links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the gallery in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<Current />} />
        <Route path="/past" children={<Past />} />
        <Route path="/sign-in" children={<SignInView />} />
        <Route path="/register" children={<RegisterView />} />
        <Route path="/create" children={<Create />} />
      </Switch>
    </div>
  );
}
