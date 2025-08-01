class EMICalculatorPage {

  //======================== 🔍 Locators =======================//

  elements = {
    brandSelect: () => cy.get('#brandselect'),
    firstBrand: () => cy.get(".emi-brand-wrapper.bandsItems").first(),
    firstModel: () => cy.get('[data-slug="arjun-605-di-4wd"]'),
    calculateEMIButton: () => cy.get("span:contains('Calculate EMI')"),
    monthlyEMI: () => cy.get('.total_emi'),
    loanAmount: () => cy.get('#loanAmount'),
    totalPayable: () => cy.get('#totalPayable'),
  };

  // ======================== ✅ Actions =======================//

  selectBrand() {
    this.elements.brandSelect().click();
  }

  clickFirstBrand() {
    this.elements.firstBrand().should('be.visible').click();
  }

  clickFirstModel() {
    this.elements.firstModel().should('be.visible').click();
  }

  clickCalculateEMI() {
    this.elements.calculateEMIButton().click();
  }

  getMonthlyEMI() {
    return this.elements.monthlyEMI().invoke('text').then(text => text.trim());
  }

  getLoanAmount() {
    return this.elements.loanAmount().invoke('text').then(text => text.trim());
  }

  getTotalPayable() {
    return this.elements.totalPayable().invoke('text').then(text => text.trim());
  }
}

export default new EMICalculatorPage();