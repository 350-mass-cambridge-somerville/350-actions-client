/// <reference types="cypress" />

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
		cy.get('[data-cy=action-display-6]').within(display => {
			cy.get('[data-cy=action-count]').contains('8')

			// test tags length
			cy.get('[data-cy=action-tags]')
				.children()
				.should('have.length', 3)
			cy.get('[data-cy=action-tags]').contains('roadmap-bill')
		})

		cy.get('[data-cy=track-action-form]').should('be.visible')
	})
})
