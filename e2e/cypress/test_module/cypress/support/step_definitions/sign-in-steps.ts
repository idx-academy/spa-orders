/// <reference types="Cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Any means all pages with header
Given("I am on any page", () => {
  cy.visit("/");
});

When("I see the header", () => {
  cy.get(".header").should("be.visible");
});

When("I click eye icon", () => {
  cy.get('[data-testid="VisibilityOffIcon"]').click();
});

When("I click sign up button in the header", () => {
  cy.getById("auth-button").click();
});

When("I type type an email {string}", (email: string) => {
  cy.getById("auth-email").click().type(email);
});

When("I type a password {string}", (password: string) => {
  cy.getById("auth-password").click().type(password);
});

When("I press sign in button inside modal", () => {
  cy.getById("auth-signin-submit").click();
});

When("I should see validation errors displayed", () => {
  cy.get("body").should(
    "contain",
    "Password must contain at least one uppercase letter"
  );
});

Then("I should receive a snackbar with message {string}", (message: string) => {
  cy.getById("snackbar").should("contain", message);
});

Then("I should see password {string} instead of dotted", (password: string) => {
  cy.getById("auth-password").as("passwordInput");
  cy.get("@passwordInput").click();
  
  cy.get("@passwordInput").within(() => {
    cy.get("input")
      .should("have.attr", "type", "text")
      .and("have.value", password);
  });
});
