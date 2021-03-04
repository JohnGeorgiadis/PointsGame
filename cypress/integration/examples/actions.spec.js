/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('clicking an element should produce a score', () => {
        cy.get('.pointItem').find('button').first()
            .click();

        cy.get('.playerItemsContainer__totalValue')
            .invoke('text')
            .then(parseFloat)
            .should('be.gt', 0);
    });

    it('clicking an element should generate a scoreCard with qty and score', () => {
        cy.get('.pointItem').find('button').first()
            .click();

        cy.get('.scoreCard')
            .should('be.visible')

        cy.get('.scoreCard__qty')
            .invoke('text')
            .then(parseFloat)
            .should('be.gt', 0);

        cy.get('.scoreCard div')
            .last()
            .invoke('text')
            .then(parseFloat)
            .should('be.gt', 0);
    });

    it('clicking a single element should not produce a bonus', () => {
        cy.get('.pointItem').find('button').first()
            .click();

        cy.get('.playerItemsContainer__bonus')
            .invoke('text')
            .then(parseFloat)
            .should('be.eq', 0);
    });

    it('clicking more elements should produce a bonus', () => {
        cy.get('.pointItem').find('button').first()
            .click();
        cy.wait(1000);
        cy.get('.pointItem').find('button').first()
            .click();
        cy.wait(1000);
        cy.get('.pointItem').find('button').first()
            .click();
        cy.wait(1000);
        cy.get('.pointItem').find('button').first()
            .click();
        cy.wait(1000);
        cy.get('.pointItem').find('button').first()
            .click();
        cy.wait(1000);

        cy.get('.playerItemsContainer__bonus')
            .invoke('text')
            .then(parseFloat)
            .should('be.gt', 0);
    });

    it('clicking new game should reset the game', () => {
        cy.get('.playerItemsContainer__reset').find('button')
            .click();

        cy.get('.playerItemsContainer__bonus')
            .invoke('text')
            .then(parseFloat)
            .should('be.eq', 0);

        cy.get('.playerItemsContainer__totalValue')
            .invoke('text')
            .then(parseFloat)
            .should('be.eq', 0);

        cy.get('.scoreCard')
            .should('not.exist')
    });
})