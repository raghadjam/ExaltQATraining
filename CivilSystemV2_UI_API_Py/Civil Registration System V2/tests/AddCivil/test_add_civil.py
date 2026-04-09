import requests
from utils import createUser, assertResponse, validCivilInfo, exisitngCivilInfo, invalidCivilInfo, deleteUser

def test_can_create_civil(baseUrl):
    create, payload = createUser(baseUrl, validCivilInfo)
    assert create.status_code == 201
    userInfo = requests.get(f"{baseUrl}/get/{payload["ID"]}")
    assert userInfo.status_code == 200
    data = userInfo.json()
    assertResponse(data, payload)       #assert that the get user response matches the payload
    deleteUser(baseUrl, payload["ID"])

def test_cant_create_exsiting_civil(baseUrl):
    create, payload = createUser(baseUrl, exisitngCivilInfo ,0)
    assert create.status_code == 404
    assert create.text == "Civil Already Exists"
    deleteUser(baseUrl, payload["ID"])

def test_cant_create_civil_with_invalid_data(baseUrl):
    create, payload = createUser(baseUrl, invalidCivilInfo)
    assert create.status_code == 400
    assert create.text == "Missing First Name"
    deleteUser(baseUrl, payload["ID"])
    
