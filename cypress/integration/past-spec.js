/// <reference types="cypress" />
describe('past actions', () => {
	const noActionsAreVisible = () => {
		cy.log('no actions are visible yet')
		cy.get('[data-cy=action-display]').should('not.be.visible')
		// but there are N actions behind 3 cards
		cy.get('[data-cy=action-display]').should('have.length', 15)
	}

	const getExpansionCardDataCy = cardId => {
		expect(cardId).to.be.a('number')
		return `[data-cy=expansion-panel-${cardId}]`
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
		cy.get(getExpansionCardDataCy(2))
			.find('[data-cy=close-open-card]')
			.click()

		cy.log('only visible actions from the card')
		cy.get('[data-cy=action-display]:visible').should('have.length', 4)

		cy.log('closing card')
		cy.get(getExpansionCardDataCy(2))
			.find('[data-cy=close-open-card]')
			.click()
		noActionsAreVisible()
	})

	it('does not show UNDEFINED for geography', () => {
		// fixture where we forgot to specify geography region
		// and it got set to the default "UNDEFINED" string
		const fixtureName = 'undefined-geography'
		cy.fixture(fixtureName)
			.its('0.actions.0.geography_type')
			.should('equal', 'UNDEFINED')
		// the second action in that card has geography
		cy.fixture(fixtureName)
			.its('0.actions.1.geography_type')
			.should('equal', 'STATE')

		cy.server()
		cy.route('/actioncards/', 'fixture:' + fixtureName)
		cy.visit('/past')
		cy.get(getExpansionCardDataCy(5)) // card id from the the fixture
			.click()

		// card text is visible
		cy.contains('Build the climate movement by').should('be.visible')

		// even if the card has geography set to string "UNDEFINED"
		// it should not show up in the UI
		cy.contains('UNDEFINED').should('not.exist')
		// geography for the second action is visible
		cy.contains('[data-cy=geography-type]', 'STATE').should('be.visible')
	})
})
