*** Settings ***
Library    SeleniumLibrary
Library    DateTime
Resource   ../../resources/variables/variables.robot
Resource   ../../resources/keywords/login_keywords/login_keywords.robot
Resource   ../../resources/selectors/selectors.robot
Resource   ../../resources/keywords/stage_keywords/stage_keywords.robot
Resource   ../../resources/keywords/support/utils_keywords.robot
Resource   ../../resources/selectors/selectors.robot
Test Setup          Create User
Test Teardown       Delete Order


*** Test Cases ***
Login Successful
    Login With Credentials    ${TRACKING_ID}    ${TRACKING_ID}
    Login Should Succeed

Login Fail With Wrong Password
    Login With Credentials    ${TRACKING_ID}    ${INVALID_PASS}
    Login Should Fail

 Login Fail With Wrong ID
    ${timestamp}=    Get Current Date    result_format=%Y%m%d%H%M%S%f
    ${fake_id}=      Set Variable    ${timestamp}
    Login With Credentials    ${fake_id}    ${fake_id}
    Login Should Fail

Login Fail With Empty Fields
    Click Button   ${TRACK_BUTTON}
    Login Should Fail
