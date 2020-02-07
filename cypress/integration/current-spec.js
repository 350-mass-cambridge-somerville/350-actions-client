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

  cy.request(polyfillUrl)
    .then((response) => {
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

describe('current action', () => {
  it('shows current actions', () => {
    cy.server()
    cy.route('/actioncards/latest/', 'fixture:latest')
    cy.visit('/')

    // check the page - should have info from the stubbed response
    // loaded from cypress/fixtures/latest.json
    cy.contains('Action Card 23').should('be.visible')
    cy.get('[data-cy=action-check-display]').should('have.length', 6)

    // todo figure out how to make this check actual number
    cy.get('[data-cy=action-count]').should('have.length', 6)
  })
})
