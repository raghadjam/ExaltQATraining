
from pages.authentication_page.authentication_page import AuthPage
from support import config, utils

def test_login_success(setup_create_teardown_delete):
    username , _, page = setup_create_teardown_delete
    response = page.login(username, config.VALID_PASSWORD)
    assert response.status_code == config.HTTP_OK
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is True

def test_login_fail(setup_create_teardown_delete):
    username , _, page = setup_create_teardown_delete
    response = page.login(username, config.INVALID_PASSWORD)
    assert response.status_code == config.HTTP_UNATHORIZED
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is False
    assert body[config.MESSAGE] == config.LOGIN_FAIL

def test_nonexisting_user():
    non_existing_username = utils.generate_non_existing_username()
    main_page = AuthPage(config.BASE_URL)
    response = main_page.login(non_existing_username, config.VALID_PASSWORD)
    assert response.status_code == config.HTTP_UNATHORIZED
