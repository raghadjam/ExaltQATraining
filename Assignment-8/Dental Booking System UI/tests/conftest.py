import time
import pytest
from selenium import webdriver
from pages.authentication_page.authentication_page import AuthPage
from pages.main_page.main_page import MainPage
from support import config
from support import utils

@pytest.fixture
def setup_create_teardown_delete():
    driver = webdriver.Chrome()
    page = AuthPage(driver)
    driver.get(config.BASE_URL)
    username = utils.create_user(page)
    yield page, username
    utils.delete_user(username)
    driver.quit() 

@pytest.fixture
def setup_get_driver():
    driver = webdriver.Chrome()
    page = AuthPage(driver)
    driver.get(config.BASE_URL)
    yield page
    driver.quit()  

@pytest.fixture
def setup_main_page(setup_create_teardown_delete):
    auth_page, username = setup_create_teardown_delete

    max_date = utils.getNextDate()
    auth_page.fill_login(username, config.VALID_PASSWORD)

    main_page = MainPage(auth_page.driver)  

    yield main_page, max_date

