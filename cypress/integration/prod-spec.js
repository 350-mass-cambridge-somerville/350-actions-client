// minimal number of tests that are safe to run
// against the production deploy
/// <reference types="cypress" />
import { isOn } from '@cypress/skip-test'

const describeOrSkip = isOn('localhost') ? describe.skip : describe

describeOrSkip('prod tests', () => {
	it('has the current card', () => {
		cy.visit('/')
		cy.contains('Action Card').should('be.visible')
		cy.contains('Track my actions!').should('be.visible')
		cy.get('[data-cy=action-check-display]').should('have.length.gt', 3)
	})

	it('goes to past', () => {
		cy.visit('/')
		cy.contains('a[href="/past"]', 'Past').click()
		cy.location('href').should('match', /\/past$/)
		cy.get('[data-cy="close-open-card"]').should('have.length.gt', 2)
	})

	it('has past cards', () => {
		cy.visit('/past')
	})

	it('has baseUrl set on window', () => {
		cy.visit('/')
		cy.window()
			.its('baseUrl')
			.should('be.a', 'string')
	})
})
