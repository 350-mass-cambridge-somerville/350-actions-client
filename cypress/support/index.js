// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support'
import { isOn } from '@cypress/skip-test'
import '@percy/cypress'

/// <reference types="cypress" />

// replace window.fetch with XMLHttpRequest polyfill
// to allow Cypress spying / stubbing Ajax requests
// from the application to the API
// see "Stubbing window.fetch" recipe in
// https://github.com/cypress-io/cypress-example-recipes
let polyfill

// grab fetch polyfill from remote URL, could be also from a local package
before(() => {
	const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'

	cy.request(polyfillUrl).then(response => {
		polyfill = response.body
	})
})

Cypress.on('window:before:load', win => {
	delete win.fetch
	// since the application code does not ship with a polyfill
	// load a polyfilled "fetch" from the test
	win.eval(polyfill)
	win.fetch = win.unfetch
})

/**
 * Locally, all API requests go to something like "localhost:3000/...",
 * but deploy and production deploys forward API requests to "/api/...".
 * This utility command adds "/api" to every "cy.route" when running
 * in non-local environment
 */
Cypress.Commands.overwrite('route', function(
	route,
	methodName,
	endpoint,
	fixture,
) {
	// assume for now every request uses endpoint and fixture
	// or method, endpoint and fixture
	// (no common options signature like cy.route({method:, ...}))
	if (arguments.length === 3) {
		fixture = endpoint
		endpoint = methodName
		methodName = 'GET'
	}

	if (!isOn('localhost')) {
		// probably deployed to Netlify
		// all requests should start with "/api"
		// unless they are to external services
		if (!endpoint.startsWith('http')) {
			endpoint = '/api' + endpoint
		}
	}

	return route(methodName, endpoint, fixture)
})
