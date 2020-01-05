import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";

import {Paper} from '@material-ui/core';
import {ActionAppBar} from './components/logic/ActionAppBar';
import {MainContentHeader} from './components/presentation/MainContentHeader';
import {CurrentActionView} from './components/logic/CurrentActionView';
import {CreateActionView} from './components/logic/CreateActionView';
import {PastActionView} from './components/logic/PastActionView';
import {AuthProvider} from './components/providers/AuthProvider';
import 'typeface-roboto';
//import { classes } from "istanbul-lib-coverage";
import { useStyles, theme } from './styles/style'
import { useTheme, ThemeProvider } from '@material-ui/styles';
import { SignInForm } from "./components/logic/SignInForm";
import { RegistrationForm } from "./components/logic/RegistrationForm";


export default function App() {
  //const theTheme = useTheme();
  const classes = useStyles();
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
        <div>
          <ActionAppBar/>
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

function SignInModal() {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <SignInForm/>
      </div>
    </div>
    );
}

function SignInView() {
  const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			<MainContentHeader mainTitle={"Past Actions"} />
			<SignInForm />
		</Paper>
	</div>);
}

function RegisterView() {
  const classes = useStyles(theme);
	return (<div>
		<Paper className={classes.contentMain}>
			<MainContentHeader mainTitle={"Past Actions"} />
			<RegistrationForm />
		</Paper>
	</div>);
}

function RegisterModal() {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <RegistrationForm/>
      </div>
    </div>
    );
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
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && <Route path="/sign-in" children={<SignInModal />} />}
      {background && <Route path="/register" children={<RegisterModal />} />}
    </div>
  );
}