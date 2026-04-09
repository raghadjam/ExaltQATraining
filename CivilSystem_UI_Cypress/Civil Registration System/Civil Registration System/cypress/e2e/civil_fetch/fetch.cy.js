import civilPage from '../../pages/CivilPage.js'
import { getFixtureWithNextId } from '../../support/utils.js'

describe('edit civil testing', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
    })

    it('fetch all civils when no users exist', () => {
        cy.request('GET', `${baseUrl}get/all`).then((response) => {
            const data = JSON.parse(response.body)
            expect(data).to.have.length(0);
        })
    })

    it.only('fetch all civils when a lot of users exist', () => {
        const baseUrl = Cypress.env('BASE_URL')
        cy.get("tr").should("have.length", 1)
        cy.request('GET', `${baseUrl}get/all`).then((response) => {
            const data = JSON.parse(response.body)
            data.forEach((civil) => {
                   civilPage.verifyUser(civil)
            })
        })
    })

    it('fetch a specific civil', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                civilPage.elements.searchInput().type(testData.civilId)
                cy.get("tr").should("have.length", 2)
                civilPage.verifyFetchedUser(testData)
            })
        })
    })

    it('fetch civil that does not exist', () => {
        civilPage.elements.searchInput().type("doesntexist")
        cy.get("tr").should("have.length", 1)
    })
})