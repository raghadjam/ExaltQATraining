import MainNavBar from '../pages/navigation/header/main_nav_bar/main_nav_bar.js'
import main_nav_bar_selectors from '../pages/navigation/header/main_nav_bar/main_nav_bar_selectors.json'
import sidebar from '../pages/navigation/header/sidebar/sidebar.js';
import sidebar_selectors from '../pages/navigation/header/sidebar/sidebar_selectors.json';
import constants from '../fixtures/constants';


describe('Verify header elements', () => {
  beforeEach(() => {
    cy.visit(constants.BASE_URL, { timeout: 120000, pageLoadTimeout: 120000 });
    cy.preparePage()
  }) 

  it('Checks that pages are loaded successfully from the main bar.', () => {
      cy.clickHeaderElements(MainNavBar.elements, main_nav_bar_selectors);
  })

  it('Checks the HMD logo', () => {
    MainNavBar.clickLogo()
    cy.assertHeaderUrl('', '');
  })

  it('Checks that pages are loaded successfully from the side bar.', () => {
      cy.clickHeaderElements(sidebar.elements, sidebar_selectors, sidebar);
  })

  it('Checks that the sub pages are loaded successfully from the side bar.', () => {
     cy.clickHeaderElements(sidebar.getSubElements(), sidebar_selectors.second_links, sidebar);
  })

})
