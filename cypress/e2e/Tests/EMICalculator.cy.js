import EMICalculatorPage from '../Pages/EMICalculatorPage';

describe('EMI Calculator Tests', () => {

  it('should calculate EMI for first brand and model', () => {

    cy.visit(Cypress.env('baseUrl') + 'tractor-loan-emi-calculator/');
    EMICalculatorPage.selectBrand();
    EMICalculatorPage.clickFirstBrand();
    EMICalculatorPage.clickFirstModel();
    EMICalculatorPage.clickCalculateEMI();
    EMICalculatorPage.getMonthlyEMI().should('equal', '₹ 22,795');
    EMICalculatorPage.getLoanAmount().should('equal', '₹ 9,58,185');
    EMICalculatorPage.getTotalPayable().should('equal', '₹ 13,67,709');
  });

});