// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//=========================== 🔧 Custom Commands : New Tractor Lead Form ============================//
import 'cypress-file-upload';
const XLSX = require('xlsx');
import LeadFormPage from '../e2e/Pages/LeadFormPage';

Cypress.Commands.add('submitNewTractorLeadForm', (index = 0) => {
  cy.fixture('Test-Data/Lead-Test-Data/TestData.json').then((testData) => {
    const dataSet = testData.NewTractorTestData[index];

    // Fill form fields using LeadFormPage actions
    LeadFormPage.fillCtpName('Testqa');
    LeadFormPage.fillCtpMobile(dataSet.mobile);
    LeadFormPage.selectCtpState(dataSet.state);
    LeadFormPage.selectCtpDistrict(dataSet.district);
    LeadFormPage.selectCtpTehsil(dataSet.tehsil);
    LeadFormPage.clickCtpMainCTAButton();

    // Close OTP popup if present
    cy.get('body').then(($body) => {
      if ($body.find('#VerifyMobileNumber > .modal-dialog > .modal-content').length > 0) {
        cy.get('#VerifyMobileNumber > .modal-dialog > .modal-content > .close > .filter-img').click();
      } else {
        cy.log('OTP popup did not appear.');
      }
    });

    // Submit final CTA
    LeadFormPage.elements.ctaReceiveSimilarOffers()
      .should('be.visible', { timeout: 20000 })
      .click();

    // Validate toast message
    LeadFormPage.elements.finalValidationToast()
      .should('contain.text', 'Thank you for submitting your request');
  });
});

// =========================🔧 Custom Commands : To close Flash Popup ========================================//

Cypress.Commands.add('closeFlashPopupIfPresent', () => {
  cy.scrollTo('bottom', { duration: 1000 }); // Scroll down by 1000px
  cy.get('body').then($body => {
    if ($body.find('#flashPopupModal:visible').length > 0) {
      cy.get('.filter-img1').click({ force: true });
      cy.log('Flash popup was present and closed.');
    } else {
      cy.log('Flash popup not present.');
    }
  });
});

// =========================🔧 Custom Commands : To close PDP Flash Popup ========================================//

Cypress.Commands.add('closePDPFlashPopupIfPresent', () => {
  cy.scrollTo(0, 2000, { duration: 1000 }); // Scroll down by 1000px
  cy.get('body').then($body => {
    if ($body.find('.list-content > .modal-body:visible').length > 0) {
      cy.get('.cross').click({ force: true });
      cy.log('Flash popup was present and closed.');
    } else {
      cy.log('Flash popup not present.');
    }
  });
});

//==================================== 🔧 Custom Commands : Validate State Dropdown Options ============================//

import LocationMasterPage from '../e2e/Pages/LocationMasterPage';

Cypress.Commands.add('validateStateDropdown', (url, language, stateData, pageType) => {
  // Validate inputs
  if (!url || url === 'undefined' || url.includes('undefined')) {
    throw new Error(`Invalid URL provided: "${url}". Please ensure Cypress.env('baseUrl') is set correctly.`);
  }
  if (!stateData || !Array.isArray(stateData) || stateData.length === 0) {
    throw new Error('Invalid stateData: Must be a non-empty array.');
  }
  if (!language || !stateData[0][language]) {
    throw new Error(`Invalid language: "${language}". Ensure it exists in stateData.`);
  }

  const locationPage = LocationMasterPage;

  // Visit the page and ensure it loads
  cy.visit(url).then(() => {
    cy.get('body').should('be.visible');
  });

  // Trigger page-specific action
  locationPage.performPageAction(pageType);

  // Get locator for dropdown options
  const stateOptionsLocator = locationPage.getStateOptionsByPageType(pageType);

  // Wait for dropdown to be visible
  stateOptionsLocator().should('be.visible');

  // Get expected states
  const expectedStates = stateData.map(state => state[language].trim());

  // Log expected states for comparison
  cy.log(`Expected States for ${pageType} (${language}): ${JSON.stringify(expectedStates)}`);

  // Validate the number of non-placeholder options
  stateOptionsLocator()
    .find('option')
    .not(':first')
    .should('have.length', expectedStates.length);

  // Validate each option
  let orderMismatches = [];
  let spellingMismatches = [];

  stateOptionsLocator()
    .find('option')
    .not(':first')
    .each(($option, index) => {
      const actual = $option.text().trim();
      const expected = expectedStates[index];

      if (actual !== expected) {
        if (expectedStates.includes(actual)) {
          orderMismatches.push({ index, actual, expected });
        } else {
          spellingMismatches.push({ index, actual, expected });
        }
      }
    })
    .then(() => {
      if (orderMismatches.length) {
        cy.log('❌ Order Mismatched States:');
        orderMismatches.forEach(mismatch => {
          const msg = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
          cy.log(msg);
          console.error(msg);
        });
        throw new Error(
          `State validation failed due to order mismatches for "${pageType}" in ${language}:\n` +
          orderMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
        );
      }

      if (spellingMismatches.length) {
        cy.log('❌ Spelling Mismatched States:');
        spellingMismatches.forEach(mismatch => {
          const msg = `Index: ${mismatch.index}, Expected: ${mismatch.expected}, Actual: ${mismatch.actual}`;
          cy.log(msg);
          console.error(msg);
        });
        throw new Error(
          `State validation failed due to spelling mismatches for "${pageType}" in ${language}:\n` +
          spellingMismatches.map(m => `Index: ${m.index}, Expected: ${m.expected}, Actual: ${m.actual}`).join('\n')
        );
      }

      cy.log(`✅ All states are matched accurately for "${pageType}" in ${language}!`);
    });

  // Validate option count
  locationPage.getDropdownOptionCount(stateOptionsLocator).then((actualCount) => {
    expect(actualCount).to.eq(
      expectedStates.length,
      `Expected ${expectedStates.length} state options for "${pageType}", but found ${actualCount}`
    );
  });
});

//-==================================== 🔧 Custom Commands : URL Validation ============================//

Cypress.Commands.add('validateAllLinks', (locator) => {
    const failedUrls = {
        notFound: new Set(),
        serverError: new Set(),
        timeout: new Set(),
    };
    let successCount = 0;

    cy.get(locator).each(($el) => {
        const href = $el.prop('href');
        if (href && href.startsWith('http')) {
            cy.request({
                url: href,
                failOnStatusCode: false,
                timeout: 20000,
            }).then((response) => {
                if (response.status === 404) {
                    failedUrls.notFound.add(href);
                } else if (response.status >= 500) {
                    failedUrls.serverError.add(href);
                } else {
                    successCount++;
                }
            });
        } else {
            cy.log(`Skipping invalid URL: ${href}`);
        }
    });

    cy.then(() => {
        const logResults = (label, urls, emoji) => {
            if (urls.size > 0) {
                cy.log(`${emoji} ${label}: ${urls.size} URLs`);
                urls.forEach((url) => cy.log(url));
            }
        };

        logResults('404 Pages', failedUrls.notFound, '❌');
        logResults('500 Pages', failedUrls.serverError, '❌');
        cy.log(`✅ Successfully validated links: ${successCount}`);
    });
});


