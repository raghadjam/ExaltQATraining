import civilPage from '../pages/CivilPage.js'


export function getNextCivilId(caseKey) {
    const baseUrl = Cypress.env('BASE_URL')
    return cy.request('GET', `${baseUrl}get/all`).then((response) => {
        let data = JSON.parse(response.body);
        const allIds = data
            .map(civil => Number(civil.ID))
            .filter(id => !isNaN(id));

        let maxId = 0;
        if (allIds.length > 0) {
            maxId = Math.max(...allIds);
        }
        if(caseKey == 'invalidId'){
            return maxId + "hello"
        }
        return maxId + 1;
    })
}

export function getFixtureWithNextId(fixtureName, caseKey) {
  return cy.fixture(fixtureName).then(cases => {
    let caseData;

    if (caseKey) {
      caseData = cases[caseKey].data;
    } else {
      caseData = cases;
    }

    return getNextCivilId(caseKey).then(nextId => {
      return { ...caseData, civilId: nextId.toString() };
    });
  });
}

  export function addCivilAndGetData(fixtureName = 'civil_valid.json', caseKey) {
    return getFixtureWithNextId(fixtureName, caseKey).then(testData => {
      return civilPage.fillCivilForm(testData).then(() => testData)
    })
  }

  export function editCivilAndVerify(originalData, editData) {
    return civilPage.editID(originalData.civilId)
      .then(() => civilPage.verifyValues(originalData))
      .then(() => civilPage.fillCivilForm(editData, 1))
  }

  export function validateErrorAndClose(element, regex) {
    return cy.validateFieldError(element, regex)
      .then(() => civilPage.elements.close().click())
  }
