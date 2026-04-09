*** Variables ***

# Fields
${LOGIN_ID_FIELD}        id=trackingId
${LOGIN_PASS_FIELD}      id=password

# Buttons
${TRACK_BUTTON}          xpath=//button[text()='Track']

# Messages
${ERROR_MESSAGE}         xpath=//*[@class='message error']
${SUCCESS_MESSAGE}       xpath=//*[@class='message success']

# Stages
${STAGES}                xpath=//*[@id='stages']/div[@class='stage']//h3
