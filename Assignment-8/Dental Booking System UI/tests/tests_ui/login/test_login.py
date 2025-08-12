from support import config

def test_login_success(setup_create_teardown_delete):
    page, username = setup_create_teardown_delete
    page.fill_login(username, config.VALID_PASSWORD)
    message, classColor = page.get_message_class() 
    assert message == config.LOGIN_SUCCESS
    assert classColor == config.CLASS_SUCCESS

def test_login_fail_with_wrong_password(setup_create_teardown_delete):
    page, username = setup_create_teardown_delete
    page.fill_login(username, config.INVALID_PASSWORD)
    message, classColor = page.get_message_class() 
    assert message == config.LOGIN_FAIL
    assert classColor == config.CLASS_ERROR

def test_login_fail_with_wrong_userrname(setup_get_driver):
    setup_get_driver.fill_login(config.INVALID_USERNAME, config.VALID_PASSWORD)
    message, classColor = setup_get_driver.get_message_class() 
    assert message == config.LOGIN_FAIL
    assert classColor == config.CLASS_ERROR 

def test_login_fail_with_empty_fields(setup_get_driver):
    setup_get_driver.fill_login("", "")
    username_msg, password_msg = setup_get_driver.get_validation_message_for_login()
    assert username_msg == config.EMPTY_FIELD_ERROR
    assert password_msg == config.EMPTY_FIELD_ERROR

