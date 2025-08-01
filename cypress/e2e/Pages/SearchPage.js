class SearchPage {

  //======================== 🔍 Locators =======================//

  elements = {
    searchField: () => cy.get('#serachInt_fields'),
    searchBox: () => cy.get('#searchBox'),
    headingElement: () => cy.get('h1'),
    noSuggestionsSpan: () => cy.get('#messageBoxInner'),
  };

  // ======================== ✅ Actions =======================//

  clickSearchField() {
    this.elements.searchField().click();
  }

  enterIntoSearchBox(keywords) {
    this.elements.searchBox().type(keywords);
  }

  typeIntoSearchField(text) {
    this.elements.searchField().type(text);
  }

  getSearchHeadingText() {
    return this.elements.headingElement().should('be.visible').invoke('text').then(text => text.trim());
  }

 getNoSuggestionMessage() {
  return this.elements.noSuggestionsSpan()
    .invoke('text')
    .then(text => text.trim());
  }

}

export default new SearchPage();