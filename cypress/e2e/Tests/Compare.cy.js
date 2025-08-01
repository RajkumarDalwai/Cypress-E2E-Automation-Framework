import ComparePage from '../Pages/ComparePage';

describe('Compare Tests', () => {

  it('Verify comparison heading is correct', () => {
    cy.visit(Cypress.env('baseUrl') + 'compare-tractors/');

    // Add first tractor
    ComparePage.clickAddTractorSlot(0);

    let brand1, model1, brand2, model2;

    ComparePage.getBrandNameByIndex(1)
      .then((brandText) => {
        brand1 = brandText;
        ComparePage.clickBrandByIndex(1);
        return ComparePage.clickFirstModelAndGetText();
      })
      .then((modelText) => {
        model1 = modelText;
        cy.log(`🚜 Model 1 Selected: ${model1}`);

        // Add second tractor
        return ComparePage.getBrandNameByIndex(2);
      })
      .then((brandText2) => {
        brand2 = brandText2;
        ComparePage.clickBrandByIndex(2);

        // Wait for the model list to update
        return ComparePage.elements.firstModelCard().should('be.visible');
      })
      .then(() => {
        return ComparePage.clickFirstModelAndGetText();
      })
      .then((modelText2) => {
        model2 = modelText2;
        cy.log(`🚜 Model 2 Selected: ${model2}`);

        // Click Compare
        ComparePage.clickCompare();

        // Get comparison heading
        return ComparePage.getComparisonHeading();
      })
      .then((actualHeading) => {
        const expectedHeading = `${brand1} ${model1} vs ${brand2} ${model2} Comparison`;

        const normalizedActual = actualHeading.replace(/\s+/g, ' ').trim();
        const normalizedExpected = expectedHeading.replace(/\s+/g, ' ').trim();

        cy.log(`✅ Expected: ${normalizedExpected}`);
        cy.log(`✅ Actual: ${normalizedActual}`);

        expect(normalizedActual).to.eq(normalizedExpected);
      });
  });

  it('Verify scroll to "Other Information" section on tab click', () => {
    cy.visit(
      Cypress.env('baseUrl') +
        'compare-tractors/mahindra+575-di-xp-plus-vs-farmtrac+60-epi-t20-powermaxx/'
    );

    // Click on the "Other Information" tab
    ComparePage.elements.otherInfoTab().should('be.visible').click();

    // Scroll and verify section is in viewport
    ComparePage.elements.otherInfoSection()
      .should('exist')
      .scrollIntoView()
      .should('be.visible')
      .then(($el) => {
        // Allow time for smooth scrolling
        cy.wait(500);

        // Check if section is within viewport
        cy.window().then((win) => {
          const rect = $el[0].getBoundingClientRect();
          const inView = rect.top >= 0 && rect.bottom <= win.innerHeight;

          cy.log(`Top: ${rect.top}, Bottom: ${rect.bottom}, Viewport Height: ${win.innerHeight}`);
          expect(inView).to.be.true;
        });
      });
  });

});
