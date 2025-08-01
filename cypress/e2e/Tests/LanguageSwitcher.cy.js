import LanguageSwitcherPage from '../Pages/LanguageSwitcherPage';

describe('Language Switcher Tests', () => {

  it('should switch to Hindi', () => {
    cy.visit(Cypress.env('baseUrl'));
    LanguageSwitcherPage.openLanguageDropdown();
    LanguageSwitcherPage.selectHindi();
    cy.url().should('include', 'hi/'); // Add assertion for Hindi language change
  });

  it('should switch to Telugu', () => {
    cy.visit(Cypress.env('baseUrl'));
    LanguageSwitcherPage.openLanguageDropdown();
    LanguageSwitcherPage.selectTelugu();
    cy.url().should('include', 'te/'); // Add assertion for Telugu language change
  });

  it('should switch to Tamil', () => {
    cy.visit(Cypress.env('baseUrl'));
    LanguageSwitcherPage.openLanguageDropdown();
    LanguageSwitcherPage.selectTamil();
    cy.url().should('include', 'ta/'); // Add assertion for Tamil language change
  });

  it('should switch to Marathi', () => {
    cy.visit(Cypress.env('baseUrl'));
    LanguageSwitcherPage.openLanguageDropdown();
    LanguageSwitcherPage.selectMarathi();
    cy.url().should('include', 'mr/'); // Add assertion for Marathi language change
  });

});