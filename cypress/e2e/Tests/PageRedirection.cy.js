import PageRedirectionPage from '../Pages/PageRedirectionPage';
import '../../support/commands';

describe('Page Redirection Suit', () => {
  
  // it('1. Verify Page redirections Under Header from Homepage', () => {
  //   cy.visit(Cypress.env('baseUrl'));
  //   cy.wait(2000);
  //   cy.validateAllLinks(PageRedirectionPage.headerLinksSelector);
  // });

  it('2. Verify Page redirections Under Footer from Homepage', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.footerLinksSelector);
  });

 /* it('3. Verify Page redirections for Homepage', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('4. Verify Page redirections for New Tractors Listing Page', () => {
    cy.visit(Cypress.env('baseUrl') + 'tractors/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('5. Verify Page redirections for Used Tractors Listing Page', () => {
    cy.visit(Cypress.env('baseUrl') + 'used-tractors-for-sell/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('6. Verify Page redirections for Mahindra Brand Listing pages', () => {
    cy.visit(Cypress.env('baseUrl') + 'mahindra-tractor/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('7. Verify Page redirections for New Tractors Product Detail Pages', () => {
    cy.visit(Cypress.env('baseUrl') + 'swaraj-tractor/855-fe/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('8. Verify Page redirections for All brands Page', () => {
    cy.visit(Cypress.env('baseUrl') + 'all-brands/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('9. Verify Page redirections for Compare Landing Page', () => {
    cy.visit(Cypress.env('baseUrl') + 'compare-tractors/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });

  it('10. Verify Page redirections for News Detail Page', () => {
    cy.visit(Cypress.env('baseUrl') + 'tractor-news/madras-hc-grants-status-quo-on-massey-ferguson-brand/');
    cy.wait(2000);
    cy.validateAllLinks(PageRedirectionPage.commonPageLinksSelector);
  });*/

});