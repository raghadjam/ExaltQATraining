# Assignment 2 — JavaScript Async/Await & Promises

## Overview

This assignment is a collection of **nine JavaScript programming tasks** focused on asynchronous programming concepts, closures, and utility patterns commonly needed in test automation. All solutions are documented with code and expected outputs in a single file: `Assignment-3.js`.

## What This Assignment Covers

The file contains commented-out code blocks for each task, explaining the logic and showing expected console outputs. This serves as both a learning exercise in JavaScript fundamentals and a reference for automation engineering patterns.

---

## Tasks

### Task 1 — Promise Basics & Type Validation
Simulates an API call using `Promise`. Resolves after 2 seconds with a user object if the input is a number; rejects with an error message if not.

**Key concept:** `Promise`, `resolve`, `reject`, `.then()`, `.catch()`

### Task 2 — Sequential vs. Parallel Execution
Compares `async/await` sequential execution (~5 seconds) vs. `Promise.all` parallel execution (~3 seconds) when fetching a user and their orders simultaneously.

**Key concept:** `async/await`, `Promise.all`, `console.time`

**Conclusion:** Parallel execution is preferred in automation since it more accurately simulates real user behavior and is faster.

### Task 3 — Fetch with Retry Logic
Implements a `fetchWithRetry(fn, retries, delay)` function that retries a failing async operation at configurable intervals. Supports both delayed retries (using `setInterval`) and immediate retries.

**Key concept:** Retry patterns, `setInterval`, error propagation

### Task 4 — Async Delay Utility
Implements a `delay(ms)` function that returns a Promise resolving after a given millisecond delay — a common utility in test automation for waiting between steps.

**Key concept:** `setTimeout` wrapped in a Promise

### Task 5 — Sequential Test Flow with Timeout Abort
Implements a realistic automated test flow (Login → Click Button → Verify Dashboard) that runs sequentially. Uses `Promise.race` to abort the entire flow if it exceeds 8 seconds.

**Key concept:** `Promise.race`, timeout abort, sequential async flow, error handling in automation

### Task 6 — Closure Counter with Encapsulation
Creates a counter factory function with `increment`, `decrement`, and `reset` operations. The counter variable is private (not directly accessible), demonstrating encapsulation via closures.

**Key concept:** Closures, data encapsulation, factory functions

### Task 7 — Retry Wrapper with Flaky Network Simulation
Implements `createRetryWrapper(fn, maxTries)` — a higher-order function that wraps any async function and retries it up to `maxTries` times. Simulates both network-level failures and function-level failures randomly.

**Key concept:** Higher-order functions, flaky test handling

### Task 8 — JavaScript Event Loop Order
Demonstrates and explains the JavaScript event loop execution order:
1. Synchronous code
2. Microtasks (Promises)
3. Macrotasks (setTimeout)

**Output explanation:** `A → D → C → B`

### Task 9 — Email Validation with Regex
Implements an `isValidEmail(email)` function using a regular expression that validates:
- Alphanumeric characters, dots, and underscores before `@`
- Domain name after `@`
- Correct TLD format

Tests 8 email strings covering valid and invalid cases (spaces, special characters, etc.).

---

## File Structure

```
Assignment-3/
└── Assignment-3.js   # All 9 tasks as commented code blocks with outputs
```

## How to Run

Each task is enclosed in a comment block. To run a specific task, uncomment the relevant code block and execute with Node.js:

```bash
node Assignment-3.js
```

## Technologies

- **Language:** JavaScript (Node.js)
- **Concepts:** Promises, async/await, closures, regex, event loop
