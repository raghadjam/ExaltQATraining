*** Settings ***
Library    SeleniumLibrary
Library    BuiltIn
Resource   ../../resources/variables/variables.robot
Resource   ../../resources/keywords/login_keywords/login_keywords.robot
Resource   ../../resources/selectors/stages_selectors.robot
Resource   ../../resources/support/utils_keywords.robot


*** Keywords ***

Open Web Browser 
    Open Browser    ${BASE_URL}    chrome         options=add_experimental_option("excludeSwitches", ["enable-automation","disable-popup-blocking"])

Random Integer
    ${num}=    Evaluate    random.randint(1000,9999)    modules=random
    RETURN     ${num}

Get Child Sibling Element
    [Arguments]    ${child}    ${target}
    ${parent_xpath}=    Set Variable    (${child})/${STAGE_PARNET}
    Wait Until Element Is Visible    xpath=${parent_xpath}${target}    10s
    ${element}=    Get WebElement    xpath=${parent_xpath}${target}
    RETURN    ${element}

Get Stage Header Text
    [Arguments]    ${child_element}
    ${header_xpath}=    Set Variable    (${child_element})/${STAGE_ANCESTOR}
    Wait Until Element Is Visible    xpath=${header_xpath}    10s
    ${header_text}=    Get Text    xpath=${header_xpath}
    RETURN    ${header_text}


