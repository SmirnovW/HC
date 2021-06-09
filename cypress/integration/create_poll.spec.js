/// <reference types="cypress" />

context('Create poll', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/', { timeout: 10000 });
    });

    it('should show errors if form is not filled', () => {
        cy.intercept('POST', '**/questions').as('createPoll');
        // https://on.cypress.io/type
        cy.get('[data-testid=create-poll-link]').click();

        cy.get('[data-testid=submit-poll-button]').click();

        cy.wait('@createPoll').should(({ request, response }) => {
            expect(response).property('statusCode').to.equal(400);
        });

        cy.get('[data-testid=poll-question-input]')
            .next()
            .should('contain', 'does not meet minimum length of 1');
    });

    it('should submit new poll', () => {
        cy.intercept('POST', '**/questions').as('createPoll');
        // https://on.cypress.io/type
        cy.get('[data-testid=create-poll-link]').click();

        cy.fillAndSubmitPollForm();

        cy.wait('@createPoll').should(({ request, response }) => {
            expect(response).property('statusCode').to.be.oneOf([200, 201]);
            expect(response)
                .property('body')
                .to.have.property('question')
                .and.equal('New super question');
        });

        cy.get('[data-testid=question-title]').should(
            'contain',
            'New super question'
        );
    });
});
