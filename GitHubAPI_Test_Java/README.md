# Assignment 11 — REST Assured API Testing: GitHub Search API

## Overview

This assignment implements a comprehensive **API test automation suite** for the **GitHub Search API** using **Java**, **REST Assured**, **JUnit 5**, and **Allure** for reporting. The project tests all 7 search endpoints of the GitHub API — repositories, code, commits, issues/PRs, labels, topics, and users — covering both valid and invalid query scenarios with JSON schema validation. A test plan spreadsheet (`GitHub API.xlsx`) documents all planned test cases.

---

## System Under Test

The GitHub REST API search endpoints at `https://api.github.com`:

| Endpoint | Description |
|----------|-------------|
| `/search/repositories` | Search for repositories |
| `/search/code` | Search for code within repositories |
| `/search/commits` | Search for commits |
| `/search/issues` | Search for issues and pull requests |
| `/search/labels` | Search for labels in a repository |
| `/search/topics` | Search for topics |
| `/search/users` | Search for users and organizations |

Authentication is done via a **GitHub personal access token** loaded from a `.env` file.

---

## Project Structure

```
Assignment-13/
├── GitHub API.xlsx                          # Test plan spreadsheet
└── APItesting/
    ├── pom.xml                              # Maven dependencies
    ├── src/
    │   ├── main/java/com/example/search_api/support/
    │   │   ├── Constants.java               # Endpoints, query sets, HTTP codes, messages
    │   │   ├── Utils.java                   # REST Assured helpers, assertions, retry logic
    │   │   └── selectors.json               # JSON key name mappings
    │   └── test/
    │       ├── java/
    │       │   ├── SearchCodeTest.java
    │       │   ├── SearchCommitTest.java
    │       │   ├── SearchIssuesPR.java
    │       │   ├── SearchLabelTest.java
    │       │   ├── SearchRepoTest.java
    │       │   ├── SearchTopicsTest.java
    │       │   └── SearchUserTest.java
    │       └── resources/schemas/
    │           ├── search_code_schema.json
    │           ├── search_commit_schema.json
    │           ├── search_issues_schema.json
    │           ├── search_label_schema.json
    │           ├── search_repo_schema.json
    │           ├── search_topic_schema.json
    │           ├── search_user_schema.json
    │           └── error_response_schema.json
    ├── allure-results/                      # Allure test result data
    └── target/site/surefire-report.html    # Maven Surefire HTML report
```

---

## Test Structure

Each test class follows the same pattern with two parameterized test methods:

### `testInvalidQueries(String query)`
- Sends a request with an invalid/malformed query
- Asserts HTTP `422 Validation Failed`
- Validates the error response matches `error_response_schema.json`
- Checks the error message matches expected validation messages

### `testValidQueries(String query)`
- Sends a request with a valid query
- Asserts HTTP `200 OK`
- Validates the response matches the endpoint-specific JSON schema
- Checks key response fields (total_count ≥ 0, items array present, etc.)

---

## Query Coverage per Endpoint

### Code Search (`SearchCodeTest`)
Valid: filename, repo+filename, path, language, keyword search, per_page variants

Invalid: too many terms, empty query, invalid language

### Commit Search (`SearchCommitTest`)
Valid: keyword in repo, sort/order, author, committer-date, committer-email, per_page variants

### Issues & PRs (`SearchIssuesPR`)
Valid: keyword + `is:issue`, label, date filters, state, per_page variants

Invalid: missing `is:issue` or `is:pull-request` qualifier

### Labels Search (`SearchLabelTest`)
Valid: repository_id + label name, per_page variants

Invalid: missing `q`, missing `repository_id`, invalid repo ID `0`

### Repository Search (`SearchRepoTest`)
Valid: language, topic, user, stars, forks, sort, per_page variants

Invalid: invalid language shorthand (e.g., `language:py`)

### Topics Search (`SearchTopicsTest`)
Valid: keyword, created date, per_page variants

Invalid: empty query, query > 256 characters

### User Search (`SearchUserTest`)
Valid: name keyword, type filter, per_page variants

---

## Key Implementation Details

### Retry Logic (`Utils.searchWithRetry`)
GitHub's Search API enforces rate limits (10 requests/minute for unauthenticated, 30 for authenticated). The `searchWithRetry` method automatically retries on HTTP `429 Too Many Requests` or `403 Forbidden` with exponential backoff.

### Schema Validation
Each endpoint has a dedicated JSON schema file. REST Assured's `matchesJsonSchemaInClasspath()` validates the full response structure including field types, required fields, and nested objects.

### Label Endpoint Special Handling
The `/search/labels` endpoint uses `repository_id` and `q` as separate query parameters (not a single `q` string), so `Utils.search()` has specific parsing logic for label queries.

### Environment Configuration
GitHub token is loaded from a `.env` file using `dotenv-java`:
```
GITHUB_TOKEN=your_github_personal_access_token
```

---

## Setup & Running

### Prerequisites
- Java 11+
- Maven 3.6+
- A GitHub personal access token with `repo` and `read:org` scopes

### Configure token
Create `APItesting/.env`:
```
GITHUB_TOKEN=ghp_your_token_here
```

### Run all tests
```bash
cd APItesting
mvn test
```

### Generate Allure report
```bash
mvn allure:serve
```

### Generate Surefire HTML report
```bash
mvn site
# Open target/site/surefire-report.html
```

---

## Technologies

| Tool | Purpose |
|------|---------|
| Java | Test programming language |
| REST Assured 5.5 | HTTP client and assertion library for API tests |
| JUnit 5 | Test runner with parameterized test support |
| Allure 2.22 | Rich HTML test reporting |
| Maven | Build and dependency management |
| dotenv-java | Environment variable loading from `.env` file |
| JSON Schema Validator | Response structure validation |
