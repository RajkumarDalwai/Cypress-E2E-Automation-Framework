# **Cypress E2E Automation Framework**

## 🧩 Overview

A modern, scalable, and maintainable **End-to-End (E2E)** test automation framework built using **Cypress**, designed specifically for validating the **TractorJunction** web application.

Key capabilities include:

* ✅ Fast execution using Cypress's DOM snapshotting engine
* ✅ Allure Reporting Integration
* ✅ Modular Page Object Model (POM)
* ✅ Reusable custom commands
* ✅ Multi-environment config support
* ✅ Jenkins CI/CD integration
* ✅ Structured test data handling via fixtures

---

## 🚀 Features

* **⚡ Rapid Execution**
  Harness Cypress’s blazing fast test runner and auto-reload capabilities.

* **📄 Page Object Model (POM)**
  All UI interactions are abstracted in dedicated page classes for each module.

* **♻️ Custom Commands**
  Common interactions are centralized via `commands.js` and `seocommands.js`.

* **📂 Modular Test Structure**
  Organized test files by feature/module for maintainability.

* **🧪 Test Fixtures**
  Test data like SEO metadata, state dropdown values, lead form input, etc., are stored in well-structured folders under `fixtures/Test-Data`.

* **🌐 Multi-Environment Support**
  Easily switch base URLs and environment-specific config using environment variables.

* **📊 Allure Reporting Integrated**
  Generates rich test execution reports including steps, logs, screenshots, and trends.

* **⚙️ Jenkins CI/CD**
  Run tests on commit or schedule using Jenkins pipeline with Windows-compatible `bat` steps.

---

## ✅ Test Coverage

| Module               | No. of Tests | Description                                                                 |
| -------------------- | ------------ | --------------------------------------------------------------------------- |
| Login                | 1            | Basic login flow validation                                                 |
| Language Switcher    | 4            | Verify 5-language switching functionality                                   |
| Search               | 2            | Input interaction + result validation                                       |
| Lead Forms           | 10           | Tests for Sell Used, New Tractor, Loan etc. lead forms                      |
| Page Redirection     | 10           | Navigation & redirection validations                                        |
| Location Master      | 10           | Dropdowns & location-based field behavior                                   |
| SEO Elements         | 40           | Validates title, meta tags, h1s across languages using fixture-driven tests |
| Used Tractor Filters | 5            | Filtering logic: price, brand, year, sort                                   |
| Compare Page         | 2            | Validates tractor comparison UX                                             |
| EMI Calculator       | 1            | Ensures correct EMI is calculated based on inputs                           |

**🔢 Total Automated Tests: 85**

---

## 📁 Project Structure

```
CYPRESS-E2E-AUTOMATION-FRAMEWORK/
├── cypress/
│   ├── downloads/                           → Auto-downloads from test runs
│   ├── e2e/
│   │   ├── Pages/                           → Page Object files (modular per feature)
│   │   │   ├── LoginPage.js
│   │   │   ├── SearchPage.js
│   │   │   └── ...
│   │   └── Tests/                           → Test specs (*.cy.js)
│   │       ├── Login.cy.js
│   │       ├── SeoElements.cy.js
│   │       └── ...
│   ├── fixtures/
│   │   └── Test-Data/                       → Organized test data
│   │       ├── File-Uploads/
│   │       ├── Lead-Test-Data/
│   │       ├── SEO-Elements/
│   │       └── State-Data/
│   ├── support/
│   │   ├── commands.js                      → Custom commands
│   │   ├── seocommands.js                   → SEO-specific commands
│   │   └── e2e.js                           → Global hooks (before/after)
├── cypress.config.js                        → Cypress project configuration
├── Jenkinsfile                              → Jenkins pipeline configuration
├── package.json                             → Project dependencies and scripts
├── package-lock.json                        → Dependency lock file
```

---

## ⚙️ Setup & Execution

### 1. **Clone the Repo**

```bash
git clone https://github.com/YourRepo/Cypress-E2E-Automation-Framework.git
cd Cypress-E2E-Automation-Framework
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Run Tests**

#### Run all tests:

```bash
npx cypress run
```

#### Run tests in headed mode:

```bash
npx cypress open
```

#### Run specific test:

```bash
npx cypress run --spec "cypress/e2e/Tests/Login.cy.js"
```

---

## 🧪 Allure Reporting

<img width="1902" height="869" alt="image" src="https://github.com/user-attachments/assets/0ecdd43a-4091-4bad-aeaf-4d0d6b0058b8" />


### Generate Allure Reports:

1. Install Allure dependencies (if not already):

```bash
npm install -D @shelex/cypress-allure-plugin allure-commandline
```

2. Add this to your `cypress.config.js`:

```js
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  }
});
```

3. Run test with Allure results:

```bash
npx cypress run
```

4. Serve Allure report:

```bash
npx allure generate allure-results --clean && npx allure open
```

---

## ⚙️ Jenkins Integration (Windows)

<img width="1496" height="688" alt="image" src="https://github.com/user-attachments/assets/d7a90f95-aaa3-4dac-9d9a-1d87243f8b0f" />


```groovy
pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx cypress run'
            }
        }
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
                bat 'npx allure open allure-report'
            }
        }
    }
}
```

---

## 💡 Best Practices Followed

✅ Data-driven testing with structured fixtures

✅ SEO validations from external JSONs

✅ Test isolation with `beforeEach()` & `afterEach()`

✅ Thread-safe command chaining

✅ Page Object abstraction for reusability

---

## 🤝 Contributing

We welcome your ideas and improvements!

1. Fork the repo
2. Create a feature branch
3. Raise a PR with detailed changes

Let’s build efficient and elegant automation—**together** 🚀
