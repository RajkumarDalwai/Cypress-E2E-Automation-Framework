import '../../../cypress/support/seocommands';

let seoElements;

before(() => {
  cy.fixture('Test-Data/SEO-Elements/StateSubsidyPage.json').then((data) => {
    seoElements = data;
  });
});

['en', 'hi', 'te', 'ta', 'mr'].forEach((lang) => {

  describe(`SEO Validations for State Subsidy Page - Language: ${lang.toUpperCase()}`, () => {
    beforeEach(() => {
      cy.then(() => {
        cy.visit(Cypress.env('baseUrl') + seoElements[lang].url);
      });
    });

    it('1. Validate H1 Tag', () => {
      cy.then(() => {
        cy.validateH1(seoElements[lang].h1);
      });
    });

    it('2. Validate H2 Tags', () => {
      cy.then(() => {
        cy.validateH2s(seoElements[lang].h2s);
      });
    });

    it('3. Validate H3 Tags', () => {
      cy.then(() => {
        cy.validateH3s(seoElements[lang].h3s);
      });
    });

    it('4. Validate Meta Title', () => {
      cy.then(() => {
        cy.validateMetaTitle(seoElements[lang].meta.title);
      });
    });

    it('5. Validate Meta Description', () => {
      cy.then(() => {
        cy.validateMetaDescription(seoElements[lang].meta.description);
      });
    });

    it('6. Validate Meta Keywords', () => {
      cy.then(() => {
        cy.validateMetaKeywords(seoElements[lang].meta.keywords);
      });
    });

    it('7. Validate Breadcrumb Structure', () => {
      cy.then(() => {
        cy.validateBreadcrumb(seoElements[lang].breadcrumb);
      });
    });

    it('8. Validate URL Structure', () => {
      cy.then(() => {
        cy.validateUrlStructure(seoElements[lang].url);
      });
    });
    
  });
});
