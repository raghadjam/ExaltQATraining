// cypress/pages/nav/header.js
import selectors from './main_nav_bar_selectors.json'

class MainNavBar {
   
  elements = {
    smartphones: () => cy.getDataTest(selectors.smartphones, selectors.parent),
    feature: () => cy.getDataTest(selectors.feature, selectors.parent),
    tablets: () => cy.getDataTest(selectors.tablets, selectors.parent),
    accessories: () => cy.getDataTest(selectors.accessories, selectors.parent),
    offgrid: () => cy.getDataTest(selectors.offgridSel, selectors.parent),
    business: () => cy.getDataTest(selectors.business, selectors.parent),
  };

  clickLogo(){
    cy.getDataTest(selectors.logo).click();
  }
}

export default new MainNavBar();
