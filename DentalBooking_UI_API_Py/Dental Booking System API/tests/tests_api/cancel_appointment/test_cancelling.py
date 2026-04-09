from pages.main_page.main_page import MainPage
from support import config, utils

def test_cancel_success(setup_main_page):
    main_page, maxDate, username = setup_main_page
    main_page.book(username, maxDate, config.VALID_START, config.VALID_END)
    response = main_page.cancel(username, maxDate, config.VALID_START, config.VALID_END)
    assert response.status_code == config.HTTP_OK
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is True
    response = main_page.book(username, maxDate, config.VALID_START, config.VALID_END) #to check that its actually caneclled
    assert response.status_code == config.HTTP_CREATED
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is True

def test_cancel_fail(setup_main_page):
    main_page, _ , username = setup_main_page
    response = main_page.cancel(username, "", "", "")
    assert response.status_code == config.HTTP_NOTFOUND
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is False

def test_cancel_nonexisting_user(setup_non_existing_user):
    main_page, max, non_existing_user = setup_non_existing_user
    response = main_page.cancel(non_existing_user, max, config.VALID_START, config.VALID_END)
    assert response.status_code == config.HTTP_NOTFOUND
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is False