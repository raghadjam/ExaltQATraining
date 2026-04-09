# Assignment 4 — Bash Scripting

## Overview

This assignment contains **two Bash scripting tasks** covering file manipulation, text processing with Unix tools, and an interactive menu-driven program. Both scripts are self-contained and demonstrate practical shell scripting skills relevant to test automation and DevOps workflows.

---

## Task 1 — City Data File Processing (`Task-1`)

### Description
A Bash script that creates and manages structured data files for Palestinian cities. It demonstrates creating directory structures, writing formatted data, and processing text files using standard Unix tools.

### What It Does

1. **Creates a `Cities/` directory** and generates individual `.txt` files for 5 cities:
   - Bethlehem, Ramallah, Jerusalem, Nablus, Hebron
   - Each file contains: City, Population, CityCode, PhoneCode, FamousPerson, AreaCode

2. **Counts files** containing the letter `e` in their name (case-insensitive)

3. **Combines data** into `all_cities.txt` with a header row

4. **Performs the following queries** on the combined file:
   - Cities with the lowest and highest population (using `sort -n`)
   - Cities and their city codes
   - City with phone code `04`
   - Cities sorted by phone code
   - Famous person in Hebron
   - Cities with area code `123`
   - Area code for Nablus

5. **Cleans up** by deleting the `Cities/` directory at the end

### Key Unix Tools Used
`printf`, `ls`, `grep`, `cat`, `tr`, `cut`, `sort`, `sed`, `tail`, `rm`

### Sample Output
```
Number of files containing the letter 'e' in their names: 4
Cities with the lowest and highest population:
Lowest: Nablus
Highest: Jerusalem
...
```

---

## Task 2 — Interactive Menu Program (`Task-2`)

### Description
An interactive Bash program with a menu-driven interface that performs four mathematical and string operations. Includes robust input validation throughout.

### Menu Options

| Option | Operation | Description |
|--------|-----------|-------------|
| 1 | Factorial | Computes `n!` recursively for a given non-negative integer |
| 2 | Sum | Keeps prompting for numbers until `0` is entered, then prints total |
| 3 | Palindrome | Checks if a given string reads the same forwards and backwards |
| 4 | Maximum | Finds the largest number from a space-separated array of integers |
| 5 | Exit | Exits the program |

### Key Features
- **Input validation (`validAnswer`):** Rejects any non-numeric input and prompts again
- **Recursive factorial:** Implemented as a recursive Bash function
- **Array palindrome check:** Uses `rev` to reverse the string and compares
- **Looping menu:** Returns to the menu after each operation until the user exits

### Running the Scripts

```bash
# Task 1
bash Task-1

# Task 2
bash Task-2
```

---

## Technologies

- **Language:** Bash
