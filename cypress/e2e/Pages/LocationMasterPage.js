class LocationMasterPage {
  // ======================== 🔍 Locators ======================= //
  elements = {
    stateDropdown: () => cy.get('#states', { timeout: 10000 }),
    usedStateDropdown: () => cy.get('#state_id', { timeout: 10000 }), // Added for used page
    imagestateDropdownOptions: () => cy.get('#states', { timeout: 10000 }).first(),
    tyreDropdownOptions: () => cy.get('#statesid2', { timeout: 10000 }),
    flashPopupStateOptions: () => cy.get('#statesflashPopupModal', { timeout: 10000 }),
    popupCloseIcon: () => cy.get('.cross', { timeout: 10000 }),
    flashPopupIcon: () => cy.get('.filter-img1', { timeout: 10000 }),
    secondNewTractorCard: () => cy.get("#popularnew .section-css-slider > :nth-child(2) .card_initiate"),
    secondBrandTractorCard: () => cy.get('#budget1 > .section-css-slider > :nth-child(2) > .product-card-main > .product-card-anchor > .card_initiate'),
    firstTyreCard: () => cy.get(".new-equipment-card-anchor > .new-equipment-anchor").first(),
    firstImageGalleryThumb: () => cy.get(":nth-child(1) > .setCurrentIndex > .imageNew-inner > .cursor"),
    firstTractorCard: () => cy.get(":nth-child(1) > .product-card-main > .product-card-anchor > .card_initiate"),
    imageGalleryConfirmButton: () => cy.get('#modal-image-gallery-grid > .modal-dialog > .modal-content > .modal-body > .checkBtn'),
    pdpFlashPopupTrigger: () => cy.get("div[class='modal-body'] span[title='ऑन रोड प्राइस']"),
    newsTractorCard: () => cy.get(':nth-child(1) > .product-card-main > .product-card-anchor > .card_initiate'),
    emiCalcTractorCard: () => cy.get(':nth-child(1) > .product-card-main > .product-card-anchor > .card_initiate'),
    tractorListingModalTrigger: () => cy.get(':nth-child(1) > .product-card-main > .product-card-anchor > .card_initiate'),
  };

  // ======================== ✅ Actions ======================= //

  closePopupIfPresent() {
    cy.get('body').then($body => {
      if ($body.find('.cross:visible').length) {
        this.elements.popupCloseIcon().click({ force: true });
      }
    });
  }

  closeflashPopupIcon() {
    cy.get('body').then($body => {
      if ($body.find('.filter-img1:visible').length) {
        this.elements.flashPopupIcon().click({ force: true });
      }
    });
  }

  getDropdownOptionCount(optionsSelector) {
    return optionsSelector().find('option').then($options => {
      // Log all options for debugging
      const optionsText = $options.toArray().map(el => el.textContent.trim());
      cy.log(`Dropdown Options for ${optionsSelector.name}: ${JSON.stringify(optionsText)}`);
      // Log the first option for reference
      const firstOption = $options.first().text().trim();
      cy.log(`First Option (Skipped as Placeholder): ${firstOption}`);
      // Always skip the first option, assuming it's a placeholder
      return cy.wrap($options.length - 1);
    });
  }

  getStateOptionsByPageType(pageType) {
    switch (pageType) {
      case 'tyres':
        return this.elements.tyreDropdownOptions;
      case 'Listing Flash Popup':
        return this.elements.flashPopupStateOptions;
      case 'PDP Images':
        return this.elements.imagestateDropdownOptions;
      case 'used':
        return this.elements.usedStateDropdown; // Use #state_id for used page
      default:
        return this.elements.stateDropdown;
    }
  }

  performPageAction(pageType) {
    switch (pageType) {
      case 'home':
        this.elements.secondNewTractorCard().should('be.visible').click();
        break;

      case 'allBrands':
        this.elements.secondBrandTractorCard().should('be.visible').click();
        break;

      case 'tractorListing':
        this.closeflashPopupIcon();
        this.elements.tractorListingModalTrigger().click({ force: true });
        break;

      case 'tyres':
        this.elements.firstTyreCard().should('be.visible').click();
        break;

      case 'PDP Images':
        cy.scrollTo('bottom', { duration: 3000 });
        cy.wait(1000);
        cy.get('.cross', { timeout: 15000 }).should('be.visible').click();
        cy.wait(1000);
        this.elements.firstImageGalleryThumb().click();
        this.elements.imageGalleryConfirmButton().click();
        break;

      case 'PDP Flash Popup':
        cy.scrollTo('bottom');
        this.elements.pdpFlashPopupTrigger().should('be.visible', { timeout: 10000 });
        this.elements.pdpFlashPopupTrigger().click();
        break;

      case 'News Detail Page':
        this.elements.newsTractorCard().should('be.visible').click();
        break;

      case 'emiCalc':
        this.elements.emiCalcTractorCard().should('be.visible').click();
        break;

      case 'used':
        // Ensure the state dropdown is visible (no specific action required as per test spec)
        cy.log('Verifying state dropdown visibility for used page');
        this.elements.usedStateDropdown().should('be.visible', { timeout: 10000 });
        break;

      case 'Listing Flash Popup':
        cy.wait(1000);
        cy.scrollTo('bottom', { duration: 3000 });
        break;

      default:
        throw new Error(`❌ Unknown pageType: ${pageType}`);
    }
  }
}

export default new LocationMasterPage();