import selectors from '../../hmd_main/common_elements/common_elements_selector.json'

class Common {

    clickDownload() {
        cy.get(selectors.download).eq(0).click()
    }

    clickAllDevices() {
        return cy.get(selectors.allDevices).eq(0).click({force: true})
    }

    getIsThisHelpful(){
        return cy.getDataTest(selectors.helpful).parent().parent()
    }

    getYesBtn(){
        return cy.getDataTest(selectors.helpful)
    }

    
    getNoBtn(){
        return cy.getDataTest(selectors.helpfulNo)
    }

}

export default new Common();