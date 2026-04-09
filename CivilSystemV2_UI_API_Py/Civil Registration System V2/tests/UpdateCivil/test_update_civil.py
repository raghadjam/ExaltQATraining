import requests
from utils import editUser, getUser, validCivilInfoEdit, createUser, assertResponse, getNewId, invalidCivilInfo, deleteUser, verifyUserDoesntExist

def test_can_edit_civil(baseUrl):
    create, payload = createUser(baseUrl, validCivilInfoEdit)
    assert create.status_code == 201
    edit = editUser(baseUrl, payload)
    assert edit.status_code == 200
    userInfo = getUser(baseUrl, payload["ID"])
    assert userInfo.status_code == 200
    data = userInfo.json()
    assertResponse(data, payload)
    deleteUser(baseUrl, payload["ID"])

def test_cant_edit_non_exsiting_civil(baseUrl):
    id = getNewId(baseUrl)
    verifyUserDoesntExist(baseUrl, id)

def test_cant_edit_civil_with_invalid_data(baseUrl):
    create, payload = createUser(baseUrl, validCivilInfoEdit)
    assert create.status_code == 201
    invaidPayload = invalidCivilInfo(payload["ID"])
    edit = editUser(baseUrl, invaidPayload)
    assert edit.status_code == 400
    assert edit.text == "Missing First Name"
    deleteUser(baseUrl, payload["ID"])