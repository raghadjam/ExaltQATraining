# Assignment 1 — Test Plan: Civil Registration System

## Overview

This assignment involves creating a comprehensive **Test Plan** for the Civil Registration System — a CRUD web application that manages civil records (citizens). The deliverable is a structured Excel spreadsheet (`testplan.xlsx`) documenting all planned test cases before any automation is written.

## What This Assignment Covers

The test plan documents manual and planned automated test cases for the Civil Registration System API and UI. The system allows users to:

- Add new civil records with fields such as First Name, Last Name, National ID, Age, Gender, Date of Birth, and Mobile Number
- Retrieve existing civil records by ID or fetch all records
- Update civil records
- Delete civil records

## Deliverables

| File | Description |
|------|-------------|
| `testplan.xlsx` | Full test plan spreadsheet with test case IDs, descriptions, preconditions, steps, expected results, and priority |

## Test Plan Structure

The spreadsheet is organized around the four main functional areas of the system:

**Add Civil (POST)**
- Valid data — happy path
- Duplicate ID — should return an error
- Invalid age (> 120)
- Missing gender selection
- Invalid mobile number format (must start with `05`, be 10 digits)
- Invalid/non-integer national ID
- First name exceeding 20 characters
- Last name exceeding 20 characters
- Missing date of birth

**Get Civil (GET)**
- Retrieve a single civil record by valid ID
- Retrieve all civil records
- Retrieve a non-existing civil ID

**Update Civil (PUT)**
- Update with valid data
- Update a non-existing civil
- Update with invalid data

**Delete Civil (DELETE)**
- Delete an existing civil
- Delete a non-existing civil
