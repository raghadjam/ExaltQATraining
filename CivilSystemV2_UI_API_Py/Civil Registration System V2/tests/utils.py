import requests

def validCivilInfo(id):
    return {
    "FirstName": "Raghad",
    "LastName": "Jamhour",
    "ID": str(id),
    "Age": "21",
    "Mobile": "0597563872"
}

def validCivilInfoEdit(id):
    return {
    "FirstName": "RaghadEdit",
    "LastName": "JamhourEdit",
    "ID": str(id),
    "Age": "21",
    "Mobile": "0597563872"
}

def invalidCivilInfo(id):
    return {
    "FirstName": "",
    "LastName": "Jamhour",
    "ID": str(id),
    "Age": "21",
    "Mobile": "0597563872"
}
def exisitngCivilInfo():
    return {
    "FirstName": "Raghad",
    "LastName": "Jamhour",
    "ID": "10",
    "Age": "21",
    "Mobile": "0597563872"
}

def getNewId(baseUrl):
    response = requests.get(f"{baseUrl}/get/all")
    data = response.json()
    maxID = 0
    if not data:
        return maxID
    else:
        for civil in data:
            id = int(civil["ID"])
            if id > maxID:
                maxID = id
        return maxID + 1       
    
def createUser(baseUrl, func, id=1):
    if id == 0:
        payload = func()
    else: 
        id = getNewId(baseUrl)
        payload = func(id)
    return requests.post(f"{baseUrl}/add/", json=payload) , payload

def deleteUser(baseUrl, id):
    return requests.delete(f"{baseUrl}/delete/{id}")

def getUser(baseUrl, id):
    return requests.get(f"{baseUrl}/get/{id}")

def editUser(baseUrl, payload):
    return requests.put(f"{baseUrl}/edit/", json=payload)

def verifyUserDoesntExist(baseUrl, id):
    verify = getUser(baseUrl, id)
    assert verify.status_code == 404
    assert verify.text == "Not Found"

def assertResponse(data, payload):
    assert data["ID"] == payload["ID"]
    assert data["FirstName"] == payload["FirstName"]
    assert data["LastName"] == payload["LastName"]
    assert data["Age"] == payload["Age"]
    assert data["Mobile"] == payload["Mobile"]
