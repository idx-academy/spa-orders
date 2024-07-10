/// <reference types="cypress" />

import { When } from "@badeball/cypress-cucumber-preprocessor";

When("I click go to sign up link", () => {
  cy.getById("auth-toggle-tab").click();
});

When("I type type a firstname {word}", (firstName: string) => {
  cy.getById("auth-firstname").click().type(firstName);
});

When("I type type a lastname {word}", (lastName: string) => {
  cy.getById("auth-lastname").click().type(lastName);
});

When(
  "I confirm a password by typing a value {string}",
  (confirmPassword: string) => {
    cy.getById("auth-confirm-password").click().type(confirmPassword);
  }
);

When("I press sign up button inside modal", () => {
  cy.getById("auth-signup-submit").click();
});
