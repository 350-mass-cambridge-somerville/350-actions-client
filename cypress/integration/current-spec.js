/// <reference types="cypress" />

describe('current action', () => {
	beforeEach(() => {
		cy.server()
		cy.route('/actioncards/latest/', 'fixture:latest')
		cy.visit('/')
		// check the page - should have info from the stubbed response
		// loaded from cypress/fixtures/latest.json
		cy.contains('Action Card 23').should('be.visible')
		cy.get('[data-cy=action-check-display]').should('have.length', 6)
	})

	it('shows current actions', () => {
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

	it('tracks an action anonymously', () => {
		// check  a couple of actions
		cy.get('[data-cy=action-check-display]')
			.first() // same as .eq(0)
			.find('input[type=checkbox]')
			.check()

		cy.get('[data-cy=action-check-display]')
			.eq(1)
			.find('input[type=checkbox]')
			.check()

		cy.route('POST', '/surveyresponses/', {}).as('track')
		cy.get('[data-cy=track-my-actions]').click()

		cy.wait('@track')
			.its('request.body')
			.should('deep.equal', {
				action_card: 4, // same as our fixture
				actions: [5, 6], // ids of the actions from the fixture
				// Cypress comes with moment.js bundled in
				// so we can use same logic as our application
				date: Cypress.moment().format('YYYY-MM-DD'),
				name: '', // anonymous
			})

		cy.contains('button', 'Track my actions!').should('be.disabled')
	})
})
