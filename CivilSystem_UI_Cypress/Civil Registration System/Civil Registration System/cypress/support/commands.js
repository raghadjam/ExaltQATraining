/// <reference types="cypress" />
// ***********************************************

Cypress.Commands.add('getDataTest', (selector) => {
  return cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add('validateFieldError', (selector, expectedError) => {
    selector
    .invoke('prop', 'validationMessage')
    .should((actualError) => {
      expect(actualError).to.match(expectedError);
    });
});




