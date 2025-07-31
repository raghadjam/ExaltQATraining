import civilPage from '../../pages/CivilPage.js'
import {addCivilAndGetData,editCivilAndVerify,validateErrorAndClose} from '../../support/utils.js'

describe('edit civil testing', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'))
  })

  it('edit civil with valid data', () => {
    return addCivilAndGetData().then(testData => {
      return editCivilAndVerify(testData, testData)
        .then(() => civilPage.checkUserById(testData))
        .then(() => civilPage.deleteID(testData.civilId))
    })
  })

  it('edit civil that does not exist', () => {
     civilPage.editID('doesntexist')
  })

  it('edit civil with invalid data (age larger than 120)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'invalidAge'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.age(), /less than or equal to 120/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })

  it('edit civil with invalid data (Gender must be selected)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'missingGender'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.gender(), /select an item/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })

  it('edit civil with invalid data (Mobile validation)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'invalidMobile'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.mobile(), /should start with 05 and be 10 digits integer/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })

  it('Adding civil with invalid data (ID cant be edited)', () => {
    let alertText = ''
    cy.on('window:alert', (text) => {
      alertText = text
    })

    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => {
          return civilPage.elements.ID()
            .clear()
            .invoke('val', testData.civilId + 1)
            .trigger('input')
            .trigger('change')
        })
        .then(() => civilPage.fillCivilForm(testData, 1))
        .then(() => {
          expect(alertText).to.eq('Failed to save. Check your input.')
          return civilPage.elements.close().click()
        })
        .then(() => civilPage.deleteID(testData.civilId))
    })
  })

  it('edit civil with invalid data (first name at most 20 chars)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'invalidFirstName'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.firstName(), /first name.*20 alphabetical characters/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })

  it('edit civil with invalid data (last name at most 20 chars)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'invalidLastName'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.lastName(), /last name.*20 alphabetical characters/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })

  it('Adding civil with invalid data (DOB must be set)', () => {
    return addCivilAndGetData().then(testData => {
      return civilPage.editID(testData.civilId)
        .then(() => civilPage.verifyValues(testData))
        .then(() => addCivilAndGetData('civil_invalid.json', 'missingDob'))
        .then(editData => {
          return civilPage.fillCivilForm(editData, 1)
            .then(() => validateErrorAndClose(civilPage.elements.dob(), /select/i))
            .then(() => civilPage.deleteID(editData.civilId))
        })
    })
  })
})
