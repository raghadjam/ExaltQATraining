# Assignment 10 — Robot Framework UI Automation: Shipping Tracking System

## Overview

This assignment implements **UI test automation** for a **Shipping Tracking System** using **Robot Framework** with the **SeleniumLibrary**. The system lets users track shipment orders through multiple stages and update each stage's status. Tests cover login functionality and full shipment stage workflow validation. A test plan spreadsheet (`ShippingSystem.xlsx`) is also included.

---

## System Under Test

The Shipping Tracking System is a Node.js/Express web application where:

- Users **log in** with a Tracking ID and password
- The system displays a **6-stage shipment pipeline**:
  1. Order Received
  2. Order Shipped
  3. Order Received to Destination Country
  4. Order Clearance Completed
  5. Order in Delivery Stage
  6. Order Delivered
- Each stage can be marked as **Done**, **Rejected** (with a reason), or **Pending**
- Stage transitions follow strict rules: stages must be completed sequentially; previous stages cannot be modified once a later one is active

---

## Project Structure

```
Assignment-10/
├── ShippingSystem.xlsx
└── Shipping Tracking System/
    ├── server.js                            # Express backend
    ├── data.txt                             # Persistent data store
    ├── public/
    │   ├── index.html
    │   ├── script.js
    │   └── styles.css
    ├── package.json
    ├── resources/
    │   ├── keywords/
    │   │   ├── login_keywords/
    │   │   │   └── login_keywords.robot
    │   │   └── stage_keywords/
    │   │       └── stage_keywords.robot
    │   ├── selectors/
    │   │   ├── login_selectors.robot
    │   │   └── stages_selectors.robot
    │   ├── support/
    │   │   ├── setup_teardown_keywords.robot
    │   │   └── utils_keywords.robot
    │   └── variables/
    │       └── variables.robot
    └── tests/
        ├── login/
        │   └── login_test.robot
        └── stages/
            └── stages_test.robot
```

---

## Test Suites

### Login Tests (`tests/login/login_test.robot`)

| Test Case | Description |
|-----------|-------------|
| Login Successful | Logs in with valid Tracking ID and password |
| Login Fail With Wrong Password | Uses a valid ID but incorrect password |
| Login Fail With Wrong ID | Uses a timestamp-generated fake ID that doesn't exist |
| Login Fail With Empty Fields | Clicks the Track button without any input |

**Setup/Teardown:**
- `Test Setup: Create User` — creates a new order via the API before each test
- `Test Teardown: Delete Order` — removes the order after each test to ensure isolation

### Stage Tests (`tests/stages/stages_test.robot`)

| Test Case | Description |
|-----------|-------------|
| Validate Shipment Stages | Verifies that all 6 stage names are displayed correctly |
| Text Field and Submit Button Are Invisible | Rejection reason field and submit button are hidden until Reject is clicked |
| Reject Fail Without a Reason | Clicking Submit without a rejection reason shows an error |
| Reject Succeed With a Reason | Successfully rejects a stage with a valid reason |
| Pending Button Disabled Until Rejected | The Pending button for a stage is disabled until that stage is rejected |
| Stage Can Change After Rejection | After rejection, the Done button becomes available and Pending is enabled |
| Stage Can Change After Pending | After marking pending, Done and Reject become available for that stage |
| Sequential Stage Completion | Iterates through all 6 stages, marking each Done and verifying previous stages lock and next stages remain disabled |

---

## Resource Architecture (Keyword-Driven Design)

The project follows Robot Framework best practices with a layered keyword structure:

| Resource File | Purpose |
|--------------|---------|
| `variables.robot` | All constants: URLs, stage names, expected messages, selectors references |
| `login_keywords.robot` | High-level login keyword compositions |
| `stage_keywords.robot` | Keywords for stage interactions (reject, done, pending, assertions) |
| `login_selectors.robot` | Raw element locators for login UI |
| `stages_selectors.robot` | Raw element locators for stage UI |
| `setup_teardown_keywords.robot` | API-level create/delete order for test lifecycle management |
| `utils_keywords.robot` | Shared helper keywords (browser open/close, element waits) |

---

## Setup & Running

### 1. Install Robot Framework and SeleniumLibrary
```bash
pip install robotframework robotframework-seleniumlibrary requests
```

### 2. Start the backend server
```bash
cd "Shipping Tracking System"
npm install
node server.js
```

### 3. Run all tests
```bash
robot --outputdir Shipping\ Tracking\ System/reports tests/
```

### 4. Run a specific suite
```bash
robot tests/login/login_test.robot
robot tests/stages/stages_test.robot
```

---

## Technologies

| Tool | Purpose |
|------|---------|
| Robot Framework | Keyword-driven test automation framework |
| SeleniumLibrary | Browser automation library for Robot Framework |
| Node.js / Express | Shipping Tracking System backend |
| Python | Runtime for Robot Framework |
