import selectors from './CivilSelectors.json'

class civilPage {
    elements = {
        firstName: () => cy.getDataTest(selectors.inputs.firstName),
        lastName: () => cy.getDataTest(selectors.inputs.lastName),
        ID: () => cy.getDataTest(selectors.inputs.civilId),
        age: () => cy.getDataTest(selectors.inputs.age),
        mobile: () => cy.getDataTest(selectors.inputs.mobile),
        gender: () => cy.getDataTest(selectors.inputs.gender),
        dob: () => cy.getDataTest(selectors.inputs.dob),

        addCivilBtn: () => cy.getDataTest(selectors.buttons.addCivil),
        saveBtn: () => cy.getDataTest(selectors.buttons.save),
        deleteBtn: () => cy.getDataTest(selectors.buttons.delete),
        refreshBtn: () => cy.getDataTest(selectors.buttons.refresh),
        deleteAllBtn: () => cy.getDataTest(selectors.buttons.deleteAll),
        editBtn: () => cy.getDataTest(selectors.buttons.edit),
        pages: () => cy.get(selectors.buttons.pages),
        close: () => cy.getDataTest(selectors.buttons.close),

        firstNameTable: () => cy.getDataTest(selectors.table.firstNameTable),
        lastNameTable: () => cy.getDataTest(selectors.table.lastNameTable),
        civilIdTable: () => cy.getDataTest(selectors.table.civilIdTable),
        ageTable: () => cy.getDataTest(selectors.table.ageTable),
        mobileTable: () => cy.getDataTest(selectors.table.mobileTable),
        genderTable: () => cy.getDataTest(selectors.table.genderTable),
        dobTable: () => cy.getDataTest(selectors.table.dobTable),

        searchInput: () => cy.getDataTest(selectors.inputs.search),

        modalForm: () => cy.getDataTest(selectors.modal.form),
        modalClose: () => cy.getDataTest(selectors.modal.close),
    };

    fillCivilForm(data, edit = 0) {
        if (!edit) {
            this.elements.addCivilBtn().should('exist').click();
            if (data.civilId) this.elements.ID().should('exist').clear().invoke('val', data.civilId)

        }

        if (data.firstName) this.elements.firstName().should('exist').clear().invoke('val', data.firstName);
        if (data.age) this.elements.age().should('exist').invoke('val', '').trigger('input').trigger('change').type(data.age)
        if (data.mobile) this.elements.mobile().should('exist').clear().type(data.mobile);
        if (data.lastName) this.elements.lastName().should('exist').clear().invoke('val', data.lastName);
        if (data.gender) this.elements.gender().should('exist').select(data.gender);
        if (data.dob) this.elements.dob().should('exist').invoke('val', data.dob).trigger('change');

        return this.elements.saveBtn().should('exist').click();
    }

    checkUserById(data) {
        return this.elements.pages().its('length').then(len => {
            this.elements.pages().eq(len - 1).click();

            return this.elements.civilIdTable().then(($elements) => {
                const matched = $elements.filter((i, el) => el.textContent.trim() == data.civilId);
                expect(matched.length).to.equal(1);

                cy.wrap(matched)
                    .closest('tr')
                    .within(() => {
                        this.elements.firstNameTable().should('contain.text', data.firstName);
                        this.elements.lastNameTable().should('contain.text', data.lastName);
                        this.elements.civilIdTable().should('contain.text', data.civilId);
                        this.elements.ageTable().should('contain.text', data.age);
                        this.elements.mobileTable().should('contain.text', data.mobile);
                        this.elements.genderTable().should('contain.text', data.gender);
                        this.elements.dobTable().should('contain.text', data.dob);
                    });

                return cy.wrap(matched)
                    .closest('tr')
                    .find('[data-test="delete-btn"]')
                    .click();
            });
        });
    }

    verifyValues(data) {
        this.elements.firstName().should('have.value', data.firstName);
        this.elements.lastName().should('have.value', data.lastName);
        this.elements.ID().should('have.value', data.civilId);
        this.elements.age().should('have.value', data.age);
        this.elements.mobile().should('have.value', data.mobile);
        this.elements.gender().should('have.value', data.gender);
        return this.elements.dob().should('have.value', data.dob);
    }

    verifyFetchedUser(data, api = 0) {
        this.elements.firstNameTable().should('contain.text', data.firstName);
        this.elements.lastNameTable().should('contain.text', data.lastName);
        this.elements.civilIdTable().should('contain.text', data.civilId);
        this.elements.ageTable().should('contain.text', data.age);
        this.elements.mobileTable().should('contain.text', data.mobile);
        this.elements.genderTable().should('contain.text', data.gender);
        this.elements.dobTable().should('contain.text', data.dob);
    }


    deleteID(id) {
        return this.elements.pages().its('length').then((len) => {
            const clickPage = (index) => {
                if (index >= len) return;

                this.elements.pages().eq(index).click();

                return this.elements.civilIdTable().then(($elements) => {
                    const matched = $elements.filter((i, el) => el.textContent.trim() === id);
                    if (matched.length !== 0) {
                        return cy.wrap(matched)
                            .closest('tr')
                            .find('[data-test="delete-btn"]').should('exist')
                            .click();
                    }
                    return clickPage(index + 1);
                });
            };

            return clickPage(0);
        });
    }

    verifyUser(data) {
        this.elements.pages().its('length').then((len) => {
            const clickPage = (index) => {
                if (index >= len) return;

                this.elements.pages().eq(index).click();

                this.elements.civilIdTable().then(($elements) => {
                    const matched = $elements.filter((i, el) => el.textContent.trim() === data.ID);
                    if (matched.length != 0) {
                        cy.wrap(matched)
                            .closest('tr').within(() => {
                                this.elements.firstNameTable().should('contain.text', data.FirstName);
                                this.elements.lastNameTable().should('contain.text', data.LastName);
                                this.elements.civilIdTable().should('contain.text', data.ID);
                                this.elements.ageTable().should('contain.text', data.Age);
                                this.elements.mobileTable().should('contain.text', data.Mobile);
                                this.elements.genderTable().should('contain.text', data.Gender);
                                this.elements.dobTable().should('contain.text', data.DOB);
                                return
                            })
                    }
                    clickPage(index + 1);
                });
            };

            clickPage(0);
        });
    }

    verifyIDisDeleted(id) {
        this.elements.pages().its('length').then((len) => {
            const checkPage = (index) => {
                if (index >= len) return;

                this.elements.pages().eq(index).click();

                this.elements.civilIdTable().then(($elements) => {
                    const matched = $elements.filter((_, el) => el.textContent.trim() === id);
                    expect(matched.length).to.equal(0)
                }).then(() => {
                    checkPage(index + 1);
                });
            };
            checkPage(0);
        })
    }


    editID(id) {
        return this.elements.pages().its('length').then((len) => {
            const clickPage = (index) => {
                if (index >= len) return;

                this.elements.pages().eq(index).click()
                return this.elements.civilIdTable().then(($elements) => {
                    const matched = $elements.filter((i, el) => el.textContent.trim() === id)
                    if (matched.length != 0) {
                        return cy.wrap(matched)
                            .closest('tr')
                            .find('[data-test="edit-btn"]').should('exist')
                            .click()
                    }
                    else if (index === len - 1) {
                        expect(matched.length).to.equal(0)
                    }
                }).then(() => {
                    return clickPage(index + 1)
                })
            }
            return clickPage(0)
        })
    }
}

module.exports = new civilPage();