import selectors from './guidelines_selectors.json'
import getElements from '../../support/utils';

class HMD {
    
  getParent(key){
    return cy.get(selectors[key].parent)
  }

  getSubElements(key) {
    const elements =  getElements(selectors[key].links, selectors[key].parent, selectors[key].parent, 1)
    return elements; 
  }
}

export default new HMD();
