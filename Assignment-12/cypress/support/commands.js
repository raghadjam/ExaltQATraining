import constants from '../fixtures/constants';
import { handleNavigation, handleCookies, handleAssertions, handleBack } from './utils';


Cypress.Commands.add('getDataTest', (selector, parent) => {
  if (parent) {
    return cy.get(`[data-gtm-cta="${selector}"][data-gtm-parent="${parent}"]`)
  } else {
    return cy.get(`[data-gtm-cta="${selector}"]`)
  }
})

Cypress.Commands.add('acceptMainCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find(constants.mainPage.ACCEPT_ALL).length) {
      return cy.get(constants.mainPage.ACCEPT_ALL).click({ force: true });
    }
  });
});


Cypress.Commands.add('goToPhones', () => {
  return cy.contains(constants.mainPage.PHONES, 'Phones').invoke('removeAttr', 'target').click({ force: true }).acceptSupportCookies()
});

Cypress.Commands.add('acceptSupportCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find(constants.support.ACCEPT_ALL_BTN).length) {
      return cy.get(constants.support.ACCEPT_ALL_BTN).click({ force: true });
    }
  });
});

Cypress.Commands.add('selectFirstProduct', () => {
  cy.acceptSupportCookies()
  cy.getDataTest(constants.support.BROWSE, constants.support.BROWSE_PARENT).eq(0).click({ force: true });
  cy.acceptSupportCookies()
  cy.contains('p', constants.support.PHONE_NAME).closest('a').click({ force: true });

});

Cypress.Commands.add('changeLanguageToEnglish', () => {
  cy.getDataTest(constants.support.LANGUAGE_SELECTOR, constants.support.LANGUAGE_PARENT).eq(0).click({ force: true });
  cy.contains(constants.support.ENGLISH).click({ force: true });
  cy.acceptSupportCookies();
});

Cypress.Commands.add('preparePage', () => {
  cy.viewport(1280, 720).acceptMainCookies().goToPhones();
  cy.acceptSupportCookies().selectFirstProduct();
  cy.changeLanguageToEnglish();
});

Cypress.Commands.add('assertHeaderUrl', (key, header_selectors, userGuide, lang = 0) => {
  let expectedUrl = ""
  const base = constants.SUPPORT_URL;
  const guideLink = userGuide ? `/${constants.GUIDE_URL}` : '';
  const path = header_selectors[key] ? `/${header_selectors[key]}` : '';

  if (lang) {
    expectedUrl = `${constants.MAIN_URL}/${header_selectors[key]}${constants.BASE_LANG}`
    return cy.url().should('eq', expectedUrl);
  }

  if (path.includes('https')) {
    expectedUrl = `${header_selectors[key]}`;
  }
  else if (path.includes('hmd-offgrid')) {
    expectedUrl = `${base}${constants.OFF_GRID}`;
  }
  else {
    expectedUrl = `${base}${guideLink}${path}`;
  }
  return cy.url({ timeout: 10000 }).should('eq', expectedUrl);
});


Cypress.Commands.add('clickHeaderElements', (elements, header_selectors, page, back = 0, keySel) => {
  Object.entries(elements).forEach(([key, element]) => {
    const userGuide = handleNavigation(page, element, keySel);

    handleCookies(key);
    cy.then(() => {
      handleAssertions(key, keySel, page, header_selectors, userGuide);
    }).then(() => {
      handleBack(back);
    });
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
