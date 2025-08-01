pipeline {
    agent any  // Use single agent

    parameters {
        choice(name: 'testSuit', choices: [
            'None',
            'smoke',
            'regression'
        ], description: 'Select the test suite to run')

        choice(name: 'testType', choices: [
            'None',
            'Compare',
            'EMICalculator',
            'LanguageSwitcher',
            'LeadForms',
            'LocationMaster',
            'Login',
            'PageRedirection',
            'Search',
            'SeoElements',
            'UsedTractorListing'
        ], description: 'Select the individual test type to run')

        choice(name: 'environment', choices: [
            'QA',
            'UAT',
            'Production'
        ], description: 'Select the environment to run tests on')

        choice(name: 'browser', choices: [
            'Chrome',
            'Edge',
            'Firefox'
        ], description: 'Select the browser to run tests on')
    }

    environment {
        TEST_STATUS = 'SUCCESS'
    }

    stages {
        stage('Validate Environment') {
            steps {
                script {
                    def environment = params.environment.trim()
                    switch (environment) {
                        case 'QA':
                            env.BASE_URL = 'https://t1tj.tractorfirst.com/'
                            break
                        case 'UAT':
                            env.BASE_URL = 'https://seo1tj.tractorfirst.com/'
                            break
                        case 'Production':
                            env.BASE_URL = 'https://www.tractorjunction.com/'
                            break
                        default:
                            error "Invalid environment selected: ${environment}"
                    }
                    echo "Environment validated. Base URL: ${env.BASE_URL}"
                }
            }
        }

        stage('Clean Allure Results') {
            steps {
                echo 'Cleaning old Allure results...'
                bat 'rmdir /s /q allure-results merged-allure-results || exit 0'
            }
        }

        stage('Install Packages (If Needed)') {
            steps {
                script {
                    if (!fileExists('node_modules')) {
                        echo 'node_modules not found. Installing dependencies...'
                        bat 'npm install'
                    } else {
                        echo 'node_modules already exists. Skipping npm install.'
                        def cypressVersion = bat(script: 'node -p "require(\'./node_modules/cypress/package.json\').version"', returnStdout: true).trim()
                        def installedBinary = bat(script: 'npx cypress --version', returnStdout: true).trim().split(' ')[0]
                        if (cypressVersion != installedBinary) {
                            echo 'Cypress binary outdated. Reinstalling...'
                            bat 'npx cypress install'
                        } else {
                            echo 'Cypress binary up-to-date. Skipping install.'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def testSuit = params.testSuit
                    def testType = params.testType
                    def environment = params.environment.trim()
                    def browser = params.browser
                    def parallelStages = [:]

                    // All test files under cypress/e2e/Tests
                    def allSpecs = [
                        'cypress/e2e/Tests/Compare.cy.js',
                        'cypress/e2e/Tests/EMICalculator.cy.js',
                        'cypress/e2e/Tests/LanguageSwitcher.cy.js',
                        'cypress/e2e/Tests/LeadForms.cy.js',
                        'cypress/e2e/Tests/LocationMaster.cy.js',
                        'cypress/e2e/Tests/Login.cy.js',
                        'cypress/e2e/Tests/PageRedirection.cy.js',
                        'cypress/e2e/Tests/Search.cy.js',
                        'cypress/e2e/Tests/SeoElements.cy.js',
                        'cypress/e2e/Tests/UsedTractorListing.cy.js'
                    ]

                    // Smoke suite tests (removed PageRedirection.cy.js)
                    def smokeSpecs = [
                        'cypress/e2e/Tests/Login.cy.js',
                        'cypress/e2e/Tests/LeadForms.cy.js',
                        'cypress/e2e/Tests/UsedTractorListing.cy.js'
                    ]

                    echo "Selected test suite: ${testSuit}"
                    echo "Selected test type: ${testType}"
                    echo "Selected environment: ${environment}"
                    echo "Selected browser: ${browser}"
                    echo "Base URL: ${env.BASE_URL}"

                    try {
                        if (testSuit == 'smoke') {
                            // Single batch for smoke
                            def specFiles = smokeSpecs
                            def resultFolder = "allure-results\\smoke"
                            bat """
                                if not exist \"${resultFolder}\" mkdir \"${resultFolder}\"
                                npx cypress run --spec \"${specFiles.join(',')}\" \
                                --env baseUrl=${env.BASE_URL},environment=${environment} \
                                --browser ${browser.toLowerCase()} \
                                --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                > \"${resultFolder}\\cypress-test-smoke.log\" 2>&1
                            """
                            def logContent = readFile("${resultFolder}\\cypress-test-smoke.log")
                            if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                echo "Test failures detected in smoke suite"
                                env.TEST_STATUS = 'FAILURE'
                            }
                            echo "Completed smoke suite"
                        } else if (testSuit == 'regression') {
                            // Three batches for better resource distribution
                            def specFilesBatch1 = [
                                'cypress/e2e/Tests/Compare.cy.js',
                                'cypress/e2e/Tests/EMICalculator.cy.js',
                                'cypress/e2e/Tests/LeadForms.cy.js',
                                'cypress/e2e/Tests/LanguageSwitcher.cy.js'
                            ]
                            def specFilesBatch2 = [
                                'cypress/e2e/Tests/SeoElements.cy.js'
                                'cypress/e2e/Tests/Search.cy.js',
                                'cypress/e2e/Tests/UsedTractorListing.cy.js',
                                'cypress/e2e/Tests/LocationMaster.cy.js'
                            ]
                            def specFilesBatch3 = [
                                'cypress/e2e/Tests/PageRedirection.cy.js',
                                'cypress/e2e/Tests/Login.cy.js'                               
                            ]

                            parallelStages["Regression_Batch_1"] = {
                                timeout(time: 45, unit: 'MINUTES') {
                                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                        def resultFolder = "allure-results\\regression-batch-1"
                                        def startTime = new Date().time
                                        echo "Starting regression batch 1 at ${new Date(startTime)}"
                                        bat """
                                            if not exist \"${resultFolder}\" mkdir \"${resultFolder}\"
                                            npx cypress run --spec \"${specFilesBatch1.join(',')}\" \
                                            --env baseUrl=${env.BASE_URL},environment=${environment} \
                                            --browser ${browser.toLowerCase()} \
                                            --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                            > \"${resultFolder}\\cypress-test-batch1.log\" 2>&1
                                        """
                                        def logContent = readFile("${resultFolder}\\cypress-test-batch1.log")
                                        def endTime = new Date().time
                                        echo "Completed regression batch 1 at ${new Date(endTime)} (Duration: ${(endTime - startTime)/1000} seconds)"
                                        if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                            echo "Test failures detected in regression batch 1"
                                            env.TEST_STATUS = 'FAILURE'
                                        }
                                    }
                                }
                            }

                            parallelStages["Regression_Batch_2"] = {
                                timeout(time: 45, unit: 'MINUTES') {
                                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                        def resultFolder = "allure-results\\regression-batch-2"
                                        def startTime = new Date().time
                                        echo "Starting regression batch 2 at ${new Date(startTime)}"
                                        bat """
                                            if not exist \"${resultFolder}\" mkdir \"${resultFolder}\"
                                            npx cypress run --spec \"${specFilesBatch2.join(',')}\" \
                                            --env baseUrl=${env.BASE_URL},environment=${environment} \
                                            --browser ${browser.toLowerCase()} \
                                            --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                            > \"${resultFolder}\\cypress-test-batch2.log\" 2>&1
                                        """
                                        def logContent = readFile("${resultFolder}\\cypress-test-batch2.log")
                                        def endTime = new Date().time
                                        echo "Completed regression batch 2 at ${new Date(endTime)} (Duration: ${(endTime - startTime)/1000} seconds)"
                                        if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                            echo "Test failures detected in regression batch 2"
                                            env.TEST_STATUS = 'FAILURE'
                                        }
                                    }
                                }
                            }

                            parallelStages["Regression_Batch_3"] = {
                                timeout(time: 45, unit: 'MINUTES') {
                                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                        def resultFolder = "allure-results\\regression-batch-3"
                                        def startTime = new Date().time
                                        echo "Starting regression batch 3 at ${new Date(startTime)}"
                                        bat """
                                            if not exist \"${resultFolder}\" mkdir \"${resultFolder}\"
                                            npx cypress run --spec \"${specFilesBatch3.join(',')}\" \
                                            --env baseUrl=${env.BASE_URL},environment=${environment} \
                                            --browser ${browser.toLowerCase()} \
                                            --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                            > \"${resultFolder}\\cypress-test-batch3.log\" 2>&1
                                        """
                                        def logContent = readFile("${resultFolder}\\cypress-test-batch3.log")
                                        def endTime = new Date().time
                                        echo "Completed regression batch 3 at ${new Date(endTime)} (Duration: ${(endTime - startTime)/1000} seconds)"
                                        if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                            echo "Test failures detected in regression batch 3"
                                            env.TEST_STATUS = 'FAILURE'
                                        }
                                    }
                                }
                            }

                            parallel parallelStages
                        } else if (testSuit == 'None' && testType != 'None') {
                            def testTypePath = "cypress/e2e/Tests/${testType}.cy.js"
                            def testTypeExists = fileExists(testTypePath)
                            if (testTypeExists) {
                                bat """
                                    if not exist \"allure-results\" mkdir \"allure-results\"
                                    npx cypress run --spec \"${testTypePath}\" \
                                    --env baseUrl=${env.BASE_URL},environment=${environment} \
                                    --browser ${browser.toLowerCase()} \
                                    --reporter mocha-allure-reporter --reporter-options allureResultsPath=allure-results \
                                    > \"allure-results\\cypress-test.log\" 2>&1
                                """
                                def logContent = readFile("allure-results\\cypress-test.log")
                                if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                    echo "Test failures detected in ${testType}"
                                    env.TEST_STATUS = 'FAILURE'
                                }
                            } else {
                                error "No test file found for testType: ${testType}"
                            }
                        } else {
                            error "No valid test suite or test type selected."
                        }

                        def allureEnvContent = """
                            environment=${environment}
                            baseUrl=${env.BASE_URL}
                            browser=${browser}
                        """.trim()
                        writeFile file: 'allure-results/environment.properties', text: allureEnvContent

                        echo "Test execution completed. TEST_STATUS: ${env.TEST_STATUS}"

                        if (env.TEST_STATUS == 'FAILURE') {
                            env.PARALLEL_STAGES_SIZE = parallelStages.size().toString()
                            error("Test failures detected. Marking build as failed.")
                        }
                    } catch (Exception e) {
                        echo "Tests failed: ${e.message}"
                        env.TEST_STATUS = 'FAILURE'
                        error("Execution failed with error: ${e.message}")
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    echo 'Generating Allure Report...'
                    def parallelStagesSize = env.PARALLEL_STAGES_SIZE ? env.PARALLEL_STAGES_SIZE.toInteger() : 0
                    if (parallelStagesSize > 0) {
                        echo 'Merging Allure results from parallel runs...'
                        bat '''
                            if not exist "merged-allure-results" mkdir "merged-allure-results"
                            copy allure-results\\*.json merged-allure-results\\ >nul 2>&1
                            copy allure-results\\*.xml merged-allure-results\\ >nul 2>&1
                            copy allure-results\\*.txt merged-allure-results\\ >nul 2>&1
                            if exist "allure-results\\environment.properties" copy "allure-results\\environment.properties" "merged-allure-results\\" >nul 2>&1
                        '''
                        allure([results: [[path: 'merged-allure-results']]])
                    } else {
                        allure([results: [[path: 'allure-results']]])
                    }
                }
            }
        }
    }
}