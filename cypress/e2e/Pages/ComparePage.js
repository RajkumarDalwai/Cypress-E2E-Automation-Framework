class ComparePage {

  //======================== 🔍 Locators =======================//

  elements = {
    addTractorButtons: () => cy.get("p.text-decoration-underline").contains('Add Tractor'),
    brandCards: () => cy.get(".emi-brand-wrapper.bandsItems"),
    firstModelCard: () => cy.get("span.popup-listing-brand.model0").first(),
    compareButton: () => cy.get("a[title='Compare Tractors']"),
    comparisonHeader: () => cy.get("h1"),
    otherInfoTab: () => cy.get("div.tabNEW-block.result-tabs-container.pt-2 span[title='Other Information']"),
    otherInfoSection: () => cy.get("section[id='other-content'] h3")
  };

  // ======================== ✅ Actions =======================//

  clickAddTractorSlot(index) {
    this.elements.addTractorButtons().eq(index).click();
  }

  clickBrandByIndex(index) {
    this.elements.brandCards().eq(index - 1).should('be.visible').click();
  }

  getBrandNameByIndex(index) {
    return this.elements.brandCards().eq(index - 1).invoke('text').then(text => text.trim());
  }

  clickFirstModelAndGetText() {
  return this.elements.firstModelCard()
    .invoke('text')
    .then(text => {
      return this.elements.firstModelCard().click().then(() => text.trim());
    });
 }
 
  clickCompare() {
    this.elements.compareButton().click();
  }

  getComparisonHeading() {
    return this.elements.comparisonHeader().invoke('text').then(text => text.trim());
  }
}

export default new ComparePage();