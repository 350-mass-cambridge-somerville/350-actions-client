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

    // check that we are displaying the correct count for a card
    // also test tags
    cy.get('[data-cy=action-display-6]').within((display) => {
      cy.get('[data-cy=action-count]').contains('8')

      // test tags length
      cy.get('[data-cy=action-tags]').children().should('have.length', 3)
      cy.get('[data-cy=action-tags]').contains('roadmap-bill')
    })

  })
})
