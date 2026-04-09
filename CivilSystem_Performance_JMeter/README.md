# Assignment 8 — JMeter Performance Testing: Civil Registration System

## Overview

This assignment implements **performance/load testing** for the Civil Registration System API using **Apache JMeter**. The test plan (`CivilTestPlan.jmx`) simulates concurrent users executing all five CRUD operations against the API and measures response times, throughput, and error rates. An HTML report (`index.html`) shows the results of a prior test run.

---

## System Under Test

The Civil Registration System REST API (Node.js/Express) running on `localhost:3000` with these endpoints:

| HTTP Method | Endpoint | Operation |
|-------------|----------|-----------|
| `DELETE` | `/delete/{id}` | Delete an existing civil |
| `POST` | `/add/` | Create a new civil |
| `GET` | `/get/all` | Retrieve all civil records |
| `GET` | `/get/{id}` | Get a specific civil record |
| `PUT` | `/edit/` | Update an existing civil record |

---

## JMeter Test Plan: `CivilTestPlan.jmx`

### Thread Groups

The test plan contains **5 Thread Groups**, one per CRUD operation. Each group is configured with:

| Setting | Value |
|---------|-------|
| **Threads (users)** | 51 |
| **Ramp-up time** | 1 second |
| **Loop count** | 1 |

This means 51 virtual users are launched within 1 second, each executing the operation once — simulating a burst load scenario.

### Thread Groups (in order)

1. **Delete Existing Civil** — Sends `DELETE /delete/{Counter}` using a parameterized counter variable
2. **Create New Civil** — Sends `POST /add/` with a JSON body containing civil data
3. **Get All Civils** — Sends `GET /get/all`
4. **Get Existing Civil** — Sends `GET /get/{Counter}` for individual record retrieval
5. **Update Existing Civil** — Sends `PUT /edit/` with an updated JSON payload

### Test Variables (User Defined Variables)

| Variable | Value |
|----------|-------|
| `BASE_URL` | `localhost` |
| `PORT` | `3000` |
| `FIRSTNAME` | `Raghad` |
| `LASTNAME` | `J` |
| `AGE` | `21` |
| `MOBILE` | `0599999999` |
| `GETALL` | `/get/all` |
| `ADD` | `/add/` |
| `DELETE` | `/delete/` |
| `GETCIVIL` | `/get/` |
| `EDIT` | `/edit/` |

### Listeners (Result Collectors)

The test plan includes four built-in JMeter result viewers:

| Listener | Purpose |
|----------|---------|
| **View Results Tree** | Detailed per-request request/response inspection |
| **Aggregate Report** | Summary table: avg/min/max response time, throughput, error % |
| **Summary Report** | High-level stats overview |
| **View Results in Table** | Tabular timeline of all sampler results |

---

## Running the Tests

### Prerequisites
- Apache JMeter installed (version 5.x+)
- Civil Registration System backend running on `localhost:3000`

### Start the backend
```bash
cd "Assignment-4/Civil Registration System/Civil Registration System"
npm install
node index.js
```

### Run via JMeter GUI
```bash
jmeter -t CivilTestPlan.jmx
```

### Run headless (CLI) and generate report
```bash
jmeter -n -t CivilTestPlan.jmx -l results.jtl -e -o report/
```

### View saved HTML report
Open `Assignment-9/index.html` in a browser to view the results from the included test run.

---

## Technologies

| Tool | Purpose |
|------|---------|
| Apache JMeter | Load testing and performance measurement |
| Node.js / Express | Civil Registration System backend under test |
| JMX | JMeter's XML-based test plan format |
| HTML Dashboard | JMeter's built-in reporting output |
