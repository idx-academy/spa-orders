import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on a Products Page", () => {
  cy.visit("/products");
});

When("I click on Logo button", () => {
  cy.get('[data-cy="logo"]').click();
});

Then("I should be redirected to Home Page and see the banner", () => {
  cy.get('[data-cy="banner"]').should("be.visible");
});
