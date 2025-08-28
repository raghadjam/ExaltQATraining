import selectors from '../../navigation/footer/footer_selectors.json'
import getElements from '../../../support/utils';

class Footer {

    getSubElements(key) {
        const elements = getElements(selectors[key].links, selectors.parent, selectors.parent, 1, 1)
        return elements;
    }

    clickLogo() {
        cy.get(selectors.logo).parent().click()
    }

    clickCookiesBtn() {
        return cy.get(selectors.CookiesBtn).click({force: true})
    }

    getParent() {
        return cy.get(selectors.parent)
    }

}

export default new Footer();