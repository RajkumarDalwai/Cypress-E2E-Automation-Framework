describe('Multilingual State Validation', () => {
  let stateData;

  before(() => {
    cy.fixture('Test-Data/State-Data/MultilingualStates.json').then((data) => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid fixture data: MultilingualStates.json must be a non-empty array.');
      }
      stateData = data;
    });
  });

  beforeEach(() => {
    // Ensure baseUrl is set
    if (!Cypress.env('baseUrl')) {
      throw new Error('Cypress.env("baseUrl") is not set. Please configure it in cypress.config.js.');
    }
  });

  it('1. Validate States on Home Page (EN)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}`, 'english', stateData, 'home');
  }); 

  it('2. Validate States on All Brands Page (HI)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}hi/all-brands/`, 'hindi', stateData, 'allBrands');
  }); 

  it('3. Validate States on Tractor Listing Page (TE)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}te/tractors/`, 'telugu', stateData, 'tractorListing');
  }); 

  it('4. Validate States on Used Tractor Page (TA)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}ta/buy-used-tractor/`, 'tamil', stateData, 'used');
  }); 

  it('5. Validate States on Tyres Page (MR)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}mr/tyres/`, 'marathi', stateData, 'tyres');
  }); 

  it('6. Validate States on PDP with Images (EN)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}mahindra-tractor/575-di-xp-plus/`, 'english', stateData, 'PDP Images');
  }); 

  it('7. Validate States on PDP with Flash Popup (HI)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}hi/mahindra-tractor/575-di-xp-plus/`, 'hindi', stateData, 'PDP Flash Popup');
  }); 

  it('8. Validate States on Listing with Flash Popup (TE)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}te/tractors/`, 'telugu', stateData, 'Listing Flash Popup');
  }); 

 it('9. Validate States on News Detail Page (EN)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}tractor-news/madras-hc-grants-status-quo-on-massey-ferguson-brand/`, 'english', stateData, 'News Detail Page');
  });

  it('10. Validate States on EMI Calculator Page (EN)', () => {
    cy.validateStateDropdown(`${Cypress.env('baseUrl')}tractor-loan-emi-calculator/`, 'english', stateData, 'emiCalc');
  });
  
});