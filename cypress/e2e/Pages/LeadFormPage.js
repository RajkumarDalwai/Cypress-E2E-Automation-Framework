class LeadFormPage {

  //======================== 🔍 Locators =======================//

  elements = {
    // New Tractor Lead Form CTAs
    ctpHpTractorsIn2025: () => cy.get("#popularnew > .section-css-slider > :nth-child(2) .card_initiate"),
    ctpHpTractorsByBudget: () => cy.get("#budget3 > .section-css-slider > :nth-child(2) .card_initiate"),
    ctpHpMiniTractors: () => cy.get(".container-mid > .section-css-slider > :nth-child(2) .card_initiate"),
    ctpLpNewTractors1: () => cy.get(":nth-child(6) > .product-card-main > .product-card-anchor > .card_initiate"),
    ctpLpNewTractors2: () => cy.get(":nth-child(6) > .product-card-main > .product-card-anchor > .card_initiate"),
    ctpPdpNtHeroSection: () => cy.get(".cta-wrapper > .submitBtnNew"),
    ctpEMIPage: () => cy.get(':nth-child(1) > .product-card-main > .product-card-anchor > .card_initiate'),

    // New Tractor Lead Form Fields
    ctpNameInput: () => cy.get("#GetOnRoadPrice > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(1) > .form-control").first(),
    ctpMobileInput: () => cy.get(".modal.show > .modal-dialog > .modal-content > .customModal-body > #tractor_submit_form > .row > :nth-child(2) > .form-control"),
    ctpStateDropdown: () => cy.get("#states"),
    ctpDistrictDropdown: () => cy.get("#gorp_form_dist_id"),
    ctpTehsilDropdown: () => cy.get("#gorp_form_village_id"),
    ctpMainCTAButton: () => cy.get("div#GetOnRoadPrice button.tractor_submit.fillBtn.w-100.text-white.boldfont.flashpopup.CTP-card").first(),
    ctaReceiveSimilarOffers: () => cy.get("#recom-form > .modal-footer > .btn"),
    finalValidationToast: () => cy.get(".ssss"),

    // Sell Used Tractor
    sutLocationInput: () => cy.get("#locationPlaceholder"),
    sutLocationSuggestion: () => cy.get("#locations > li > a"),
    sutUserName: () => cy.get("#userName"),
    sutUserMobile: () => cy.get("#userMobile"),
    sutSubmitBtn1: () => cy.get(".form-sell-btn2"),
    sutBrandDropdown: () => cy.get("#tractorBrand"),
    sutModelDropdown: () => cy.get("#tractorModal"),
    sutYearDropdown: () => cy.get("#tractorYear"),
    sutStep1Continue: () => cy.get("#step1 button.default-btn"),
    sutEngineCondition: () => cy.get("#tractorEnginConditions"),
    sutTyreCondition: () => cy.get("#tractorTyreConditions"),
    sutEngineHours: () => cy.get("#tractorEngineHours"),
    sutStep2Continue: () => cy.get("button[data-step='TRACTOR_CONDITION']"),
    sutImage1: () => cy.get("#image1"),
    sutImage2: () => cy.get("#image2"),
    sutStep3Continue: () => cy.get("#step3 button.default-btn"),
    sutFinalSubmit: () => cy.get("#dealbtn"),
    sutThankModalClose: () => cy.get(".thankModal-img"),
    sutCloseModal: () => cy.get(".close-request"),

    // Sell Used Implements
    suiCategoryDropdown: () => cy.get(".col-12 > .form-group > .form-control"),
    suiBrandDropdown: () => cy.get(":nth-child(2) > .form-group > .form-control"),
    suiModelName: () => cy.get("#model_name"),
    suiYearDropdown: () => cy.get(":nth-child(4) > .form-group > .form-control"),
    suiContinue1: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    suiOwnerName: () => cy.get(".col-12 > .form-group > .form-control"),
    suiPriceInput: () => cy.get(".input-group > .form-control"),
    suiDescription: () => cy.get(".row > :nth-child(3) > .form-group > .form-control"),
    suiContinue2: () => cy.get(".ng-scope > .form-submit-btn"),
    suiImage1: () => cy.get("#fileField0"),
    suiImage2: () => cy.get("#fileField1"),
    suiContinue3: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    suiContactName: () => cy.get(".row > :nth-child(1) > .form-group > .form-control"),
    suiContactMobile: () => cy.get(":nth-child(2) > .form-group > .form-control"),
    suiStateDropdown: () => cy.get(".row > :nth-child(3) > .form-group > .form-control"),
    suiDistrictDropdown: () => cy.get(":nth-child(4) > .form-group > .form-control"),
    suiTehsilDropdown: () => cy.get(":nth-child(5) > .form-group > .form-control"),
    suiPincodeInput: () => cy.get(".row > :nth-child(6) > .form-group > .form-control"),
    suiFinalSubmit: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    successToast: () => cy.get('.ssss'),

    // Sell Used Harvester
    suhBrandInput: () => cy.get("select[name='brand_id']"),
    suhModelName: () => cy.get("input[placeholder='Enter Your Model Name']"),
    suhCropType: () => cy.get(".row > :nth-child(3) > .form-group > .form-control"),
    suhCuttingWidth: () => cy.get(":nth-child(4) > .form-group > .form-control"),
    suhDriveType: () => cy.get(":nth-child(5) > .form-group > .form-control"),
    suhBrandDropdown: () => cy.get(".col-12 > .form-group > .form-control"),
    suhContinue1: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    suhOwnerName: () => cy.get(".col-12 > .form-group > .form-control"),
    suhEngineHours: () => cy.get(":nth-child(2) > .form-group > .form-control"),
    suhYearDropdown: () => cy.get(".row > :nth-child(3) > .form-group > .form-control"),
    suhPriceInput: () => cy.get(".input-group > .form-control"),
    suhDescription: () => cy.get(":nth-child(5) > .form-group > .form-control"),
    suhImage1: () => cy.get("#fileField0"),
    suhImage2: () => cy.get("#fileField1"),
    suhContinue2: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    suhContinue3: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    suhContactName: () => cy.get(".row > :nth-child(1) > .form-group > .form-control"),
    suhContactMobile: () => cy.get(":nth-child(2) > .form-group > .form-control"),
    suhStateDropdown: () => cy.get(".row > :nth-child(3) > .form-group > .form-control"),
    suhDistrictDropdown: () => cy.get(":nth-child(4) > .form-group > .form-control"),
    suhTehsilDropdown: () => cy.get(":nth-child(5) > .form-group > .form-control"),
    suhPincodeInput: () => cy.get(".row > :nth-child(6) > .form-group > .form-control"),
    suhFinalSubmit: () => cy.get("fieldset.ng-scope > .form-submit-btn"),
    successToast: () => cy.get('.ssss')
  };

  // ======================== ✅ New Tractor Actions =======================//

  clickCtpHpTractorsIn2025() {
    this.elements.ctpHpTractorsIn2025().click();
  }

  clickCtpHpTractorsByBudget() {
    this.elements.ctpHpTractorsByBudget().click();
  }

  clickCtpHpMiniTractors() {
    this.elements.ctpHpMiniTractors().click();
  }

  clickCtpLpNewTractors1() {
    this.elements.ctpLpNewTractors1().click();
  }

  clickCtpLpNewTractors2() {
    this.elements.ctpLpNewTractors2().click();  
  }

  clickCtpPdpNtHeroSection() {
    this.elements.ctpPdpNtHeroSection().click();
  }

  clickCtpEMIPage() {
    this.elements.ctpEMIPage().click();
  } 

  //========================= 🔧 Form Actions ==================================//

  fillCtpName(name) {
    this.elements.ctpNameInput().type(name);
  }

  fillCtpMobile(mobile) {
    this.elements.ctpMobileInput().type(mobile);
  }

  selectCtpState(state) {
    this.elements.ctpStateDropdown().select(state);
  }

  selectCtpDistrict(district) {
    this.elements.ctpDistrictDropdown().select(district);
  }

  selectCtpTehsil(tehsil) {
    this.elements.ctpTehsilDropdown().select(tehsil);
  }

  clickCtpMainCTAButton() {
    this.elements.ctpMainCTAButton().click();
  }

  //========================= ✅ Sell Used Tractor Actions =======================//

  fillSutLocation(location) {
    this.elements.sutLocationInput().type(location);
  }

  selectSutLocationSuggestion() {
    this.elements.sutLocationSuggestion().click();
  }

  fillSutUserName(name) {
    this.elements.sutUserName().type(name);
  }

  fillSutUserMobile(mobile) {
    this.elements.sutUserMobile().type(mobile);
  }

  clickSutSubmitBtn1() {
    this.elements.sutSubmitBtn1().click();
  }

  selectSutBrand(brand) {
    this.elements.sutBrandDropdown().select(brand);
  }

  selectSutModel(model) {
    this.elements.sutModelDropdown().select(model);
  }

  selectSutYear(year) {
    this.elements.sutYearDropdown().select(year);
  }

  clickSutStep1Continue() {
    this.elements.sutStep1Continue().click();
  }

  selectSutEngineCondition(condition) {
    this.elements.sutEngineCondition().select(condition);
  }

  selectSutTyreCondition(condition) {
    this.elements.sutTyreCondition().select(condition);
  }

  fillSutEngineHours(hours) {
    this.elements.sutEngineHours().select(hours);
  }

  clickSutStep2Continue() {
    this.elements.sutStep2Continue().click();
  }

  uploadSutImage1(filePath) {
    this.elements.sutImage1().attachFile(filePath);
  }

  uploadSutImage2(filePath) {
    this.elements.sutImage2().attachFile(filePath);
  }

  clickSutStep3Continue() {
    this.elements.sutStep3Continue().click();
  }

  clickSutFinalSubmit() {
    this.elements.sutFinalSubmit().click();
  }

  closeSutThankModal() {
    this.elements.sutThankModalClose().click();
  }

  closeSutModal() {
    this.elements.sutCloseModal().click();
  }

  //========================= ✅ Sell Used Implements Actions =======================//

  selectSuiCategory(category) {
    this.elements.suiCategoryDropdown().select(category);
  }

  selectSuiBrand(brand) {
    this.elements.suiBrandDropdown().select(brand);
  }

  fillSuiModelName(modelName) {
    this.elements.suiModelName().type(modelName);
  }

  selectSuiYear(year) {
    this.elements.suiYearDropdown().select(year);
  }

  clickSuiContinue1() {
    this.elements.suiContinue1().click();
  }

  fillSuiOwnerName(ownerName) {
    this.elements.suiOwnerName().type(ownerName);
  }

  fillSuiPrice(price) {
    this.elements.suiPriceInput().type(price);
  }

  fillSuiDescription(description) {
    this.elements.suiDescription().type(description);
  }

  clickSuiContinue2() {
    this.elements.suiContinue2().click();
  }

  uploadSuiImage1(filePath) {
    this.elements.suiImage1().attachFile(filePath);
  }

  uploadSuiImage2(filePath) {
    this.elements.suiImage2().attachFile(filePath);
  }

  clickSuiContinue3() {
    this.elements.suiContinue3().click();
  }

  fillSuiContactName(contactName) {
    this.elements.suiContactName().type(contactName);
  }

  fillSuiContactMobile(contactMobile) {
    this.elements.suiContactMobile().type(contactMobile);
  }

  selectSuiState(state) {
    this.elements.suiStateDropdown().select(state);
  }

  selectSuiDistrict(district) {
    this.elements.suiDistrictDropdown().select(district);
  }

  selectSuiTehsil(tehsil) {
    this.elements.suiTehsilDropdown().select(tehsil);
  }

  fillSuiPincode(pincode) {
    this.elements.suiPincodeInput().type(pincode);
  }

  clickSuiFinalSubmit() {
    this.elements.suiFinalSubmit().click();
  }

  //========================= ✅ Sell Used Harvester Actions =======================//

  fillSuhBrand(brand) {
    this.elements.suhBrandInput().select(brand);
  }

  fillSuhModelName(modelName) {
    this.elements.suhModelName().type(modelName);
  }

  fillSuhCropType(cropType) {
    this.elements.suhCropType().select(cropType);
  }

  fillSuhCuttingWidth(width) {
    this.elements.suhCuttingWidth().select(width);
  }

  fillSuhDriveType(driveType) {
    this.elements.suhDriveType().select(driveType);
  }

  selectSuhBrand(brand) {
    this.elements.suhBrandDropdown().select(brand);
  }

  clickSuhContinue1() {
    this.elements.suhContinue1().click();
  }

  fillSuhOwnerName(ownerName) {
    this.elements.suhOwnerName().type(ownerName);
  }

  fillSuhEngineHours(hours) {
    this.elements.suhEngineHours().select(hours);
  }

  selectSuhYear(year) {
    this.elements.suhYearDropdown().select(year);
  }

  fillSuhPrice(price) {
    this.elements.suhPriceInput().type(price);
  }

  fillSuhDescription(description) {
    this.elements.suhDescription().type(description);
  }

  uploadSuhImage1(filePath) {
    this.elements.suhImage1().attachFile(filePath);
  }

  uploadSuhImage2(filePath) {
    this.elements.suhImage2().attachFile(filePath);
  }

  clickSuhContinue2() {
    this.elements.suhContinue2().click();
  }

  clickSuhContinue3() {
    this.elements.suhContinue3().click();
  }

  fillSuhContactName(contactName) {
    this.elements.suhContactName().type(contactName);
  }

  fillSuhContactMobile(contactMobile) {
    this.elements.suhContactMobile().type(contactMobile);
  }

  selectSuhState(state) {
    this.elements.suhStateDropdown().select(state);
  }

  selectSuhDistrict(district) {
    this.elements.suhDistrictDropdown().select(district);
  }

  selectSuhTehsil(tehsil) {
    this.elements.suhTehsilDropdown().select(tehsil);
  }

  fillSuhPincode(pincode) {
    this.elements.suhPincodeInput().type(pincode);
  }

  clickSuhFinalSubmit() {
    this.elements.suhFinalSubmit().click();
  }

  getSuccessToast() {
    return this.elements.successToast();
  }

}

export default new LeadFormPage();