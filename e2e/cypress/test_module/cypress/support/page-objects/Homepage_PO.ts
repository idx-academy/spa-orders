/// <reference types="cypress" />

import Base_PO from "./Base_PO";

class Homepage_PO extends Base_PO {
  navigateHomePage() {
    super.navigate("");
  }

  clickOnShopAllButton() {
    cy.clickAndOpenLink_InSameTab('[data-testid="menu-item"]:first', '[data-cy="header-menu"]');
  }

  clickOnSignInPageButton() {
    cy.clickAndOpenLink_InSameTab('[data-cy="header-signin-button"]');
  }
}

export default Homepage_PO;
