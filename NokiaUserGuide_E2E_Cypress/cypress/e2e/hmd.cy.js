import usefulLinks from '../pages/hmd_main/useful_links/useful_links'
import useful_links from '../pages/hmd_main/useful_links/useful_links_selectors.json'
import guidelines from '../pages/guidelines/guidelines';
import guidelines_selectors from '../pages/guidelines/guidelines_selectors.json';
import constants from '../fixtures/constants';


describe('Verify HMD elements', () => {
    beforeEach(() => {
        cy.visit(constants.BASE_URL)
        cy.preparePage()
    })

    const ONLY_RUN = Cypress.env("GUIDELINE_KEY") || null;

    Object.entries(guidelines_selectors).forEach(([key]) => {
        if (ONLY_RUN && key !== ONLY_RUN) {
            return;
        }

        it(`Checks that pages are loaded successfully from ${key}`, () => {
            cy.clickHeaderElements(
                guidelines.getSubElements(key),
                guidelines_selectors[key].links,
                guidelines,
                0,
                key
            );
        });
    });


    it('Checks that pages are loaded successfully from useful links', () => {
        cy.clickHeaderElements(usefulLinks.getSubElements(), useful_links.links, null, 1, null);
    })
})