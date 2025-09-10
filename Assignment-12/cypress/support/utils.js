import constants from '../fixtures/constants';

function getElements(links, link_parent, element_parent, id = 0, span = 0) {
    const elements = {};

    Object.keys(links).forEach((key) => {
        elements[key] = () => {
            if (id) {
                cy.get(element_parent).click({ force: true })
            }
            else {
                cy.getDataTest(element_parent).click({ force: true })
            }
            if (span == 1) {
             handleCookies()
             return cy.get(link_parent).find('a').filter(`:contains(${key})`);
            }
            return cy.get(link_parent).find('span').contains(key)
        };
    });
    return elements;
}


export function handleNavigation(page, element, keySel) {
    if (page && keySel) {
        page.getParent(keySel).click({ force: true });
        element().click({ force: true });
        return 1;
    } else if (page) {
        page.getParent().click({ force: true });
        const el = element();

        el.then(($el) => {
            const $parent = $el.closest(constants.OPEN_CLASS);

            if ($parent.length && !($parent.attr('open') || $parent.attr('aria-expanded') === 'true')) {
                cy.wrap($parent).click();
            }

            cy.wrap($el)
                .should('be.visible')
                .click({multiple: true, force: true });
        });
        return 0;
        
    } else {
        element().invoke('removeAttr', 'target').click();
        return 0;
    }
}

export function handleCookies(key) {
    return cy.acceptSupportCookies().then(() => {
        if (key && key.toLowerCase() === 'youtube') {
            return cy.acceptYoutubeCookies();
        }
    });
}


export function handleAssertions(key, keySel, page, header_selectors, userGuide) {
    if (page && keySel) {
        cy.checkPageContent(keySel, key);
    }
    cy.assertHeaderUrl(key, header_selectors, userGuide);
}

export function handleBack(back) {
    if (back) {
        cy.go('back');
        cy.acceptSupportCookies();
    }
}

export default getElements;
