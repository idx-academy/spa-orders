import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on home page", () => {
  cy.visit("/");
});

When("the user views the header", () => {
  cy.get(".header").should("be.visible");
});

Then("the user should see the header", () => {
  cy.get(".header").should("be.visible");
});

When("the user views the login button", () => {
  cy.get(".header__icons button").should("be.visible");
});

Then(
  "the user should see the login button with text {string}",
  (text: string) => {
    cy.get(".header__icons button").contains(text).should("be.visible");
  }
);
