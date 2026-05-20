# thinkpalm-agentai-rahnas-Lab-D10-QA-Muhammad-Rahnas-RM

# OrangeHRM Login Automation Testing

## Project Overview
This project automates the Login functionality testing of the OrangeHRM application using Playwright/Selenium.

The automation script validates different login scenarios such as:
- Valid login
- Invalid login
- Empty fields validation
- Password masking
- Logout functionality

---

## Application Under Test
OrangeHRM Demo Application

URL:
https://opensource-demo.orangehrmlive.com

---

## User Story
As an employee/admin user, I want to log in to the OrangeHRM application using my username and password so that I can securely access the HR management system.

---

## Features Covered
- Login Authentication
- Input Validation
- Error Message Verification
- Logout Functionality
- UI Validation

---

## Test Scenarios
1. Verify login with valid credentials
2. Verify login with invalid password
3. Verify login with invalid username
4. Verify login with empty username and password
5. Verify required field validations
6. Verify password masking
7. Verify dashboard navigation after login
8. Verify logout functionality
9. Verify forgot password navigation
10. Verify login page elements visibility

---

## Tools & Technologies Used

### Automation Tool
- Playwright / Selenium

### Programming Language
- Python

### IDE
- Visual Studio Code

### Browser
- Google Chrome

---

## Project Structure

```text
project-folder/
│
├── tests/
│   └── login_test.py
│
├── screenshots/
│
├── requirements.txt
│
└── README.md


Test Credentials:
Username	  Password
Admin	      admin123

Expected Result:
User should successfully log in and navigate to the dashboard page using valid credentials.

Observations:
Login functionality works correctly with valid credentials.
Proper validation messages appear for invalid inputs.
Password field is masked for security.
Logout redirects the user back to login page.

