
import requests
from support import config

class MainPage:
    def __init__(self, baseUrl):
        self.baseUrl = baseUrl
        
    def book(self, username, date, start, end):
        payload = {"username": username, "date": date, "startTime": start, "endTime": end}
        return requests.post(f'{self.baseUrl}{config.API_BOOK}', json=payload)

    def cancel(self, username, date, start, end):
        payload = {"username": username, "date": date, "startTime": start, "endTime": end}
        return requests.post(f'{self.baseUrl}{config.API_CANCEL}', json=payload)