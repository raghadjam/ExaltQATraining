from support import config

def test_cancel_success(setup_main_page):
    main_page, max_date = setup_main_page
    main_page.fill_appointment(max_date, config.VALID_START, config.VALID_END)
    main_page.cancel_appointment()
    classColor = main_page.assert_text(config.CANCEL_SUCCESS)
    assert classColor == config.CLASS_SUCCESS
    main_page.book_appointment()
    classColor = main_page.assert_text(config.BOOK_SUCCESS)  #to check that its removed from the DB
    assert classColor == config.CLASS_SUCCESS

def test_cancel_fail(setup_main_page):
    main_page, max_date = setup_main_page
    main_page.fill_appointment(max_date, config.VALID_START, config.VALID_END, create=0)
    main_page.cancel_appointment()
    classColor = main_page.assert_text(config.CANCEL_FAIL)
    assert classColor == config.CLASS_ERROR