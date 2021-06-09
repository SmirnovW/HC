Cypress.Commands.add('fillAndSubmitPollForm', () => {
    cy.get('[data-testid=poll-question-input]').type('New super question');

    cy.get('[data-testid=poll-option-input-0]').type('First option');
    cy.get('[data-testid=poll-option-input-1]').type('Second option');

    cy.get('[data-testid=submit-poll-button]').click();
});
