import constants from '../fixtures/constants';

Cypress.Commands.add('getDataTest', (selector, parent) => {
  if (parent) {
    return cy.get(`[data-gtm-cta="${selector}"][data-gtm-parent="${parent}"]`)
  } else {
    return cy.get(`[data-gtm-cta="${selector}"]`)
  }
})

Cypress.Commands.add('acceptMainCookies', () => {
  cy.get(constants.mainPage.ACCEPT_ALL).click({ force: true });
});

Cypress.Commands.add('goToPhones', () => {
  cy.contains(constants.mainPage.PHONES, 'Phones').invoke('removeAttr', 'target').click();
});

Cypress.Commands.add('acceptSupportCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find(constants.support.ACCEPT_ALL_BTN).length) {
      cy.get(constants.support.ACCEPT_ALL_BTN).click({ force: true });
    }
  });
});

Cypress.Commands.add('selectFirstProduct', () => {
  cy.getDataTest(constants.support.BROWSE, constants.support.BROWSE_PARENT).eq(0).click();
  cy.contains('p', constants.support.PHONE_NAME).closest('a').click({ force: true });
});

Cypress.Commands.add('changeLanguageToEnglish', () => {
  cy.getDataTest(constants.support.LANGUAGE_SELECTOR, constants.support.LANGUAGE_PARENT).eq(0).click({ force: true });
  cy.contains(constants.support.ENGLISH).click({ force: true });
  cy.acceptSupportCookies();
});



Cypress.Commands.add('preparePage', () => {
  cy.viewport(1280, 720);
  cy.acceptMainCookies();
  cy.goToPhones();
  cy.acceptSupportCookies();
  cy.selectFirstProduct();
  cy.changeLanguageToEnglish();
});

Cypress.Commands.add('assertHeaderUrl', (key, header_selectors, userGuide) => {
  const base = constants.SUPPORT_URL;
  const guideLink = userGuide ? `/${constants.GUIDE_URL}` : '';
  const path = header_selectors[key] ? `/${header_selectors[key]}` : '';
  let expectedUrl = ""
  if (path.includes('https')) {
    expectedUrl = `${header_selectors[key]}`;
  }
  else {
    expectedUrl = `${base}${guideLink}${path}`;
  }
  return cy.url().should('eq', expectedUrl);
});

Cypress.Commands.add('clickHeaderElements', (elements, header_selectors, page, back = 0, keySel) => {
  let userGuide = 0;

  Object.entries(elements).forEach(([key, element]) => {

    if (page && keySel) {
      page.getParent(keySel).click({ force: true });
      userGuide = 1;
      element().click({ force: true });

    } else if (page) {
      page.getParent().click({ force: true });
      element().click({ force: true });

    } else {
      element().invoke('removeAttr', 'target').click({ force: true });
    }

    cy.acceptSupportCookies();

    if (key.toLowerCase() === 'youtube') {
      cy.acceptYoutubeCookies();
    }

    if (page && keySel) {
      cy.checkPageContent(keySel, key);
    }
    cy.assertHeaderUrl(key, header_selectors, userGuide);

    if (back) {
      cy.go('back');
      cy.acceptSupportCookies();   
    }
  });
});


Cypress.Commands.add('acceptYoutubeCookies', () => {
  cy.get(constants.YOUTUBE_COOKIES, { timeout: 2000 })
    .contains('Accept all')
    .then(($span) => {
      if ($span.length) {
        const button = $span.closest('button');
        if (button.length) cy.wrap(button).click({ force: true });
        else cy.wrap($span).click({ force: true });
      }
    });
});


Cypress.Commands.add('checkPageContent', (folder, fixtureName) => {
  cy.fixture(`guidelines/${folder}/${fixtureName}`).then(({ container, texts, images }) => {

    texts.forEach((text) => {
      cy.contains(container).parent().contains(text);
    });

    images.forEach((url) => {
      cy.contains(container).parent().find(`img[src*="${url}"]`).should('exist');
    });
  });
});
