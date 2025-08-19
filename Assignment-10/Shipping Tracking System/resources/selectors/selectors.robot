*** Variables ***

# Fields
${LOGIN_ID_FIELD}        id=trackingId
${LOGIN_PASS_FIELD}      id=password
${REJECTION_REASON}      xpath=//input[@placeholder='Reason for rejection']

# Buttons
${DONE_BUTTON}           xpath=//button[text()='Done']
${PENDING_BUTTON}        xpath=//button[text()='Pending']
${REJECTED_BUTTON}       xpath=//button[text()='Rejected']
${SUBMIT_BUTTON}         xpath=//button[text()='Submit']
${TRACK_BUTTON}          xpath=//button[text()='Track']
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
