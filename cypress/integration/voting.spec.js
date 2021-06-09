/// <reference types="cypress" />

context('Submit vote', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/', { timeout: 10000 });
    });

    it('should vote for poll', () => {
        cy.intercept('POST', '**/questions/**/choices/**').as('submitVote');
        cy.get('[data-testid=poll-card-0]').click();

        cy.get('[data-testid=poll-choice-1]')
            .click()
            .find('div')
            .invoke('text')
            .then((text) => {
                cy.get('[data-testid=submit-vote-button]').click();
                cy.wait('@submitVote').should(({ request, response }) => {
                    expect(response)
                        .property('statusCode')
                        .to.be.oneOf([200, 201]);
                    expect(response)
                        .property('body')
                        .to.have.property('choice')
                        .and.equal(text);
                });
            });
    });
});
