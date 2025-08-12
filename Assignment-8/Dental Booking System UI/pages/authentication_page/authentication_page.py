import json
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from support import utils

class AuthPage:
    with open("pages/authentication_page/authentication_selectors.json") as selectors: 
        selectors = json.load(selectors)

    buttons = selectors["buttons"]
    field = selectors["inputs"]
    msg = selectors["message"]

    def __init__(self, driver):
        self.driver = driver

        self.elements = { 
            "username_log": lambda: self.driver.find_element(By.ID, self.field["username_login"]),
            "password_log": lambda: self.driver.find_element(By.ID, self.field["password_login"]),
            "username_sign": lambda: self.driver.find_element(By.ID, self.field["username_signup"]),
            "password_sign": lambda: self.driver.find_element(By.ID, self.field["password_signup"]),
            "phone": lambda: self.driver.find_element(By.ID, self.field["phone"]),
            "signup": lambda: self.driver.find_element(By.XPATH, self.buttons["signup"]),
            "login": lambda: self.driver.find_element(By.XPATH, self.buttons["login"]),
            "message": lambda: self.driver.find_element(By.ID, self.msg["message"]),
        }

    def fill_login(self, username, password):
        self.elements["username_log"]().send_keys(username)

        self.elements["password_log"]().send_keys(password)

        self.elements["login"]().click()

    def fill_signup(self, username, password, phone):
        utils.clear_and_type(self.elements["username_sign"](), username)
        utils.clear_and_type(self.elements["password_sign"](), password)
        utils.clear_and_type(self.elements["phone"](), phone)
        self.elements["signup"]().click()

    def get_message_class(self):
        return utils.get_message_class(self.driver, self.msg)
    
    def get_validation_message_for_login(self):
        username_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["username_sign"]())
        password_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["password_sign"]())

        username_msg = self.elements["username_sign"]().get_attribute("validationMessage") if not username_valid else ""
        password_msg = self.elements["password_sign"]().get_attribute("validationMessage") if not password_valid else ""

        return username_msg, password_msg
        
    def get_validation_message_for_signup(self):
        username_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["username_log"]())
        password_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["password_log"]())
        phone_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["phone"]())

        username_msg = self.elements["username_log"]().get_attribute("validationMessage") if not username_valid else ""
        password_msg = self.elements["password_log"]().get_attribute("validationMessage") if not password_valid else ""
        phone_msg = self.elements["phone"]().get_attribute("validationMessage") if not phone_valid else ""

        return username_msg, password_msg, phone_msg

