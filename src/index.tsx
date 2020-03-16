import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// if we are building on CI and have the commit SHA available
// attach it to the "window" object for simpler debugging
if (process.env.GITHUB_SHA) {
	// @ts-ignore
	window.sha = process.env.GITHUB_SHA
}
