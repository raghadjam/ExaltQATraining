from support import config

def test_signup_success(setup_create_teardown_delete):
    _ , response, _ = setup_create_teardown_delete
    assert response.status_code == config.HTTP_CREATED
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is True

def test_signup_fail(setup_create_teardown_delete):
    username , _ ,page = setup_create_teardown_delete
    response = page.signup(username,config.VALID_PASSWORD, config.VALID_PHONE)
    assert response.status_code == config.HTTP_CONFLICT
    body = response.json() 
    assert body[config.CLASS_SUCCESS] is False
    assert body[config.MESSAGE] == config.SIGNUP_FAIL
