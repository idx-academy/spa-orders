/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { UserRole } from "@cypress-e2e/support";

When("I can see the {string} and {string} tabs", (...tabs) => {
  tabs.forEach((tab) => {
    cy.getById(`dashboard-tab-${tab}`).should("be.visible");
  });
});

When("I click on the {string} tab", (tab) => {
  cy.getById(`dashboard-tab-${tab}`).click();
});

Then("I should see the {string} tab content", (tab) => {
  cy.getById(`dashboard-${tab}-tab-content`).should("be.visible");
});
