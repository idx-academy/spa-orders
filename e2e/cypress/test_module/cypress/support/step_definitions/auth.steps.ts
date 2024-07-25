/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on any page", () => {
  cy.visitWithLanguage("/");
});

When("I see the header", () => {
  cy.get(".header").should("be.visible");
});

When("I click eye icon", () => {
  cy.get('[data-testid="VisibilityOffIcon"]').first().click();
});

When("I click sign up button in the header", () => {
  cy.getById("auth-button").click();
});

When("I type an email {word}", (email: string) => {
  cy.getById("auth-email").click().type(email);
});

When("I type a password {string}", (password: string) => {
  cy.getById("auth-password").click().type(password);
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
