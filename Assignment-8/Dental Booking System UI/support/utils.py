import json
import random
import time
import requests
from support import config
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from datetime import date, datetime

def create_user(page):
    username = f'user_{int(time.time())}_{random.randint(1,10000)}'
    phone = f'{int(time.time())}{random.randint(1,10000)}'

    page.fill_signup(username, config.VALID_PASSWORD, phone)
    return username

def clear_and_type(element, text):
    element.clear()
    element.send_keys(text)


def delete_user(userDelete):
    payload = {"username": userDelete}
    response = requests.delete(config.API_DELETE, json=payload)
    assert response.status_code == config.HTTP_OK
    

def getNextDate():
    max_date = datetime.strptime("1000-01-01", "%Y-%m-%d").date()
    with open(config.FILENAME, 'r') as file:
        data = json.load(file) 

    for user in data["appointments"]:
        user_date = datetime.strptime(user["date"], "%Y-%m-%d").date()
        if max_date < user_date:
            max_date = user_date
    
    today = date.today()
    if max_date < today:
        max_date = today
    try:
        next_date = max_date.replace(year=max_date.year + 1)
    except ValueError:  # leap year 
        next_date = max_date.replace(year=max_date.year + 4)

    return next_date.strftime("%m-%d-%Y")


def get_message_class(driver, msg_selector):
    message_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, msg_selector["message"])))
    message_class = message_element.get_attribute('class')
    return message_element.text, message_class

def get_message_class_text(driver, msg_selector, expected_text):
    WebDriverWait(driver, 10).until(
        EC.text_to_be_present_in_element((By.ID, msg_selector["message"]), expected_text)
    )
    message_element = driver.find_element(By.ID, msg_selector["message"])
    message_class = message_element.get_attribute('class')
    return message_class

def getPastTime():
    now = datetime.now()

    two_hours_ago = now.hour - 2
    if two_hours_ago < 0:
        two_hours_ago += 24
    time_minus_2 = now.replace(hour=two_hours_ago)

    one_hour_ago = now.hour - 1
    if one_hour_ago < 0:
        one_hour_ago += 24
    time_minus_1 = now.replace(hour=one_hour_ago)

    time1 = time_minus_2.strftime("%I:%M %p").replace(" ", "")
    time2 = time_minus_1.strftime("%I:%M %p").replace(" ", "")

    return time1, time2

def getTodaysDate():
    today = datetime.now()
    return today.strftime("%m-%d-%Y")

def generate_non_existing_username():
    timestamp = int(time.time())
    rand_num = random.randint(1000, 9999)
    return f"nonexistent_{timestamp}_{rand_num}"