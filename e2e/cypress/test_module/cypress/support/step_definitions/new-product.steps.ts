/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I click on the 'New product' button", () => {
  cy.getById("new-product-button").click();
});

Then("I should see the 'Create a product' form", () => {
  cy.getById("dashboard-new-product-title").should("be.visible");
});
When("I fill in the 'Image URL' field with {string}", (imageUrl: string) => {
  cy.getById("image-url-input").type(imageUrl);
});

When(
  "I fill in the 'Product name' {string} field with {string}",
  (locale: string, title: string) => {
    cy.getById(`new-product-name-input-${locale}`).type(title);
  }
);

When(
  "I fill in the 'Product description' {string} field with {string}",
  (locale: string, description: string) => {
    cy.getById(`new-product-description-input-${locale}`).type(description);
  }
);

When("I fill in the 'Price' field with {string}", (price: string) => {
  cy.getById("new-product-price-input").type(price);
});

When("I fill in the 'Quantity' field with {string}", (quantity: string) => {
  cy.getById("new-product-quantity-input").type(quantity);
});

When("I select 'Category' as {string}", (category: string) => {
  cy.getById("new-product-category-select").click();
  cy.getById(`category-${category}`).click();
});

When("I check the 'Visible to customers' checkbox", () => {
  cy.getById("new-product-visible-status-checkbox").click();
});

When("I click on the 'Create product' button", () => {
  cy.getById("create-product-button").click();
});
