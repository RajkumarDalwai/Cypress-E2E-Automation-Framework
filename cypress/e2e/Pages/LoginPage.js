class LoginPage {

  //======================== 🔍 Locators =======================//

  elements = {
    mobileField: () => cy.get('#mobile'),
    passwordField: () => cy.get('#password'),
    loginButton: () => cy.get('#loginbtn'),
  };

  // ======================== ✅ Actions =======================//

  enterMobile(mobile) {
    this.elements.mobileField().clear().type(mobile);
  }

  enterPassword(password) {
    this.elements.passwordField().clear().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  loginWithPassword(mobile, password) {
    this.enterMobile(mobile);
    this.enterPassword(password);
    this.clickLogin();
  }

}

export default new LoginPage();
