*** Variables ***

# Fields
${REJECTION_REASON}      xpath=//input[@placeholder='Reason for rejection']

# Buttons
${DONE_BUTTON}           xpath=//button[text()='Done']
${PENDING_BUTTON}        xpath=//button[text()='Pending']
${REJECTED_BUTTON}       xpath=//button[text()='Rejected']
${SUBMIT_BUTTON}         xpath=//button[text()='Submit']
${ENABLED_REJECT}        xpath=//button[(text()='Rejected') and not(@disabled)]
${ENABLED_DONE}          xpath=//button[(text()='Done') and not(@disabled)]
${ENABLED_PENDING}       xpath=//button[(text()='Pending') and not(@disabled)]
${REJECT}               //button[text()='Rejected' and not(@disabled)]
${PENDING}              /button[text()='Pending']
${DONE}                  //button[(text()='Done') and not(@disabled)]
${PENDING_EN}            //button[(text()='Pending') and not(@disabled)]

# Messages
${ERROR_MESSAGE}         xpath=//*[@class='message error']
${SUCCESS_MESSAGE}       xpath=//*[@class='message success']

# Stages
${STAGES}                xpath=//*[@id='stages']/div[@class='stage']//h3

${STAGE_ANCESTOR}        ancestor::div[@class='stage']//h3
${STAGE_PARNET}          parent::*
${STAGE_BUTTONS}         //div[@class='buttons']
${STAGE_H3_PREFIX}       //h3[contains(., 'Stage 
${STAGE_H3_SUFFIX}       ')]