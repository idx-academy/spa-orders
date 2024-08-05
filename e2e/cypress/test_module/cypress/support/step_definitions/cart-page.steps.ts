/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";
import { UserRole } from "@cypress-e2e/support";

Given("I authenticate to the system under User role", (role: UserRole) => {
  cy.loginWithRole(role);
});

When("I click on {string} to open the all products page", () => {
  cy.getById("menu-item-0").click();
  cy.url().should("include", "/products");
});

When("I add the first product to the cart", () => {
  cy.intercept(httpMethod.post, /\/api\/v1\/cart\/items/);
  cy.getById("product-card")
    .first()
    .within(() => {
      cy.getById("add-to-cart-button").click();
    });
});

Then("the cart icon should display {int} item", (itemCount) => {
  cy.getById("header-cart-button").should("contain", itemCount.toString());
});

Given("I am on the cart page", () => {
  cy.visitWithLanguage("/cart");
  cy.getById("cart-item").should("be.visible");
});

Then("I should see the cart page", () => {
  cy.getById("cart-page").should("be.visible");
});

Given("the cart has an item with quantity {int}", (quantity) => {
  cy.visitWithLanguage("/cart");
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

Then(
  "I should to receive a snackbar with message {string}",
  (message: string) => {
    cy.getById("snackbar").should("contain", message);
  }
);
