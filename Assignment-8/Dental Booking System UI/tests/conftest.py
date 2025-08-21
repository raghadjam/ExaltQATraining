import os
import time
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from pages.authentication_page.authentication_page import AuthPage
from pages.main_page.main_page import MainPage
from support import config
from support import utils


def create_headless_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  
    service = Service()  
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


@pytest.fixture
def setup_create_teardown_delete():
    driver = create_headless_driver()
    page = AuthPage(driver)
    driver.get(config.BASE_URL)
    username = utils.create_user(page)
    yield page, username
    utils.delete_user(username)
    driver.quit() 

@pytest.fixture
def setup_get_driver():
    driver = create_headless_driver()
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
