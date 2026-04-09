# Assignment 7 — Selenium + Requests: Dental Booking System (UI & API Testing)

## Overview

This assignment implements a full **UI and API test automation suite** for a **Dental Booking System** — a web application that allows users to sign up, log in, book dental appointments, and cancel them. Tests are written in **Python** using **Selenium** (UI) and **Requests** (API), following the Page Object Model pattern.

Two GitHub Actions CI workflows (in `.github/workflows/`) automate the test execution: one for API tests and one for UI tests.

---

## System Under Test

The Dental Booking System is a Node.js/Express server with:
- **Signup/Login** — user authentication with username, password, and phone number
- **Book Appointment** — schedule a dental appointment with date, start time, and end time
- **Cancel Appointment** — cancel a booked appointment

### Business Rules
- Appointments must be at least **30 minutes** in duration
- Appointments cannot be in the **past**
- No **overlapping** appointments are allowed for the same time slot
- Username and phone number must be **unique** when signing up

---

## Project Structure

```
Assignment-8/
├── DentalBooking.postman_collection.json    # Postman collection for manual API testing
├── DentalBooking.xlsx                       # Test plan spreadsheet
├── Dental Booking System API/               # API test project
│   ├── server.js                            # Express backend
│   ├── public/                              # Frontend (HTML/JS/CSS)
│   ├── pages/
│   │   └── authentication_page/
│   │       └── authentication_page.py       # API page object
│   ├── support/
│   │   ├── config.py                        # Constants and config
│   │   └── utils.py                         # Shared utilities
│   └── tests/
│       ├── conftest.py                      # Pytest fixtures
│       └── tests_api/
│           ├── login/test_login.py
│           ├── signup/test_signup.py
│           ├── book_appointment/test_booking.py
│           └── cancel_appointment/test_cancelling.py
└── Dental Booking System UI/                # UI test project
    ├── server.js                            # Express backend
    ├── public/                              # Frontend (HTML/JS/CSS)
    ├── pages/
    │   ├── authentication_page/
    │   │   ├── authentication_page.py       # Selenium auth page object
    │   │   └── authentication_selectors.json
    │   └── main_page/
    │       ├── main_page.py                 # Selenium main page object
    │       └── main_page_selectors.json
    ├── support/
    │   ├── config.py                        # Constants and config
    │   └── utils.py                         # Shared utilities
    └── tests/
        ├── conftest.py                      # Pytest fixtures
        └── tests_ui/
            ├── login/test_login.py
            ├── signup/test_signup.py
            ├── book_appointment/test_booking.py
            └── cancel_appointment/test_cancelling.py
```

---

## Test Suites

### Authentication (both UI and API)

**Login**
| Test | Expected |
|------|----------|
| `test_login_success` | HTTP 200 / success message shown |
| `test_login_fail_with_wrong_password` | HTTP 401 / error message shown |
| `test_login_fail_with_nonexisting_user` | HTTP 401 / error message shown |
| `test_login_fail_with_empty_fields` | Browser validation message |

**Signup**
- Valid credentials → success
- Duplicate username or phone → failure
- Empty fields → browser validation

### Booking Appointments

| Test | Expected |
|------|----------|
| `test_booking_success` | Appointment booked with 40-min duration |
| `test_thirty_minutes` | Fails when duration < 30 minutes |
| `test_overlapping_app` | Fails when two users book overlapping slots |
| `test_invalid_date` | Fails when booking date is in the past |

### Cancelling Appointments

- Cancel an existing booked appointment → success
- Cancel when no appointment exists → failure message

---

## CI/CD Integration

Two GitHub Actions workflows are defined:

**`APIci.yml`** — runs API tests on `ubuntu-latest`:
1. Checks out code
2. Sets up Python 3.11 and Node.js 20
3. Installs dependencies
4. Runs `npm run test-api`

**`UIci.yml`** — runs UI tests on `windows-latest`:
1. Checks out code
2. Sets up Python 3.11 and Node.js 20
3. Installs Selenium, pytest, requests
4. Runs `npm run test-ui`

> **Note:** Both workflows are currently commented out from automatic triggers (`on: push/pull_request`) and can be triggered manually.

---

## Setup & Running

### API Tests

```bash
cd "Dental Booking System API"
npm install
pip install pytest requests
npm run test-api
```

### UI Tests

```bash
cd "Dental Booking System UI"
npm install
pip install pytest selenium requests
npm run test-ui
```

---

## Technologies

| Tool | Purpose |
|------|---------|
| Python 3 | Test scripting |
| Selenium WebDriver | Browser automation |
| Requests | HTTP API calls |
| pytest | Test runner and fixtures |
| Node.js / Express | Dental Booking System backend |
| GitHub Actions | CI/CD pipeline |
| Postman | Manual API exploration |
