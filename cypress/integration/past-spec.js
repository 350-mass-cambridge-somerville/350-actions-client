/// <reference types="cypress" />
describe('past actions', () => {
	it('shows past actions', () => {
		cy.server()
		cy.route('/actioncards/', 'fixture:actioncards')
		cy.visit('/past')

		// check the page - should have info from the stubbed response
		// loaded from cypress/fixtures/latest.json
		cy.contains('Past Actions').should('be.visible')
		cy.contains('Action Card #22').should('be.visible')

		// user cannot change past actions
		cy.get('[data-cy=track-action-form]').should('not.exist')

		cy.log('looking at a particular action card')
		cy.get('[data-cy=expansion-panel-2]').click()

		// todo need to figure out how to count only visible ones
		cy.get('[data-cy=action-display]').should('have.length', 15)
	})
})
