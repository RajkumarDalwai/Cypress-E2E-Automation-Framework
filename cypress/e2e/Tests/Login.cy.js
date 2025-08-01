import LoginPage from '../Pages/LoginPage';

describe('Login Tests', () => {

  it('Login with Password', () => {
    cy.visit(Cypress.env('baseUrl')+'login/');
    LoginPage.loginWithPassword('rajkumardalwai@tractorjunction.com', '9730535423');
    cy.get('.new-btn').should('contain', 'Testqa');

  });

});
