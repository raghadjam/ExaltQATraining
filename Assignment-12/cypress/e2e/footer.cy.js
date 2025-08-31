import footer from '../pages/navigation/footer/footer'
import footer_selectors from '../pages/navigation/footer/footer_selectors.json'
import constants from '../fixtures/constants';


describe('Verify footer elements', () => {
    beforeEach(() => {
    cy.visit(constants.BASE_URL, { timeout: 120000 });
    cy.preparePage();
    });

    Object.entries(footer_selectors).forEach(([key, value]) => {
        if (!value.links) {
            return;
        }

        it(`Checks that pages are loaded successfully from ${key}`, () => {
            cy.clickHeaderElements(
                footer.getSubElements(key),
                value.links,
                null,
                1,
                null
            );
        });
    });

    it('Checks the HMD logo', () => {
        footer.clickLogo()
        cy.assertHeaderUrl('', '');
    })

    it('Checks the paragraph', () => {
        footer.getParent().contains(footer_selectors.footer_paragraph)
    })


    it('Checks the Cookie settings button', () => {
        cy.wait(2000); 
        footer.clickCookiesBtn()
        cy.get(footer_selectors['Cookiesettings']).should('exist')
    })

})