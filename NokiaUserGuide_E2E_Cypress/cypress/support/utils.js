import constants from '../fixtures/constants';

function getElements(links, link_parent, element_parent, id = 0, span = 0) {
    const elements = {};

    Object.keys(links).forEach((key) => {
        elements[key] = () => {
            if (id) {
                cy.get(element_parent).click({ force: true })  // When the parent has an ID
            }
            else {
                cy.getDataTest(element_parent).click({ force: true })  // When the parent has data attribute
            }
            if (span == 1) {
             handleCookies()
             return cy.get(link_parent).find('a').filter(`:contains(${key})`);   //For  guidelines and footer selections
            }
            return cy.get(link_parent).find('span').contains(key)   //For Sidebar selections 
        };
    });
    return elements;
}


export function handleNavigation(page, element, keySel) {
    if (page && keySel) {       // Clicking the parent based on the key selection
        page.getParent(keySel).click({ force: true });
        element().click({ force: true });
        return 1;
    } else if (page) {
        page.getParent().click({ force: true });        // Clicking the parent
        const el = element();

        el.then(($el) => {         //For the sidebar to open the parent first
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
