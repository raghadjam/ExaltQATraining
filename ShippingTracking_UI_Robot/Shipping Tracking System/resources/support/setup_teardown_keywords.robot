*** Settings ***
Library    SeleniumLibrary
Library    RequestsLibrary
Resource   ../../resources/variables/variables.robot
Resource   ../../resources/keywords/login_keywords/login_keywords.robot
Resource   ../../resources/keywords/stage_keywords/stage_keywords.robot
Resource   ../../resources/support/utils_keywords.robot


*** Keywords ***

Open Browser And Login
    Open Web Browser
    ${TRACKING_ID}=    Add Order
    Login With Credentials    ${TRACKING_ID}    ${TRACKING_ID}
    Set Global Variable    ${TRACKING_ID}

Create User
    Open Web Browser
    ${TRACKING_ID}=    Add Order
    Set Global Variable    ${TRACKING_ID}

Login And Reject
    Open Browser And Login
    ${header_text}=    Get Stage Header Text    ${REJECT}
    Reject a Stage
    Set Test Variable    ${STAGE_HEADER}    ${header_text}

Click Pending
    Login And Reject
    ${header_text}=    Get Stage Header Text    ${PENDING_EN}
    Set Test Variable    ${STAGE_HEADER}    ${header_text}
    Click Button    ${ENABLED_PENDING}
    Pending should Succeed
    