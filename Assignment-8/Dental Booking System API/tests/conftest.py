import pytest
from pages.authentication_page.authentication_page import AuthPage
from pages.main_page.main_page import MainPage
from support import config
from support import utils

@pytest.fixture
def setup_create_teardown_delete():
    page = AuthPage(config.BASE_URL)
    username, response = utils.create_user(page)
    yield username, response, page
    page.delete_user(username)

@pytest.fixture
def setup_main_page(setup_create_teardown_delete):
    username, _, auth_page= setup_create_teardown_delete
    max_date = utils.getNextDate()
    auth_page.login(username, config.VALID_PASSWORD)
    main_page = MainPage(config.BASE_URL)  
    yield main_page, max_date, username

@pytest.fixture
def setup_non_existing_user():
    non_existing_username = utils.generate_non_existing_username()
    main_page = MainPage(config.BASE_URL)
    max = utils.getNextDate()
    yield main_page, max, non_existing_username