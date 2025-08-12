from support import config

def test_signup_success(setup_create_teardown_delete):
    page = setup_create_teardown_delete[0]
    message, classColor = page.get_message_class() 
    assert message == config.SIGNUP_SUCCESS
    assert classColor == config.CLASS_SUCCESS

def test_signup_fail(setup_create_teardown_delete):
    page, username = setup_create_teardown_delete
    page.fill_signup(username, config.VALID_PASSWORD, config.VALID_PHONE)
    message, classColor = page.get_message_class() 
    assert message == config.SIGNUP_FAIL
    assert classColor == config.CLASS_ERROR  

def test_empty_field(setup_create_teardown_delete):
    page, _ = setup_create_teardown_delete
    page.fill_signup("", "", "")
    username_msg, password_msg, phone_msg = page.get_validation_message_for_signup()
    assert username_msg == config.EMPTY_FIELD_ERROR
    assert password_msg == config.EMPTY_FIELD_ERROR
    assert phone_msg == config.EMPTY_FIELD_ERROR