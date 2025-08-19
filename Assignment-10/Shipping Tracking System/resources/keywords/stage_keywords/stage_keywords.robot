*** Settings ***
Library    SeleniumLibrary
Library    RequestsLibrary
Resource   ../../../resources/variables/variables.robot
Resource   ../../../resources/keywords/login_keywords/login_keywords.robot
Resource   ../../../resources/selectors/selectors.robot
Resource   ../../../resources/keywords/stage_keywords/stage_keywords.robot
Resource   ../../../resources/keywords/support/utils_keywords.robot
Resource   ../../../resources/keywords/support/setup_teardown_keywords.robot



*** Keywords ***
Reject Should Fail
    Wait Until Element Is Visible    ${ERROR_MESSAGE}    10s
    Element Should Contain           ${ERROR_MESSAGE}    ${REJECTION_ERROR}

Reject Should Succeed
    Wait Until Element Is Visible    ${SUCCESS_MESSAGE}    10s
    Element Should Contain           ${SUCCESS_MESSAGE}    ${REJECTION_SUCCESS}

Pending should Succeed
    Wait Until Element Is Visible    ${SUCCESS_MESSAGE}    10s
    Element Should Contain           ${SUCCESS_MESSAGE}    ${PENDING_SUCCESS}
    
Add Order
    ${success}=    Set Variable    ${False}
    FOR    ${i}    IN RANGE    1000
        ${trackingId}=  Random Integer
        ${trackingId}=    Convert To String    ${trackingId}
        ${json}=    Create Dictionary    ${KEY_TRACKING_ID}=${trackingId}    ${KEY_PASSWORD}=${trackingId}
        ${resp}=     POST    ${BASE_URL}${ADD_ORDER}    json=${json}
        IF    '${resp.status_code}' == '201'
            ${success}=    Set Variable    ${True}
            Exit For Loop
        END
    END
        IF   '${success}'=='False' 
             Fail    Could not add order after 1000 attempts 
        END
    RETURN    ${trackingId}


Delete Order
    ${json}=    Create Dictionary    ${KEY_TRACKING_ID}=${TRACKING_ID}    ${KEY_PASSWORD}=${TRACKING_ID}
    DELETE    ${BASE_URL}${DELETE_ORDER}    json=${json}    expected_status=200
    Close Browser


Reject a Stage
    Click Button   ${ENABLED_REJECT}
    Input Text    ${REJECTION_REASON}    Reject
    Click Button   ${SUBMIT_BUTTON}
    Reject Should Succeed

Assert Stage Marked As Done
    [Arguments]    ${stage_number}
    ${expected_message}=    Catenate    SEPARATOR=    ${SUCCESS_PREFIX} ${stage_number} ${SUCCESS_SUFFIX}
    Wait Until Element Is Visible    ${SUCCESS_MESSAGE}    10s
    Element Should Contain    ${SUCCESS_MESSAGE}    ${expected_message}

Assert Previous Stages are Disabled
    [Arguments]    ${stage_number}
    FOR    ${i}    IN RANGE    1     ${stage_number}
        ${buttons_xpath}=    Set Variable    //h3[contains(., 'Stage ${i}')]//div[@class='buttons']
        ${buttons}=    Get WebElements    xpath=${buttons_xpath}
        FOR    ${btn}    IN    @{buttons}
                Element Should Be Disabled    ${btn}
        END
    END

Assert Next Stages are Disabled
    [Arguments]    ${stage_number}   
    ${current}=    Evaluate    int(${stage_number}) + 1
    ${total}=      Evaluate    int(${STAGES_COUNT}) + 1
    FOR    ${i}    IN RANGE    ${current}    ${total}
        ${buttons_xpath}=    Set Variable    //h3[contains(., 'Stage ${i}')]//div[@class='buttons']
        ${buttons}=    Get WebElements    xpath=${buttons_xpath}
        FOR    ${btn}    IN    @{buttons}
            Element Should Be Disabled    ${btn}
        END
    END



