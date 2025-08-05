import requests
from utils import createUser, validCivilInfo, deleteUser, verifyUserDoesntExist, getNewId

def test_can_delete_civil(baseUrl):
    create, payload = createUser(baseUrl, validCivilInfo)
    assert create.status_code == 201
    delete = deleteUser(baseUrl, payload["ID"])
    assert delete.status_code == 204
    verifyUserDoesntExist(baseUrl, payload["ID"])

def test_cant_delete_non_exsiting_civil(baseUrl):
    id = getNewId(baseUrl)
    delete = deleteUser(baseUrl,id)
    assert delete.status_code == 404
    assert delete.text == "Not Found"

