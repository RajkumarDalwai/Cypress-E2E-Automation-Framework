pipeline {
    agent any

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
                sh 'rm -rf allure-results merged-allure-results || true'
            }
        }

        stage('Install Packages (If Needed)') {
            steps {
                script {
                    if (!fileExists('node_modules')) {
                        echo 'node_modules not found. Installing dependencies...'
                        sh 'npm install'
                    } else {
                        echo 'node_modules already exists. Skipping npm install.'
                        def cypressVersion = sh(script: 'node -p "require(\'./node_modules/cypress/package.json\').version"', returnStdout: true).trim()
                        def installedBinary = sh(script: 'npx cypress --version', returnStdout: true).trim().split(' ')[0]
                        if (cypressVersion != installedBinary) {
                            echo 'Cypress binary outdated. Reinstalling...'
                            sh 'npx cypress install'
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

                    // Smoke suite: pick your most critical tests
                    def smokeSpecs = [
                        'cypress/e2e/Tests/Login.cy.js',
                        'cypress/e2e/Tests/LeadForms.cy.js',
                        'cypress/e2e/Tests/UsedTractorListing.cy.js',
                        'cypress/e2e/Tests/PageRedirection.cy.js'
                    ]

                    echo "Selected test suite: ${testSuit}"
                    echo "Selected test type: ${testType}"
                    echo "Selected environment: ${environment}"
                    echo "Selected browser: ${browser}"
                    echo "Base URL: ${env.BASE_URL}"

                    try {
                        if (testSuit == 'smoke') {
                            // Run smoke suite in parallel (single batch)
                            smokeSpecs.eachWithIndex { specFile, index ->
                                def specName = specFile.tokenize('/').last().replace('.cy.js', '')
                                def resultFolder = "allure-results/smoke-spec-${index}-${specName}"
                                parallelStages["Smoke_Spec_${index}_${specName}"] = {
                                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                        sh """
                                            mkdir -p ${resultFolder}
                                            xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
                                            npx cypress run --spec "${specFile}" \
                                            --env baseUrl=${env.BASE_URL},environment=${environment} \
                                            --browser ${browser.toLowerCase()} \
                                            --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                            | tee ${resultFolder}/cypress-test.log
                                        """
                                        def logContent = readFile("${resultFolder}/cypress-test.log")
                                        if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                            echo "Test failures detected in ${specFile}"
                                            env.TEST_STATUS = 'FAILURE'
                                        }
                                    }
                                }
                            }
                            parallel parallelStages
                        } else if (testSuit == 'regression') {
                            // Split regression suite into two batches
                            def midPoint = allSpecs.size().intdiv(2)
                            def batch1 = allSpecs[0..<midPoint]
                            def batch2 = allSpecs[midPoint..<allSpecs.size()]

                            // Batch 1
                            parallelStages["Regression_Batch_1"] = {
                                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                    def resultFolder = "allure-results/regression-batch-1"
                                    sh """
                                        mkdir -p ${resultFolder}
                                        xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
                                        npx cypress run --spec "${batch1.join(',')}" \
                                        --env baseUrl=${env.BASE_URL},environment=${environment} \
                                        --browser ${browser.toLowerCase()} \
                                        --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                        | tee ${resultFolder}/cypress-test.log
                                    """
                                    def logContent = readFile("${resultFolder}/cypress-test.log")
                                    if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                        echo "Test failures detected in regression batch 1"
                                        env.TEST_STATUS = 'FAILURE'
                                    }
                                }
                            }

                            // Batch 2
                            parallelStages["Regression_Batch_2"] = {
                                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                    def resultFolder = "allure-results/regression-batch-2"
                                    sh """
                                        mkdir -p ${resultFolder}
                                        xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
                                        npx cypress run --spec "${batch2.join(',')}" \
                                        --env baseUrl=${env.BASE_URL},environment=${environment} \
                                        --browser ${browser.toLowerCase()} \
                                        --reporter mocha-allure-reporter --reporter-options allureResultsPath=${resultFolder} \
                                        | tee ${resultFolder}/cypress-test.log
                                    """
                                    def logContent = readFile("${resultFolder}/cypress-test.log")
                                    if (logContent.toLowerCase().contains('failed') || logContent.toLowerCase().contains('fail')) {
                                        echo "Test failures detected in regression batch 2"
                                        env.TEST_STATUS = 'FAILURE'
                                    }
                                }
                            }
                            parallel parallelStages
                        } else if (testSuit == 'None' && testType != 'None') {
                            def testTypePath = "cypress/e2e/Tests/${testType}.cy.js"
                            def testTypeExists = fileExists(testTypePath)
                            if (testTypeExists) {
                                sh """
                                    mkdir -p allure-results
                                    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
                                    npx cypress run --spec "${testTypePath}" \
                                    --env baseUrl=${env.BASE_URL},environment=${environment} \
                                    --browser ${browser.toLowerCase()} \
                                    --reporter mocha-allure-reporter --reporter-options allureResultsPath=allure-results \
                                    | tee allure-results/cypress-test.log
                                """
                                def logContent = readFile("allure-results/cypress-test.log")
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
                        sh '''
                            mkdir -p merged-allure-results
                            find allure-results/ -type f -name '*.json' -exec cp {} merged-allure-results/ \\;
                            find allure-results/ -type f -name '*.xml' -exec cp {} merged-allure-results/ \\;
                            find allure-results/ -type f -name '*.txt' -exec cp {} merged-allure-results/ \\;
                            cp allure-results/environment.properties merged-allure-results/ || true
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