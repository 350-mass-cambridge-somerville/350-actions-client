/// <reference types="cypress" />
describe('past actions', () => {
	const noActionsAreVisible = () => {
		cy.log('no actions are visible yet')
		cy.get('[data-cy=action-display]').should('not.be.visible')
		// but there are N actions behind 3 cards
		cy.get('[data-cy=action-display]').should('have.length', 15)
	}

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

		cy.log('there are 3 past cards')
		cy.get('[data-test-id=expansion-panel]').should('have.length', 3)

		noActionsAreVisible()

		cy.log('looking at a particular action card')
		cy.get('[data-cy=expansion-panel-2]')
			.find('[data-cy=close-open-card]')
			.click()

		cy.log('only visible actions from the card')
		cy.get('[data-cy=action-display]:visible').should('have.length', 4)

		cy.log('closing card')
		cy.get('[data-cy=expansion-panel-2]')
			.find('[data-cy=close-open-card]')
			.click()
		noActionsAreVisible()
	})
})
