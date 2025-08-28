// cypress/pages/nav/header.js
import selectors from './sidebar_selectors.json'
import getElements from '../../../../support/utils'

class SideBar {
   
  elements = {
    smartphones: () => cy.getDataTest(selectors.smartphones, selectors.parent),
    feature: () => cy.getDataTest(selectors.feature, selectors.parent),
    tablets: () => cy.getDataTest(selectors.tablets, selectors.parent),
    accessories: () => cy.getDataTest(selectors.accessories, selectors.parent),
    offgrid: () => cy.getDataTest(selectors.offgrid, selectors.parent),
    business: () => cy.getDataTest(selectors.business, selectors.parent),
  };

  getParent(){
    return cy.getDataTest(selectors.sideBtn)
  }

  getSubElements() {
    const elements =  getElements(selectors.second_links, selectors.subLinks, selectors.sideBtn, 0, 1)
    return elements; 
  }
}

export default new SideBar();
