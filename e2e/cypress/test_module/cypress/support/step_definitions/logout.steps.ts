/// <reference types="cypress" />

import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I click logout button", () => {
  cy.get("[data-testid='logout-button']").click();
});

Then("I should be logged out", () => {
  cy.getById("auth-button").should("be.visible");
  cy.get("[data-testid='logout-button']").should("not.exist");
});
