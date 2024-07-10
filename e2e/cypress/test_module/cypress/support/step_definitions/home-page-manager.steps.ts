/// <reference types="cypress" />

import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I can see dasboard button on the header", () => {
  cy.getById("dashboard-button").should("be.visible");
});

When("I click on the dashboard button", () => {
  cy.getById("dashboard-button").click();
});

Then("I can see dasboard page", () => {
  cy.getById("dashboard-page").should("be.visible");
});
