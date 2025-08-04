import civilPage from '../../pages/CivilPage.js'
import { getFixtureWithNextId } from '../../support/utils.js'


describe('delete civil testing', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
    })

    it('Validate that delete button works', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {   //add a new user
                return civilPage.deleteID(testData.civilId).then(() => { //delete the newly added 
                    civilPage.verifyIDisDeleted(testData.civilId) //verify its deleted
                })
            })
        })
    })

    it.only('Validate that delete all CVs button works', () => {
        cy.intercept('DELETE', '/deleteAll', {
            statusCode: 204,
            body: {},  
        }).as('deleteAll');

        civilPage.elements.deleteAllBtn().click();
        cy.wait('@deleteAll');
        cy.get('tr').should('have.length', 1);
    });

    it('delete a civil that does not exist', () => {
        civilPage.verifyIDisDeleted("desntexist")  //if the ID doesnt exist it wont have an entry in the table therfore no delete button
    })
})