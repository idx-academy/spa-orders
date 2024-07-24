/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";

Given("As a user I am signed in", () => {
  cy.signIn();
});

When("I click on the Cart button", () => {
  cy.getById("header-cart-button").click();
});

Then("I should see the Cart drawer", () => {
  cy.getById("cart-drawer").should("be.visible");
});

When("I click view the cart it opens the cart page", () => {
  cy.getById("cart-drawer-button").click();
});

Then("I should see the cart page", () => {
  cy.getById("myCartLabel").should("be.visible");
});

Given("I am on the cart page", () => {
  cy.visit("/cart");
  cy.getById("cart-item").should("be.visible");
});

Given("the cart has an item with quantity {int}", (quantity) => {
  cy.visit("/cart");
  cy.getById("cart-item")
    .first()
    .within(() => {
      cy.getById("cart-item-quantity").clear().type(quantity.toString());
    });
});

When("I click on the increase button for the product quantity", () => {
  cy.intercept(httpMethod.patch, /\/api\/v1\/cart\/items\/\d+/);
  cy.getById("cart-item")
    .first()
    .within(() => {
      cy.getById("increase-quantity-button").click();
    });
});

When("I click on the decrease button for the product quantity", () => {
  cy.intercept(httpMethod.patch, /\/api\/v1\/cart\/items\/\d+/);
  cy.getById("cart-item")
    .first()
    .within(() => {
      cy.getById("decrease-quantity-button").click();
    });
});

Then("I should see the changed quantity is {int}", (quantity) => {
  cy.getById("cart-item")
    .first()
    .within(() => {
      cy.getById("cart-item-quantity").should(
        "have.value",
        quantity.toString()
      );
    });
});

When("I click on the remove button for a product", () => {
  cy.intercept(httpMethod.delete, /\/api\/v1\/cart\/items\/\d+/);
  cy.getById("cart-item")
    .first()
    .within(() => {
      cy.getById("remove-cart-item-button").click();
    });
});

Then("I should see the remove snackbar", () => {
  cy.getById("snackbar").should("exist");
});
