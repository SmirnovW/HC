/// <reference types="cypress" />

import { goOffline } from '../utils/network';

context('Offline mode', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/', { timeout: 10000 });
    });

    it('should open offline mode form', () => {
        goOffline();

        cy.fillAndSubmitPollForm().should(() => {
            const data = JSON.parse(
                window.localStorage.getItem('abandoned_poll')
            );

            expect(data?.question).to.eq('New super question');
            expect(data?.choices[0]).to.eq('First option');
            expect(data?.choices[1]).to.eq('Second option');
        });
    });
});
