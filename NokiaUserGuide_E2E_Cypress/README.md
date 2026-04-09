# Assignment 12 — Cypress E2E Testing: Nokia/HMD User Guide Website

## Overview

This assignment implements **end-to-end UI test automation** for the **Nokia/HMD licensed products support website** — specifically the HMD Barça 3210 user guide pages at [nokia.com/support/licensed-products](https://www.nokia.com/support/licensed-products/). Tests are written in **Cypress** and cover the header navigation, footer navigation, main page common elements, and complete user guide section links. A test plan spreadsheet (`NokiaTesting.xlsx`) documents all test cases with results.

---

## Tested Website

| URL | Description |
|-----|-------------|
| `https://www.nokia.com/support/licensed-products/` | Main entry point (Nokia support) |
| `https://www.hmd.com/en_int` | HMD main support site |
| `https://www.hmd.com/en_int/support/hmd-barca-3210-user-guide` | HMD Barça 3210 user guide |

---

## Project Structure

```
Assignment-12/
├── NokiaTesting.xlsx                        # Test plan with 4 sheets
├── cypress.config.js                        # Cypress configuration
├── dockerfile                               # Docker setup for CI
├── package.json
├── report.html                              # Sample Mochawesome report
└── cypress/
    ├── e2e/
    │   ├── common.cy.js                     # Common element tests
    │   ├── header.cy.js                     # Header navigation tests
    │   ├── footer.cy.js                     # Footer navigation tests
    │   └── hmd.cy.js                        # User guide section tests
    ├── fixtures/
    │   ├── constants.json                   # URLs, selectors, text constants
    │   ├── languages.json                   # Language codes and expected URLs
    │   └── guidelines/                      # Per-section guideline data (JSON files)
    │       ├── Bluetooth/
    │       ├── Camera/
    │       ├── CallsContactsMessages/
    │       ├── ClockCalendarCalculator/
    │       ├── getStarted/
    │       ├── Music/
    │       ├── PersonalizeYourPhone/
    │       └── Product and safety information/
    ├── pages/
    │   ├── guidelines/
    │   │   ├── guidelines.js
    │   │   └── guidelines_selectors.json
    │   ├── hmd_main/
    │   │   ├── common_elements/
    │   │   │   ├── common_elements.js
    │   │   │   └── common_elements_selector.json
    │   │   └── useful_links/
    │   │       ├── useful_links.js
    │   │       └── useful_links_selectors.json
    │   └── navigation/
    │       ├── header/
    │       │   ├── main_nav_bar/
    │       │   └── sidebar/
    │       └── footer/
    ├── support/
    │   ├── commands.js                      # Custom Cypress commands
    │   ├── e2e.js
    │   └── utils.js
```

---

## Test Suites

### Header Tests (`header.cy.js`)
| Test Case | Description |
|-----------|-------------|
| Main nav bar links | Verifies all top navigation links navigate to correct pages |
| HMD logo | Clicking the logo returns to the main HMD page |
| Sidebar navigation | Verifies all sidebar links load correctly |
| Sidebar sub-pages | Verifies secondary (nested) sidebar navigation links |

### Footer Tests (`footer.cy.js`)
- Verifies all footer section links navigate to correct pages (data-driven via `footer_selectors.json`)
- Logo click returns to the HMD home page
- Footer paragraph text is displayed correctly
- Cookie settings button opens the cookie consent panel

### Common Element Tests (`common.cy.js`)
| Test Case | Description |
|-----------|-------------|
| Download button | Navigates to HMD product download page |
| All Devices button | Navigates to all-devices listing |
| Hero section | Heading text and product image (`srcset`) are displayed |
| Helpfulness widget | "Was this helpful?" shows Yes/No buttons |
| Language switcher | Iterates all available languages and verifies correct URL per language |

### HMD User Guide Tests (`hmd.cy.js`)
Data-driven test that iterates through all user guide sections defined in `guidelines_selectors.json` and verifies each sub-page loads successfully. Sections include:

- Get Started (Keys and Parts, Keypad, Charging, Setup)
- Bluetooth (Connections)
- Camera (Photos and Videos)
- Calls, Contacts & Messages
- Clock, Calendar & Calculator
- Music Player
- Personalize Your Phone (Profiles, Tones, Home Screen, Battery, Accessibility, Repairability)
- Product & Safety Information (17 topics)
- Useful Links

A specific section can be targeted using the `GUIDELINE_KEY` or `FOOTER_KEY` environment variable.

---

## Test Plan (`NokiaTesting.xlsx`)

The spreadsheet has **4 sheets**, one per test area:

| Sheet | Feature Area |
|-------|-------------|
| Header | Main nav bar, sidebar, logo |
| Guidelines | All user guide sections |
| Footer | Footer links, logo, cookies |
| Common | Download, All Devices, language switcher, helpfulness widget |

All documented test cases show **Status: Passed**.

---

## Setup & Running

### Install dependencies
```bash
npm install
```

### Run tests (interactive)
```bash
npx cypress open
```

### Run tests (headless)
```bash
BASE_URL=https://www.nokia.com/support/licensed-products/ npx cypress run
```

### Run a specific guideline section
```bash
GUIDELINE_KEY=Bluetooth npx cypress run --spec "cypress/e2e/hmd.cy.js"
```

### Generate Mochawesome report
Reports are auto-generated in `cypress/reports/` thanks to the Mochawesome reporter configured in `cypress.config.js`.

---

## Technologies

| Tool | Purpose |
|------|---------|
| Cypress 15 | E2E test automation framework |
| Mochawesome | HTML test report generation |
| dotenv | Environment variable management |
| Docker | Containerized test execution |
| JSON Fixtures | Data-driven test content |
