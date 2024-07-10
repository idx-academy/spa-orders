/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on a Products Page", () => {
  cy.visit("/products");
});

When("I click on Logo button", () => {
  cy.getById("logo").click();
});

Then("I should be redirected to Home Page and see the banner", () => {
  cy.getById("banner").should("be.visible");
});
