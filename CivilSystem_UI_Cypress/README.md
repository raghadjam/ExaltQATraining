# Assignment 4 — Cypress UI Automation: Civil Registration System

## Overview

This assignment implements **end-to-end UI test automation** for the Civil Registration System using **Cypress**. The system is a full-stack web application (Node.js + Express backend, HTML/JS frontend) that manages civil records. The tests cover all CRUD operations through the browser interface.

A test plan spreadsheet (`CivilSystemTestplan.xlsx`) is also included, documenting test cases alongside the automated code.

---

## System Under Test

The Civil Registration System is a Node.js/Express REST API with a browser-based UI. It supports:

- **Add** a civil record (First Name, Last Name, National ID, Age, Gender, Date of Birth, Mobile)
- **Get** a civil record by ID or fetch all records
- **Edit/Update** a civil record
- **Delete** a civil record by ID

The backend includes rate limiting (per-method) and data validation.

---

## Project Structure

```
Assignment-4/
├── CivilSystemTestplan.xlsx
├── cypress.config.js
├── package.json
└── Civil Registration System/
    └── Civil Registration System/
        ├── index.js                         # Express server (backend)
        ├── public/index.html                # Frontend UI
        ├── cypress/
        │   ├── e2e/
        │   │   ├── civil_add/addCivil.cy.js
        │   │   ├── civil_delete/delete.cy.js
        │   │   ├── civil_edit/editCivil.cy.js
        │   │   └── civil_fetch/fetch.cy.js
        │   ├── fixtures/
        │   │   ├── civil_valid.json
        │   │   ├── civil_invalid.json
        │   │   └── existing_civil.json
        │   ├── pages/
        │   │   ├── CivilPage.js            # Page Object
        │   │   └── CivilSelectors.json     # Element selectors
        │   └── support/
        │       ├── commands.js
        │       ├── e2e.js
        │       └── utils.js
        └── package.json
```

---

## Test Suites

### Add Civil (`civil_add/addCivil.cy.js`)
| Test Case | Description |
|-----------|-------------|
| Valid data | Adds a civil record and verifies it appears in the list |
| Duplicate civil | Expects a "Failed to save" alert for an already-existing ID |
| Age > 120 | Validates that the system rejects invalid age |
| Missing gender | Validates that gender is required |
| Invalid mobile | Must start with `05` and be exactly 10 digits |
| Non-integer ID | Must be an integer |
| First name > 20 chars | Length validation |
| Last name > 20 chars | Length validation |
| Missing DOB | Date of birth must be set |

### Fetch Civil (`civil_fetch/fetch.cy.js`)
- Get a civil by ID
- Get all civils

### Edit Civil (`civil_edit/editCivil.cy.js`)
- Edit with valid updated data

### Delete Civil (`civil_delete/delete.cy.js`)
- Delete an existing civil record

---

## Design Patterns

- **Page Object Model (POM):** All UI interactions are encapsulated in `CivilPage.js` with selectors stored in `CivilSelectors.json`
- **Data-driven testing:** Test data loaded from JSON fixtures (`civil_valid.json`, `civil_invalid.json`, `existing_civil.json`)
- **Dynamic ID generation:** `getFixtureWithNextId()` utility auto-increments civil IDs to avoid conflicts between test runs

---

## Setup & Running

### 1. Start the backend server
```bash
cd "Civil Registration System/Civil Registration System"
npm install
node index.js
```

### 2. Run Cypress tests
```bash
cd Assignment-4
npm install
npx cypress open     # Interactive mode
npx cypress run      # Headless mode
```

### Configuration
Set `BASE_URL` in `cypress.config.js` or as an environment variable pointing to the running server (default: `http://localhost:3000`).

---

## Technologies

| Tool | Purpose |
|------|---------|
| Cypress | UI test automation framework |
| Node.js / Express | Backend server |
| Mocha / Chai | Assertion library (bundled with Cypress) |
| JSON Fixtures | Test data management |
