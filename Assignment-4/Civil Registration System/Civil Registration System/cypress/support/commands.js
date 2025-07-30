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

Cypress.Commands.add('editCivilForm', (data) => {
    if (data.firstName) cy.get('#firstName').should('exist').clear().invoke('val', data.firstName)
    if (data.age) cy.get('#age').should('exist').clear().type(data.age)
    if (data.mobile) cy.get('#mobile').should('exist').clear().type(data.mobile)
    if (data.lastName) cy.get('#lastName').should('exist').clear().invoke('val', data.lastName)
    if (data.gender) cy.get('#gender').should('exist').select(data.gender)
    if (data.dob) cy.get('#dob').should('exist').invoke('val', data.dob).trigger('change')
    cy.get('#civilForm > .btn.btn-primary.w-100').should('exist').click()
})

Cypress.Commands.add('checkUserById', (userId, data) => {
    cy.get('#pagination > li').its('length').then(len => {
        cy.get('#pagination > li').eq(len - 1).click()
    })
    cy.get('[data-test="civil-id"]')
        .then(($elements) => {
            const matched = $elements.filter((i, el) => el.textContent.trim() === userId)
            expect(matched.length).to.equal(1)
            cy.wrap(matched).closest('tr').within(() => {
                cy.get('td').eq(0).should('contain.text', data.firstName);
                cy.get('td').eq(1).should('contain.text', data.lastName);
                cy.get('td').eq(2).should('contain.text', data.civilId);
                cy.get('td').eq(3).should('contain.text', data.age);
                cy.get('td').eq(4).should('contain.text', data.mobile);
                cy.get('td').eq(5).should('contain.text', data.gender);
                cy.get('td').eq(6).should('contain.text', data.dob);
            })
            cy.wrap(matched)
                .closest('tr')
                .find('.btn-outline-danger')
                .click()
        })
})

Cypress.Commands.add('editID', (id) => {
    cy.get('#pagination > li').its('length').then((len) => {
        function clickPage(index) {
            if (index >= len) return;

            cy.get('#pagination > li').eq(index).click()
            cy.get('[data-test="civil-id"]').then(($elements) => {
                const matched = $elements.filter((i, el) => el.textContent.trim() === id)
                if (matched.length != 0) {
                    cy.wrap(matched)
                        .closest('tr')
                        .find('.btn.btn-sm.btn-outline-primary.me-1').should('exist')
                        .click()
                }
                else if (index === len-1) {    
                        expect(matched.length).to.equal(0)
                }
            }).then(() => {
                clickPage(index + 1)
            })
        }
        clickPage(0)
    })
})


Cypress.Commands.add('deleteID', (id) => {
      cy.get('#pagination > li').its('length').then((len) => {
          function clickPage(index) {
            if (index >= len) return;

            cy.get('#pagination > li').eq(index).click();

            cy.get('[data-test="civil-id"]').then(($elements) => {
              const matched = $elements.filter((i, el) => el.textContent.trim() === id);
              if (matched.length != 0) {
                    cy.wrap(matched)
                    .closest('tr')
                    .find('.btn-outline-danger').should('exist')
                    .click()
                }
                else if (index === len-1) {    
                    expect(matched.length).to.equal(0)
                }
            }).then(() => {
              clickPage(index + 1);
            });
          }

          clickPage(0);
        });
});

