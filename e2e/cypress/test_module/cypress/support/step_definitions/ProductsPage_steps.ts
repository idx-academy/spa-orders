import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on Products Page", () => {
  cy.visit("/products");
});

When("the user click on  on Logo button", () => {
  cy.clickAndOpenLink_InSameTab('[data-cy="logo"]');
});

Then("the user should be redirected to Home Page", () => {
  cy.get('[data-cy="banner"]').should("be.visible");
});
