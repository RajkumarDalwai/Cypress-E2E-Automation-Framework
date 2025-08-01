import SearchPage from '../Pages/SearchPage';

describe('Search Tests', () => {

  it('should show heading after search', () => {
    cy.visit(Cypress.env('baseUrl'));
    SearchPage.clickSearchField();
    SearchPage.enterIntoSearchBox('Mahindra 575{enter}');
    cy.wait(2000); // Wait for search results to load
    SearchPage.getSearchHeadingText().should('contain', 'Mahindra 575');
  });

  it('should show no suggestion message for invalid input', () => {
    cy.visit(Cypress.env('baseUrl'));
    SearchPage.clickSearchField();
    SearchPage.enterIntoSearchBox('invalidinput');
    cy.wait(2000); // Wait for search results to load
    SearchPage.getNoSuggestionMessage().should('contain', 'Oops! No result found');
  }); 

});