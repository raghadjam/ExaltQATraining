import json
import time
import requests
from support import config, utils

class AuthPage:
    def __init__(self, baseUrl):
        self.baseUrl = baseUrl
    
    def delete_user(self, userDelete):
        payload = {"username": userDelete}
        return requests.delete(f'{self.baseUrl}{config.API_DELETE}', json=payload)

    def signup(self, username, password, phone):
        payload = {"username":username, "password": password, "phone": phone}
        return requests.post(f'{self.baseUrl}{config.API_ADD}', json=payload)

    def login(self, username, password):
        payload = {"username": username, "password": password}
        return requests.post(f'{self.baseUrl}{config.API_LOGIN}', json=payload)



