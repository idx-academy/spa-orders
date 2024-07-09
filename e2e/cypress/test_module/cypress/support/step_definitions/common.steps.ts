/// <reference types="Cypress" />

import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("I should see validation error message {string}", (message: string) => {
  cy.get("body").should("contain", message);
});

Then("I should receive a snackbar with message {string}", (message: string) => {
  cy.getById("snackbar").should("contain", message);
});
