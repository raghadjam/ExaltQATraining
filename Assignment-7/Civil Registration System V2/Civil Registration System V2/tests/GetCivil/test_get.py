import requests
from utils import getUser, createUser, verifyUserDoesntExist, getNewId, assertResponse, validCivilInfo, exisitngCivilInfo, invalidCivilInfo, deleteUser

def test_get_existing_user(baseUrl):
    create, payload = createUser(baseUrl, exisitngCivilInfo, 0)
    get = getUser(baseUrl, payload["ID"])
    assert get.status_code == 200
    deleteUser(baseUrl, payload["ID"])

def test_cant_get_non_exsiting_civil(baseUrl):
    id = getNewId(baseUrl)
    verifyUserDoesntExist(baseUrl, id)

def test_get_all(baseUrl):
    response = requests.get(f"{baseUrl}/get/all")
    assert response.status_code == 200
    data = response.json()

    for civil in data:
        assert "ID" in civil
        assert "FirstName" in civil
        assert "LastName" in civil
        assert "Age" in civil
        assert "Mobile" in civil
