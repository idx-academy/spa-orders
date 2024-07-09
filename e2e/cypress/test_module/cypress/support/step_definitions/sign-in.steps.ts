/// <reference types="Cypress" />

import { When } from "@badeball/cypress-cucumber-preprocessor";

When("I press sign in button inside modal", () => {
  cy.getById("auth-signin-submit").click();
});
