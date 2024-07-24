/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";

Given("As a user I am signed in", () => {
  cy.signIn();
});

When("I click on the Cart button", () => {
  cy.get("[data-cy='header-cart-button']").click();
});

Then("I should see the Cart drawer", () => {
  cy.get("[data-cy='cart-drawer']").should("be.visible");
});

When("I click view the cart it opens the cart page", () => {
  cy.get("[data-cy='cart-drawer-button']").click();
});

Then("I should see the cart page", () => {
  cy.get("[data-cy='myCartLabel']").should("be.visible");
});

Given("I am on the cart page", () => {
  cy.visit("/cart");
  cy.get("[data-cy='cart-item']").should("be.visible");
});

Given("the cart has an item with quantity {int}", (quantity) => {
  cy.visit("/cart");
  cy.get("[data-cy='cart-item']")
    .first()
    .within(() => {
      cy.get("[data-cy='cart-item-quantity']")
        .clear()
        .type(quantity.toString());
    });
});

When("I click on the increase button for the product quantity", () => {
  cy.intercept(httpMethod.patch, /\/api\/v1\/cart\/items\/\d+/);
  cy.get("[data-cy='cart-item']")
    .first()
    .within(() => {
      cy.get("[data-cy='increase-quantity-button']").click();
    });
});

When("I click on the decrease button for the product quantity", () => {
  cy.intercept(httpMethod.patch, /\/api\/v1\/cart\/items\/\d+/);
  cy.get("[data-cy='cart-item']")
    .first()
    .within(() => {
      cy.get("[data-cy='decrease-quantity-button']").click();
    });
});

Then("I should see the changed quantity is {int}", (quantity) => {
  cy.get("[data-cy='cart-item']")
    .first()
    .within(() => {
      cy.get("[data-cy='cart-item-quantity']").should(
        "have.value",
        quantity.toString()
      );
    });
});

When("I click on the remove button for a product", () => {
  cy.intercept(httpMethod.delete, /\/api\/v1\/cart\/items\/\d+/);
  cy.get("[data-cy='cart-item']")
    .first()
    .within(() => {
      cy.get("[data-cy='remove-cart-item-button']").click();
    });
});

Then("I should see the remove snackbar", () => {
  cy.get("[data-cy='snackbar']").should("exist");
});
