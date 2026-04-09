# Assignment 7 — Selenium + Python UI & API Testing: Civil Registration System V2

## Overview

This assignment re-implements automated testing for the **Civil Registration System** (Version 2) using **Python with Selenium** for UI testing and **Python Requests** for API testing. It replaces the Cypress-based approach from Assignment 4 and adds more structured test organization. A corresponding test plan spreadsheet (`CivilSystemTestplan V2.xlsx`) is also included.

---

## System Under Test

Civil Registration System V2 is an updated Node.js/Express web application that manages civil records. It supports the same CRUD operations as V1 with the same validation rules.

---

## Project Structure

```
Assignment-7/
├── CivilSystemTestplan V2.xlsx
└── Civil Registration System V2/
    ├── index.js                          # Express server (backend)
    ├── public/index.html                 # Frontend UI
    ├── data.txt                          # Persistent data store
    ├── package.json
    ├── test_selenium.py                  # Standalone Selenium smoke test
    ├── report.html                       # Sample test execution report
    └── tests/
        ├── conftest.py                   # Pytest fixtures (setup/teardown)
        ├── utils.py                      # Shared test utilities
        ├── AddCivil/
        │   └── test_add_civil.py
        ├── DeleteCivil/
        │   └── test_delete_civil.py
        ├── GetCivil/
        │   └── test_get.py
        └── UpdateCivil/
            └── test_update_civil.py
```

---

## Test Suites

### Add Civil (`test_add_civil.py`)
| Test | Description |
|------|-------------|
| `test_can_create_civil` | Creates a valid civil record via API POST, verifies it via GET, then cleans up |
| `test_cant_create_existing_civil` | Attempts to create a duplicate civil; expects HTTP 404 and `"Civil Already Exists"` |
| `test_cant_create_civil_with_invalid_data` | Sends a request with missing first name; expects HTTP 400 and `"Missing First Name"` |

### Delete Civil (`test_delete_civil.py`)
- Delete an existing civil record and verify it is gone
- Attempt to delete a non-existing record and verify appropriate error response

### Get Civil (`test_get.py`)
- Retrieve a single civil record by valid ID
- Retrieve all civil records
- Attempt retrieval of a non-existing ID

### Update Civil (`test_update_civil.py`)
- Update an existing civil record with valid data
- Attempt to update a non-existing civil record

---

## Key Design Choices

- **`conftest.py` fixtures:** Pytest fixtures handle browser/driver setup (`setup_get_driver`) and full lifecycle management — creating a user before the test and deleting it after (`setup_create_teardown_delete`)
- **`utils.py`:** Shared helpers for creating/deleting users, generating valid/invalid payloads, and asserting API responses
- **Separation of API and UI tests:** The test folder structure separates concerns clearly by operation type
- **`test_selenium.py`:** A standalone quick smoke test using Selenium WebDriver for rapid verification

---

## Setup & Running

### 1. Start the backend server
```bash
cd "Civil Registration System V2"
npm install
node index.js
```

### 2. Install Python dependencies
```bash
pip install pytest selenium requests
```

### 3. Run all tests
```bash
cd "Civil Registration System V2"
pytest tests/ -v
```

### 4. Run a specific suite
```bash
pytest tests/AddCivil/ -v
pytest tests/DeleteCivil/ -v
```

### 5. Generate HTML report
```bash
pytest tests/ --html=report.html
```

---

## Technologies

| Tool | Purpose |
|------|---------|
| Python 3 | Test scripting language |
| Selenium WebDriver | UI/browser automation |
| pytest | Test runner and fixture management |
| Requests | HTTP API testing |
| pytest-html | HTML report generation |
| Node.js / Express | Civil Registration System V2 backend |
