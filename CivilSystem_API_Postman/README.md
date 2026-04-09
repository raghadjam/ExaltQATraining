# Assignment 6 — Postman API Collection: Civil Registration System

## Overview

This assignment contains a **Postman collection** (`getAllCivils.postman_collection.json`) with a set of API requests that query the Civil Registration System backend. The focus is on using **Postman's query capabilities** — filtering, sorting, and extracting specific data from the API response — rather than CRUD operations.

---

## System Under Test

The Civil Registration System REST API (Node.js/Express) exposes endpoints for managing civil records. This collection uses the `GET /get/all` endpoint and applies query parameters to filter and sort the returned dataset.

---

## Collection: `getAllCivils`

The collection contains **6 requests**, each demonstrating a different query or filter pattern:

| Request Name | Description |
|---|---|
| **Fetch Khader Ballout ID** | Retrieves the national ID of the civil record belonging to "Khader Ballout" |
| **Civil Ages Between 10 and 60** | Filters all civil records where age falls in the range [10, 60] |
| **Fetch Oldest Civil Age** | Queries for the civil record with the maximum age |
| **Fetch Civils in their Twenties** | Filters records where age is between 20 and 29 |
| **Fetch Civils Phone Number** | Extracts the mobile/phone number field from all civil records |
| **Fetch Sorted Civils** | Returns all civil records sorted (by name or ID) |

---

## How to Use

### Import the Collection
1. Open **Postman**
2. Click **Import**
3. Select `getAllCivils.postman_collection.json`

### Set Up Environment
Create a Postman environment variable:
- `BASE_URL` → `http://localhost:3000` (or wherever the Civil Registration System server is running)

### Run the Collection
- Start the Civil Registration System backend server first
- Run individual requests or use **Collection Runner** to execute all at once

---

## Prerequisites

The Civil Registration System server must be running before executing any requests. To start it:

```bash
cd "Assignment-4/Civil Registration System/Civil Registration System"
npm install
node index.js
```

---

## Technologies

| Tool | Purpose |
|------|---------|
| Postman | API testing and request collection management |
| Node.js / Express | Civil Registration System backend |
| JSON | Request/response format |
