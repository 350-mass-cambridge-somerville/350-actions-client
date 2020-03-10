/// <reference types="cypress" />

describe('navigation', () => {
	it('goes from current to past and back', () => {
		cy.server()
		cy.stubRoute('/actioncards/latest/', 'fixture:latest')
		cy.stubRoute('/actioncards/', 'fixture:actioncards')

		cy.visit('/')
		cy.contains('Action Card 23').should('be.visible')

		cy.get('header')
			.contains('Past')
			.click()
		cy.url().should('match', /\/past$/)
		cy.contains('Past Actions').should('be.visible')

		cy.go('back')
		cy.url().should('not.match', /\/past$/)
		cy.contains('Action Card 23').should('be.visible')
	})
})
