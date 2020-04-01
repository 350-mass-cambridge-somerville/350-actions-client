import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as Sentry from '@sentry/browser'
import App from './App'
import * as serviceWorker from './serviceWorker'

// if we are building on CI and have the commit SHA available
// attach it to the "window" object for simpler debugging
let release
if (process.env.REACT_APP_COMMIT_SHA) {
	const sha = process.env.REACT_APP_COMMIT_SHA
	// @ts-ignore
	window.sha = sha
	release = `350-actions-client@${sha}`
}

// initialize crash reporting service
// https://docs.sentry.io/platforms/javascript/react/
Sentry.init({
	dsn: 'https://3a26192f88af40ea8d108d540e204f13@sentry.io/5179348',
	release,
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
