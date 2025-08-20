*** Settings ***
Library    SeleniumLibrary
Library    Collections
Resource   ../../resources/variables/variables.robot
Resource   ../../resources/keywords/login_keywords/login_keywords.robot
Resource   ../../resources/keywords/stage_keywords/stage_keywords.robot
Resource   ../../resources/support/utils_keywords.robot
Test Setup         Open Browser And Login
Test Teardown      Delete Order


*** Test Cases ***
Validate Shipment Stages
    @{stages}=    Get WebElements    ${STAGES}
    ${i}=    Set Variable    0
    FOR    ${stage}    IN    @{stages}
        ${text}=      Get Text         ${stage}
        ${expected}=  Get From List    ${EXPECTED_STAGES}    ${i}
        Should Be Equal    ${text}    ${expected}
        ${i}=         Evaluate         ${i}+1
    END

Text Field and Submit Button Are Invisible
    Element Should Not Be Visible     ${REJECTION_REASON}
    Element Should Not Be Visible       ${SUBMIT_BUTTON}
    Click Button   ${ENABLED_REJECT}
    Element Should Be Visible     ${REJECTION_REASON}
    Element Should Be Visible       ${SUBMIT_BUTTON}

Reject Fail Without a Reason
    Click Button   ${ENABLED_REJECT}
    Click Button   ${SUBMIT_BUTTON}
    Reject Should Fail

Reject Succeed With a Reason    
    Reject a Stage

Pending Button Disabled Until Rejected
    ${pending}=    Get Child Sibling Element    ${REJECT}    ${PENDING}
    Element Should Be Disabled    ${pending}

Stage Can Change After Rejection
    [Setup]     Login And Reject
    ${done_header_text}=    Get Stage Header Text    ${DONE}
    Should Be Equal As Strings    ${STAGE_HEADER}    ${done_header_text}
    ${done_el}=    Get WebElement    ${DONE_BUTTON}  
    Element Should Be Enabled    ${done_el}
    ${pending}=    Get Child Sibling Element    ${DONE}    ${PENDING}
    Element Should Be Enabled    ${pending}

Stage Can Change After Pending
    [Setup]     Click Pending
    ${done_header_text}=    Get Stage Header Text    ${DONE}
    Should Be Equal As Strings    ${STAGE_HEADER}    ${done_header_text}
    ${done_el}=    Get WebElement    ${DONE_BUTTON}  
    Element Should Be Enabled    ${done_el}
    ${reject_stage}=    Get Child Sibling Element    ${DONE}    ${REJECT}
    Element Should Be Enabled    ${reject_stage}

Sequential Stage Completion
    @{stages}=    Get WebElements    ${STAGES}
    ${i}=    Set Variable    1
    FOR    ${stage}    IN    @{stages}
        Click Button    ${ENABLED_DONE}
        Assert Stage Marked As Done    ${i}
        Assert Previous Stages are Disabled    ${i}
        Assert Next Stages are Disabled     ${i}
        ${i}=         Evaluate         ${i}+1
    END