from pages.authentication_page.authentication_page import AuthPage
from support import config, utils

def test_book_success(setup_main_page):
    main_page, maxDate, username = setup_main_page
    response = main_page.book(username, maxDate, config.VALID_START, config.VALID_END)
    assert response.status_code == config.HTTP_CREATED
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is True

def test_book_fail(setup_main_page):
    main_page, maxDate, username = setup_main_page
    main_page.book(username, maxDate, config.VALID_START, config.VALID_END)
    auth = AuthPage(config.BASE_URL)
    utils.create_user(auth)
    response = main_page.book(username, maxDate, config.VALID_START, config.VALID_END)
    assert response.status_code == config.HTTP_CONFLICT
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is False
    assert body[config.MESSAGE] == config.BOOK_OVERLAPPING

def test_bad_request(setup_main_page):
    main_page, _ , username = setup_main_page
    date = utils.getTodaysDate()
    time_two_hours_ago, time_one_hour_ago = utils.getPastTime()
    response = main_page.book(username, date, time_two_hours_ago, time_one_hour_ago)
    assert response.status_code == config.HTTP_BAD
    body = response.json()  
    assert body[config.CLASS_SUCCESS] is False
    assert body[config.MESSAGE] == config.BOOK_PAST