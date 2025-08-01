class UsedTractorListingPage {

  //======================== 🔍 Locators =======================//

elements = {
priceFilterDropdown: () => cy.get("div.select-btn").contains('Price'),
priceOption_0to2Lakh: () => cy.get("ul.price_filter li").contains('0 Lakh - 2 Lakh'),
priceOption_2to3Lakh: () => cy.get("ul.price_filter li").contains('2 Lakh - 3 Lakh'),
brandFilterDropdown: () => cy.get("div.select-btn").contains('Brands'),
brandOptionMahindra: () => cy.get("label.checkbox-custom").contains('Mahindra'),
modelFilterDropdown: () => cy.get("div.select-btn").contains('Model'),
modelOption575DI: () => cy.get("label.checkbox-custom").contains('575 DI').first(),
applyFilterButton: () => cy.get('#apply_filter'),
sortByDropdown: () => cy.get("input#gCityMob"),
sortPriceLowToHigh: () => cy.get("div.citySearch-hide ul > li").contains('Price - Low to High'),
sortPriceHighToLow: () => cy.get("div.citySearch-hide ul > li").contains('Price - High to Low'),
yearFilterDropdown: () => cy.get("div.select-btn").contains('Year'),
yearOption2025: () => cy.get("label.checkbox-custom").contains('2025'),
yearOption2011: () => cy.get("label.checkbox-custom").contains('2011'),
listingTitleLinks: () => cy.get('p.used-product-name a.weblink'),
priceElements: () => cy.get('.hotDeal-tractor-price'),
yearElements: () => cy.get("span.px-2.oneline").contains('Model')
};

  // ======================== ✅ Actions =======================//

  applyPriceFilter_0to2Lakh() {
    this.elements.priceFilterDropdown().click();
    this.elements.priceOption_0to2Lakh().click({ force: true });
    this.elements.applyFilterButton().click();
  }

  applyPriceFilter_2to3Lakh() {
    this.elements.priceFilterDropdown().click();
    this.elements.priceOption_2to3Lakh().click( { force: true });
    this.elements.applyFilterButton().click();
  }

  applyBrandModelFilter_Mahindra_575DI() {
    this.elements.brandFilterDropdown().click();
    this.elements.brandOptionMahindra().click({ force: true });
    this.elements.modelFilterDropdown().click();
    this.elements.modelOption575DI().click({ force: true });
    this.elements.applyFilterButton().click();
  }

  applyBrandFilter_Mahindra() {
    this.elements.brandFilterDropdown().click();
    this.elements.brandOptionMahindra().click({ force: true });
    this.elements.applyFilterButton().click();
  }

  applyYearFilter_2025() {
    this.elements.yearFilterDropdown().click();
    this.elements.yearOption2025().click({ force: true });
    this.elements.applyFilterButton().click();
  }

  applyYearFilter_2011() {
    this.elements.yearFilterDropdown().click();
    this.elements.yearOption2011().click({ force: true });
    this.elements.applyFilterButton().click();
  }

  sortByPriceLowToHigh() {
    this.elements.sortByDropdown().click();
    this.elements.sortPriceLowToHigh().click({ force: true });
  }

  // ======================== ✅ Extraction Methods =======================//

  getAllPrices() {
    return this.elements.priceElements().then($els => {
      return Cypress._.map($els, el => {
        const fullText = el.innerText;
        let usedPrice = fullText.split('\n')[0];
        usedPrice = usedPrice.replace(/[^0-9]/g, '');
        return usedPrice ? parseInt(usedPrice) : null;
      }).filter(p => p !== null);
    });
  }

  getAllTitles() {
    return this.elements.listingTitleLinks().then($els =>
      Cypress._.map($els, el => el.innerText.trim())
    );
  }

  getAllYears() {
    return this.elements.yearElements().then($els =>
      Cypress._.map($els, el => el.innerText.trim())
    );
  }

  // ======================== ✅ Validation =======================//

  arePricesSortedLowToHigh() {
    return this.getAllPrices().then(prices => {
      for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i] > prices[i + 1]) {
          return false;
        }
      }
      return true;
    });
  }
}

export default new UsedTractorListingPage();