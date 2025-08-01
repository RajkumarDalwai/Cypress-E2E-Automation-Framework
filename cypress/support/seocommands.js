import SeoElementsPage from '../e2e/Pages/SeoElementsPage';

//============================SEO Element Validation Commands==================================//

Cypress.Commands.add('validateH1', (expectedText) => {
  SeoElementsPage.getH1Text().then(actualText => {
    expect(actualText).to.eq(expectedText);
  });
});

Cypress.Commands.add('validateH2s', (expectedH2s) => {
  SeoElementsPage.getH2Texts().then(actualH2s => {
    const normalize = str => str.trim().replace(/\s+/g, ' ');
    const mismatches = [];
    expectedH2s.forEach(expected => {
      const normalizedExpected = normalize(expected);
      if (!actualH2s.includes(normalizedExpected)) {
        mismatches.push(`❌ Missing H2: "${normalizedExpected}"`);
      } else {
        cy.log(`✅ Found H2: "${normalizedExpected}"`);
      }
    });
    if (mismatches.length > 0) {
      cy.log(`⚠️ Total H2 mismatches: ${mismatches.length}`);
      mismatches.forEach(msg => cy.log(msg));
      throw new Error(`H2 validation failed:\n${mismatches.join('\n')}`);
    } else {
      cy.log('✅ All H2 tags matched successfully.');
    }
  });
});

Cypress.Commands.add('validateH3s', (expectedH3s) => {
  SeoElementsPage.getH3Texts().then(actualH3s => {
    const normalize = str => str.trim().replace(/\s+/g, ' ');
    const mismatches = [];
    expectedH3s.forEach(expected => {
      const normalizedExpected = normalize(expected);
      if (!actualH3s.includes(normalizedExpected)) {
        mismatches.push(`❌ Missing H3: "${normalizedExpected}"`);
      } else {
        cy.log(`✅ Found H3: "${normalizedExpected}"`);
      }
    });
    if (mismatches.length > 0) {
      cy.log(`⚠️ Total H3 mismatches: ${mismatches.length}`);
      mismatches.forEach(msg => cy.log(msg));
      throw new Error(`H3 validation failed:\n${mismatches.join('\n')}`);
    } else {
      cy.log('✅ All H3 tags matched successfully.');
    }
  });
});

Cypress.Commands.add('validateMetaTitle', (expectedTitle) => {
  SeoElementsPage.getMetaTitle().then(actualTitle => {
    const normalize = str => str.trim().replace(/\s+/g, ' ');
    expect(normalize(actualTitle)).to.eq(normalize(expectedTitle));
  });
});

Cypress.Commands.add('validateMetaDescription', (expectedDescription) => {
  SeoElementsPage.getMetaDescription().then(actualDescription => {
    const normalize = str => str.trim().replace(/\s+/g, ' ');
    expect(normalize(actualDescription)).to.eq(normalize(expectedDescription));
  });
});

Cypress.Commands.add('validateMetaKeywords', (expectedKeywords) => {
  SeoElementsPage.getMetaKeywords().then(actual => {
    const normalize = str => str.trim().replace(/\s+/g, ' ');
    expect(normalize(actual)).to.eq(normalize(expectedKeywords));
  });
});

Cypress.Commands.add('validateBreadcrumb', (expectedBreadcrumb) => {
  SeoElementsPage.getBreadcrumbText().then(breadcrumbText => {
    expect(breadcrumbText).to.eq(expectedBreadcrumb);
  });
});

Cypress.Commands.add('validateUrlStructure', (expectedUrl) => {
  SeoElementsPage.getCurrentUrl().should('include', expectedUrl);
});