*** Settings ***
Library    SeleniumLibrary
Resource   ../../../resources/variables/variables.robot
Resource   ../../../resources/selectors/selectors.robot


*** Keywords ***
Login With Credentials
    [Arguments]    ${id}    ${password}
    Input Text     ${LOGIN_ID_FIELD}    ${id}
    Input Text     ${LOGIN_PASS_FIELD}  ${password}
    Click Button   ${TRACK_BUTTON}

Login Should Succeed
    Wait Until Element Is Visible    ${SUCCESS_MESSAGE}    10s
    Element Should Contain           ${SUCCESS_MESSAGE}    ${SHIPMENT_SUCESS}  

Login Should Fail 
    Wait Until Element Is Visible    ${ERROR_MESSAGE}    10s
    Element Should Contain           ${ERROR_MESSAGE}     ${LOGIN_FAIL}
