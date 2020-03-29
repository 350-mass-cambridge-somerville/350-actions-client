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

	it.only('sends an error to Sentry', () => {
		cy.route('POST', 'https://sentry.io/api/*/store/*', {
			id: 'abc123',
		}).as('sentry')

		cy.on('uncaught:exception', e => {
			// only ignore OUR test error message
			return e.message === 'test error'
		})

		// create an error, as if application has thrown it
		cy.window().invoke(
			'setTimeout',
			() => {
				throw new Error('test error')
			},
			1000,
		)
		// confirm the call has happened
		cy.wait('@sentry')
			.its('requestBody')
			.should(body => {
				expect(body.level).to.equal('error')
				expect(body.exception.values).to.have.length(1)
				expect(body.exception.values[0]).to.deep.contain({
					type: 'Error',
					value: 'test error',
				})
			})
	})

	it('has baseUrl set on window', () => {
		cy.window()
			.its('baseUrl')
			.should('be.a', 'string')
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
		// check a couple of actions
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

	it('tracks an action with name', () => {
		cy.get('#standard-basic').type('Mo')
		// check a couple of actions
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
				name: 'Mo',
			})

		cy.contains('button', 'Track my actions!').should('be.disabled')
	})
})
