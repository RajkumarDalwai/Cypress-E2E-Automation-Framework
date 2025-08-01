class LanguageSwitcherPage {

  //======================== 🔍 Locators =======================//

  elements = {
    languageDropdownButton: () => cy.get('#lang-mobile-btn'),
    hindiOption: () => cy.get('.checkLang_hi'),
    teluguOption: () => cy.get("a[hreflang='te']"),
    tamilOption: () => cy.contains('a', 'Tamil'),
    marathiOption: () => cy.contains('a', 'Marathi'),
  };

  // ======================== ✅ Actions =======================//

  openLanguageDropdown() {
    this.elements.languageDropdownButton().click();
  }

  selectHindi() {
    this.elements.hindiOption().click();
  }

  selectTelugu() {
    this.elements.teluguOption().click();
  }

  selectTamil() {
    this.elements.tamilOption().click();
  }

  selectMarathi() {
    this.elements.marathiOption().click();
  }
}

export default new LanguageSwitcherPage();