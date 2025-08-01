class SeoElementsPage {

  //======================== 🔍 Locators =======================//

  elements = {
    h1: () => cy.get('h1'),
    h2s: () => cy.get('h2'),
    h3s: () => cy.get('h3'),
    metaDescription: () => cy.get("meta[name='description']"),
    metaKeywords: () => cy.get("meta[name='keywords']"),
    breadcrumbItems: () => cy.get("ul.breadcrumbs-main.mb-0 li"),
  };

  // ======================== ✅ Actions =======================//

  getH1Text() {
    return this.elements.h1().invoke('text').then(text => text.trim());
  }

  getH2Texts() {
    return this.elements.h2s().then($els =>
      Cypress._.map($els, el => el.innerText.trim().replace(/\s+/g, ' '))
    );
  }

  getH3Texts() {
    return this.elements.h3s().then($els =>
      Cypress._.map($els, el => el.innerText.trim().replace(/\s+/g, ' '))
    );
  }

  getMetaTitle() {
    return cy.title().then(title => title.trim());
  }

  getMetaDescription() {
    return this.elements.metaDescription().invoke('attr', 'content').then(text => text.trim());
  }

  getMetaKeywords() {
    return this.elements.metaKeywords().invoke('attr', 'content').then(text => text.trim());
  }

  getBreadcrumbText() {
    return this.elements.breadcrumbItems().then($items =>
      Cypress._.map($items, el => el.innerText.trim()).join(' > ')
    );
  }

  getCurrentUrl() {
    return cy.url();
  }
}

export default new SeoElementsPage();