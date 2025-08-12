import time
from pages.authentication_page.authentication_page import AuthPage
from pages.main_page.main_page import MainPage
from support import config, utils

def test_booking_success(setup_main_page):
    main_page, max_date = setup_main_page
    main_page.fill_appointment(max_date, config.VALID_START, config.VALID_END)
    classColor = main_page.assert_text(config.BOOK_SUCCESS)
    assert classColor == config.CLASS_SUCCESS

def test_thirty_minutes(setup_main_page):
    main_page, max_date = setup_main_page
    main_page.fill_appointment(max_date, config.VALID_START, config.INVALID_END)
    classColor = main_page.assert_text(config.BOOK_FAIL)
    assert classColor == config.CLASS_ERROR

def test_overlapping_app(setup_main_page):
    main_page, max_date = setup_main_page

    driver = main_page.driver         
    main_page.fill_appointment(max_date, config.VALID_START, config.VALID_END)
    driver.refresh()
    auth_page = AuthPage(driver)

    user2 = utils.create_user(auth_page)
    auth_page.fill_login(user2, config.VALID_PASSWORD)
    main_page.fill_appointment(max_date, config.VALID_START, config.VALID_END)

    classColor = main_page.assert_text(config.OVERLAPPING)
    assert classColor == config.CLASS_ERROR
    utils.delete_user(user2)


def test_invalid_date(setup_main_page):
    main_page, _ = setup_main_page
    main_page.fill_appointment(config.INVALID_DATE, config.VALID_START, config.INVALID_END)
    classColor = main_page.assert_text(config.PAST_FAIL)
    assert classColor == config.CLASS_ERROR

def test_invalid_time(setup_main_page):
    main_page, _ = setup_main_page
    date = utils.getTodaysDate()
    time_two_hours_age, time_one_hour_age = utils.getPastTime()
    main_page.fill_appointment(date, time_two_hours_age, time_one_hour_age)
    classColor = main_page.assert_text(config.PAST_FAIL)
    assert classColor == config.CLASS_ERROR

def test_empty_fields(setup_main_page):
    main_page, _ = setup_main_page
    main_page.fill_appointment("","", "")
    date_msg, start_msg, end_msg = main_page.get_validation_message_for_book()
    assert date_msg == config.EMPTY_FIELD_ERROR
    assert start_msg == config.EMPTY_FIELD_ERROR
    assert end_msg == config.EMPTY_FIELD_ERROR
