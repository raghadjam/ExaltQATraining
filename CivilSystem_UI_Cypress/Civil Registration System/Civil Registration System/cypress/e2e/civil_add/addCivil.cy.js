import civilPage from '../../pages/CivilPage.js'
import { getFixtureWithNextId, validateErrorAndClose } from '../../support/utils.js'

describe('add civil testing', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'));
  })

  it('Add civil with valid data', () => {
    getFixtureWithNextId('civil_valid.json').then(testData => {
      return civilPage.fillCivilForm(testData).then(() => {
        return civilPage.checkUserById(testData).then(() => {
          return civilPage.deleteID(testData.civilId)
        })
      })
    })
  })

  it('Valid data but already exisiting civil', () => {
    cy.fixture('existing_civil.json').then((data) => {
      return civilPage.fillCivilForm(data)
    })

    cy.on('window:alert', (text) => {
      expect(text).to.eq('Failed to save. Check your input.')
    })
  })

  it('Adding civil with invalid data (age larger than 120)', () => {
    getFixtureWithNextId('civil_invalid.json', 'invalidAge').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /less than or equal to 120/i))
        .then(() => civilPage.deleteID(testData.civilId))

    });
  });

  it.only('Adding civil with invalid data (Gender must be selected)', () => {
    getFixtureWithNextId('civil_invalid.json', 'missingGender').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /select an item/i))
        .then(() => civilPage.deleteID(testData.civilId))
    });
  });

  it('Adding civil with invalid data (Mobile validation)', () => {
    getFixtureWithNextId('civil_invalid.json', 'invalidMobile').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /should start with 05 and be 10 digits integer/i))
        .then(() => civilPage.deleteID(testData.civilId))

    });
  });

  it.only('Adding civil with invalid data (ID must be an integer)', () => {
    getFixtureWithNextId('civil_invalid.json', 'invalidId').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /should be an integer/i))
        .then(() => civilPage.deleteID(testData.civilId))

    });
  });

  it.only('Adding civil with invalid data (first name at most 20 chars)', () => {
    getFixtureWithNextId('civil_invalid.json', 'invalidFirstName').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /first name.*20 alphabetical characters/i))
        .then(() => civilPage.deleteID(testData.civilId))
    })

  });

  it('Adding civil with invalid data (last name at most 20 chars)', () => {
    getFixtureWithNextId('civil_invalid.json', 'invalidLastName').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /last name.*20 alphabetical characters/i))
        .then(() => civilPage.deleteID(testData.civilId))
    });
  });

  it('Adding civil with invalid data (DOB must be set)', () => {
    getFixtureWithNextId('civil_invalid.json', 'missingDob').then(testData => {
      return civilPage.fillCivilForm(testData)
        .then(() => validateErrorAndClose(civilPage.elements.firstName(), /select/i))
        .then(() => civilPage.deleteID(testData.civilId))
    });
  });
})