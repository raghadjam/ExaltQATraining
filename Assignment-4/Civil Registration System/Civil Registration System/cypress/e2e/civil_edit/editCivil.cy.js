import civilPage from '../../pages/CivilPage.js'
import { getFixtureWithNextId } from '../../support/utils.js'

describe('edit civil testing', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
    })

    it('edit civil with valid data', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return civilPage.fillCivilForm(testData, 1).then(() => { //edit the values
                            return civilPage.checkUserById(testData).then(() => { //check that the values in the table changed
                                return civilPage.deleteID(testData.civilId)
                            })
                        })
                    })
                })
            })
        })
    })

    it('edit civil that does not exist', () => {
        civilPage.editID("doesntexist")   //if the ID doesnt exist it wont have an entry in the table therfore no edit button
    })

    it('edit civil with invalid data (age larger than 120)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'invalidAge').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.age(), /less than or equal to 120/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })

                            })
                        })
                    })
                });
            });
        })
    })

    it('edit civil with invalid data (Gender must be selected)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'missingGender').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.gender(), /select an item/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })
                            })
                        })
                    })
                })
            })
        })
    })

    it('edit civil with invalid data (Mobile validation)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'invalidMobile').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.mobile(), /should start with 05 and be 10 digits integer/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })
                            })
                        })
                    })
                });
            });
        })
    })


    it('Adding civil with invalid data (ID cant be edited)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            let alertText = '';
            cy.on('window:alert', (text) => {
                alertText = text;
            });
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {
                    return civilPage.elements.ID().clear().invoke('val', testData.civilId + 1).trigger('input').trigger('change').then(() => {
                        return civilPage.fillCivilForm(testData, 1);
                    });
                });
            }).then(() => {
                expect(alertText).to.eq('Failed to save. Check your input.');
                return civilPage.elements.close().click().then(() => {
                    return civilPage.deleteID(testData.civilId);
                });
            });

        });
    });

    it('edit civil with invalid data (first name at most 20 chars)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'invalidFirstName').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.firstName(), /first name.*20 alphabetical characters/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })
                            })
                        })
                    })
                });
            });
        })
    })

    it('edit civil with invalid data (last name at most 20 chars)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'invalidLastName').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.firstName(), /last name.*20 alphabetical characters/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })
                            })
                        })
                    })
                });
            });
        })
    })

    it('Adding civil with invalid data (DOB must be set)', () => {
        getFixtureWithNextId('civil_valid.json').then(testData => {
            return civilPage.fillCivilForm(testData).then(() => {
                return civilPage.editID(testData.civilId).then(() => {  //find the edit button 
                    return civilPage.verifyValues(testData).then(() => { //verify values in fields match the desired data
                        return getFixtureWithNextId('civil_invalid.json', 'missingDob').then(editData => {
                            return civilPage.fillCivilForm(editData, 1).then(() => { //edit the values
                                return cy.validateFieldError(civilPage.elements.firstName(), /select/i).then(() => { //check that the values in the table changed
                                    return civilPage.elements.close().click().then(() => {
                                        return civilPage.deleteID(editData.civilId);
                                    });
                                })
                            })
                        })
                    })
                });
            });
        })
    })
})