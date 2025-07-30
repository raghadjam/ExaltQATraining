describe('edit civil testing', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it.only('edit civil with valid data', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "ahmad",
            age: "60",
            mobile: "0512345690",
            lastName: "ahmad",
            gender: 1,
            dob: "2004-08-08"
        })

        cy.checkUserById('1220219', {   //this command checks that the civil was edited succesfully and then delete it
            firstName: "ahmad",
            civilId: "1220219",
            age: "60",
            mobile: "0512345690",
            lastName: "ahmad",
            gender: "Male",
            dob: "2004-08-08"
        })  
    })

    it('edit civil that does not exist', ()=> { 
        cy.editID("doesntexist")   //if the ID doesnt exist it wont have an entry in the table therfore no edit button
    })

    it('edit civil with invalid data (age larger than 120)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "160",
            mobile: "0512345690",
            lastName: "jamhour",
            gender: 2,
            dob: "2004-08-08"
        })

        cy.get('#age')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/less than or equal to 120/i)
        })
    })

    it('edit civil with invalid data (Gender must be selected)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "20",
            mobile: "0512345690",
            lastName: "jamhour",
            gender: 0,
            dob: "2004-08-08"
        })
        cy.get('#gender')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/select an item/i)
        })
    })

    it('edit civil with invalid data (Mobile validation)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "20",
            mobile: "05123456789", //11 digits
            lastName: "jamhour",
            gender: 2,
            dob: "2004-08-08"
        })
        
        cy.get('#mobile')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/should start with 05 and be 10 digits integer/i)
        })
    })

    it('Adding civil with invalid data (ID cant be edited)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219").get('#civilId').type('123456')  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "20",
            mobile: "0512345678", 
            lastName: "jamhour",
            gender: 2,
            dob: "2004-08-08"
        })
        cy.on('window:alert', (text) => {
            expect(text).to.eq('Failed to save. Check your input.')
        })
    })

    it('edit civil with invalid data (first name at most 20 chars)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghadraghadraghadraghad",
            age: "20",
            mobile: "0512345678", 
            lastName: "jamhour",
            gender: 2,
            dob: "2004-08-08"
        })

        cy.get('#firstName')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/first name.*20 alphabetical characters/i)
        })
    })

    it('edit civil with invalid data (last name at most 20 chars)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "20",
            mobile: "0512345678", 
            lastName: "jamhourjamhourjamhourjamhour",
            gender: 2,
            dob: "2004-08-08"
        })

        cy.get('#lastName')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/last name.*20 alphabetical characters/i)
        })
    })

    it('Adding civil with invalid data (DOB must be set)', () => {
        cy.fillCivilForm({
            firstName: 'raghad',
            civilId: '1220219',
            age: '20',
            mobile: '0512345678',
            lastName: 'jamhour',
            gender: 2,
            dob: '2004-08-08'
        })
        
        cy.editID("1220219")  //to find the edit button for the specified ID
        .editCivilForm({
            firstName: "raghad",
            age: "20",
            mobile: "0512345678", 
            lastName: "jamhour",
            gender: 2,
            dob: ''
        })
        cy.get('#dob')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(text).to.match(/select/i)
        })
  })
})