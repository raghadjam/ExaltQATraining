// cypress/pages/nav/header.js
import selectors from './useful_links_selectors.json'

class usefulLinks {

    getSubElements() {
        const elements = {};

        Object.keys(selectors.links).forEach((key) => {
            elements[key] = () => {
            return cy.contains('h3', selectors.subLinks).parent().eq(0).contains(key);
            };
        });

    return elements; 
    }
}

export default new usefulLinks();
