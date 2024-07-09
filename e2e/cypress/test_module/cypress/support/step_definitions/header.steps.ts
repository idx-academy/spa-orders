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
