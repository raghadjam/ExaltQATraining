import json
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from support import utils

class MainPage:
    with open("pages/main_page/main_page_selectors.json") as selectors: 
        selectors = json.load(selectors)

    buttons = selectors["buttons"]
    field = selectors["inputs"]
    msg = selectors["message"]

    def __init__(self, driver):
        self.driver = driver

        self.elements = { 
            "date": lambda: self.driver.find_element(By.ID, self.field["date"]),
            "start_time": lambda: self.driver.find_element(By.ID, self.field["start"]),
            "end_time": lambda: self.driver.find_element(By.ID, self.field["end"]),
            "book": lambda: self.driver.find_element(By.XPATH, self.buttons["book"]),
            "cancel": lambda: self.driver.find_element(By.ID, self.buttons["cancel"]),
            "message": lambda: self.driver.find_element(By.ID, self.msg["message"]),
        }

    def fill_appointment(self,date, start, end, create = 1):
        self.elements["date"]().send_keys(date)
        self.elements["start_time"]().send_keys(start)
        self.elements["end_time"]().send_keys(end)
        if(create):
            self.elements["book"]().click()
    
    def assert_text(self, text):
        return utils.get_message_class_text(self.driver, self.msg, text)
    
    def cancel_appointment(self):
        self.elements["cancel"]().click()
    
    def book_appointment(self):
        self.elements["book"]().click()

    def get_validation_message_for_book(self):
        date_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["date"]())
        start_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["start_time"]())
        end_valid = self.driver.execute_script("return arguments[0].validity.valid;", self.elements["end_time"]())

        date_msg = self.elements["date"]().get_attribute("validationMessage") if not date_valid else ""
        start_msg = self.elements["start_time"]().get_attribute("validationMessage") if not start_valid else ""
        end_msg = self.elements["end_time"]().get_attribute("validationMessage") if not end_valid else ""

        return date_msg, start_msg, end_msg