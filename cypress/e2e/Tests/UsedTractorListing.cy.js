import UsedTractorListingPage from '../Pages/UsedTractorListingPage';

describe('Used Tractor Listing Tests', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl') + 'assured-used-tractors-for-sell/');
  });

  it('TJWA_TC_UTL_001_verifyUsedTractorPricesIn0to2LakhRange', () => {
    UsedTractorListingPage.applyPriceFilter_0to2Lakh();
    cy.wait(2000);

    UsedTractorListingPage.getAllPrices().then(allPrices => {
      cy.log('Extracted Prices: ' + allPrices);
      allPrices.forEach(price => {
        expect(price).to.be.at.most(200000, `❌ Price is not in 0–2 Lakh range: ₹${price}`);
      });
    });
  });

  it('TJWA_TC_UTL_002_verifyBrandModelFilter_Mahindra575DI', () => {
    UsedTractorListingPage.applyBrandModelFilter_Mahindra_575DI();

    UsedTractorListingPage.getAllTitles().then(titles => {
      cy.log('📝 Titles found:');
      titles.forEach(title => cy.log(title));
      titles.forEach(title => {
        const lowerTitle = title.toLowerCase();
        expect(lowerTitle).to.contain('mahindra 575 di');
      });
    });
  }); 

  it('TJWA_TC_UTL_003_verifyYearFilter_2025', () => {
    UsedTractorListingPage.applyYearFilter_2025();

    UsedTractorListingPage.getAllYears().then(years => {
      cy.log('📅 Years found:');
      years.forEach(year => cy.log(year));
      years.forEach(year => {
        expect(year).to.contain('2025');
      });
    });
  }); 

  it('TJWA_TC_UTL_004_verifySortByLowToHighAfterPriceFilter', () => {
    UsedTractorListingPage.applyPriceFilter_0to2Lakh();
    cy.wait(3000);
    UsedTractorListingPage.sortByPriceLowToHigh();
    cy.wait(2000);

    UsedTractorListingPage.arePricesSortedLowToHigh().then(isSorted => {
      expect(isSorted).to.be.true;
    });
  }); 

  it('TJWA_TC_UTL_005_combinedFilters_2to3Lakh_Mahindra_2011_Sorted', () => {
    UsedTractorListingPage.applyPriceFilter_2to3Lakh();
    cy.wait(2000);
    UsedTractorListingPage.applyBrandFilter_Mahindra();
    cy.wait(2000);
    UsedTractorListingPage.applyYearFilter_2011();
    cy.wait(2000);
    UsedTractorListingPage.sortByPriceLowToHigh();
    cy.wait(3000);

    // ✅ Validate Price Range
    UsedTractorListingPage.getAllPrices().then(prices => {
      cy.log('Filtered Prices: ' + prices);
      prices.forEach(price => {
        expect(price).to.be.at.least(200000, `❌ Price is below 2 Lakh: ₹${price}`);
        expect(price).to.be.at.most(300000, `❌ Price is above 3 Lakh: ₹${price}`);
      });
    });

    // ✅ Validate Brand
    UsedTractorListingPage.getAllTitles().then(titles => {
      cy.log('Filtered Titles: ' + titles);
      titles.forEach(title => {
        const lowerTitle = title.toLowerCase();
        expect(lowerTitle).to.contain('mahindra', `❌ Title does not contain 'Mahindra': ${title}`);
      });
    });

    // ✅ Validate Year
    UsedTractorListingPage.getAllYears().then(years => {
      cy.log('Filtered Years: ' + years);
      years.forEach(year => {
        expect(year).to.contain('2011', `❌ Year is not 2011: ${year}`);
      });
    });
  });

});
