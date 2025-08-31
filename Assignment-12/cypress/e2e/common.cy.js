import common from '../pages/hmd_main/common_elements/common_elements'
import selectors from '../pages/hmd_main/common_elements/common_elements_selector.json'
import constants from '../fixtures/constants';
import {handleCookies} from '../support/utils'


describe('Verify Common elements', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit(constants.BASE_URL, { timeout: 120000 });
        cy.preparePage();
    });


    it('Checks the Download Button', () => {
        common.clickDownload()
        cy.assertHeaderUrl('downloadLink', selectors);
    })

    it('Checks All Devices Button', () => {
        common.clickAllDevices()
        cy.assertHeaderUrl('allDevicesLink', selectors);
    })

    it('should show heading text and product picture', () => {
        cy.get(selectors.parent).first().within(() => {
            cy.contains(selectors.text)
            cy.get('img')
                .should('have.attr', 'srcset')
                .and('include', selectors.url);
        });
    });

    it('should show helpfulness question with Yes/No buttons', () => {
        common.getIsThisHelpful().within(() => {
            cy.contains(selectors.helpfulText)

            common.getYesBtn()
                .should('exist')
                .and('contain.text', 'Yes');

            common.getNoBtn()
                .should('exist')
                .and('contain.text', 'No');
        });
    });

     it.only('should navigate correctly for each language link', () => {
    cy.fixture('languages.json').then((langs) => {
      Object.entries(langs).forEach(([lang]) => {
        common.getLangBtn().click()
        cy.contains('span', lang).click();
        cy.assertHeaderUrl(lang, langs, 0,1);
        handleCookies()
      });
    });
  });

})