import civilPage from '../../pages/CivilPage.js'
import { getFixtureWithNextId } from '../../support/utils.js'
import { getNextCivilId } from '../../support/utils.js'

describe('add civil testing', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'));
  })

  it.only('Add civil with valid data', () => {
    getFixtureWithNextId('civil_valid.json').then(testData => {
      return civilPage.fillCivilForm(testData).then(() => {
        return civilPage.checkUserById(testData).then(()=>{
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
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidAgeData = cases['invalidAge'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidAgeData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.age(), /less than or equal to 120/i)
  })


  it('Adding civil with invalid data (Gender must be selected)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidAgeData = cases['missingGender'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidAgeData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.gender(), /select an item/i)
  })

  it.only('Adding civil with invalid data (Mobile validation)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidMobileData = cases['invalidMobile'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidMobileData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.mobile(), /should start with 05 and be 10 digits integer/i);
  });

  it('Adding civil with invalid data (ID must be an integer)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidIdData = cases['invalidId'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidIdData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.civilId(), /should be an integer/i);
  });

  it('Adding civil with invalid data (first name at most 20 chars)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidFirstNameData = cases['invalidFirstName'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidFirstNameData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.firstName(), /first name.*20 alphabetical characters/i);
  });

  it('Adding civil with invalid data (last name at most 20 chars)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidLastNameData = cases['invalidLastName'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidLastNameData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.lastName(), /last name.*20 alphabetical characters/i);
  });

  it('Adding civil with invalid data (DOB must be set)', () => {
    cy.fixture('civil_invalid.json').then(cases => {
      const invalidDobData = cases['missingDob'].data;
      getNextCivilId().then(nextId => {
        const testData = { ...invalidDobData, civilId: nextId.toString() };
        civilPage.fillCivilForm(testData);
      });
    });

    cy.validateFieldError(civilPage.elements.dob(), /select/i);
  });
})