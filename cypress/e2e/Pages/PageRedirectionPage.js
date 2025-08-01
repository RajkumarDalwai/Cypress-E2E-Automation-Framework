class PageRedirectionPage {

  //======================== 🔍 Locators =======================//

  static headerLinksSelector = '.headerMain.newmain-header a';
  static footerLinksSelector = "footer.footer-main a[href]:not([href='#'])";
  static commonPageLinksSelector = "a:not(.headerMain a):not(footer a)";

}

export default PageRedirectionPage;