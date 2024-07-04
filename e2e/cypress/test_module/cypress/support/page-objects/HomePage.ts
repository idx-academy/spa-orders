/// <reference types="cypress" />

import BaseObject from "./Base";

class HomePageObject extends BaseObject {
  navigateHomePage() {
    super.navigate("");
  }

  clickOnShopAllButton() {
    cy.clickAndOpenLink('[data-testid="menu-item"]:first', '[data-cy="header-menu"]');
  }

  clickOnSignInButton() {
    cy.clickAndOpenLink('[data-cy="header-signin-button"]');
  }
}

export default HomePageObject;
