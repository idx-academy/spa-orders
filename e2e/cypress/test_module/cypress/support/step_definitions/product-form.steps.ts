/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod, httpStatusCode } from "@cypress-e2e/fixtures/global-data";

Given("I click on the 'New product' button", () => {
  cy.getById("new-product-button").click();
});

Given("I click on the 'first product update icon'", () => {
  cy.getById("products-table-item-update-icon").first().click();
});

Then("I should see the 'Create a product' form", () => {
  cy.getById("dashboard-new-product-title").should("be.visible");
});

When("I fill in the 'Image URL' field with {string}", (imageUrl: string) => {
  cy.getById("product-form-image-input").find("input").clear().type(imageUrl);
});

When("I fill in the 'Product Name' field with {string}", (name: string) => {
  cy.typeIntoBlank(cy.getById("product-form-name-input").find("input"), name)
});

When("I change language to {string}", (language: string) => {
  cy.getById(`product-form-language-button-${language}`).click();
});

When(
  "I fill in the 'Product Description' field with {string}",
  (description: string) => {
    cy.typeIntoBlank(cy.getById("product-form-description-input")
    .find("textarea")
    .first(), description);
  }
);

When("I fill in the 'Price' field with {string}", (price: string) => {
  cy.typeIntoBlank(cy.getById("product-form-price-input").find("input"), price);
});

When("I fill in the 'Quantity' field with {string}", (quantity: string) => {
  cy.typeIntoBlank( cy.getById("product-form-quantity-input").find("input"), quantity);
});

When("I select 'Category' as {string}", (category: string) => {
  if (!category) return;
  cy.getById("product-form-category-select").click();
  cy.getById("product-form-category-menu").contains(category).click();
});

When("I check the 'Visible to customers' checkbox", () => {
  cy.getById("product-form-visible-status-checkbox").click();
});

When("I click on the 'Create product' button", () => {
  cy.getById("create-product-button").click();
});

When("I click on the 'Update product' button", () => {
  cy.getById("update-product-form-button").click();
});

When("Server returns 500 error when manager tries to update a product", () => {
  cy.intercept(httpMethod.patch, /\/v1\/management\/products/, {
    statusCode: httpStatusCode.internalServerError
  });
});

When("Server returns 500 error when manager tries to create a product", () => {
  cy.intercept(httpMethod.post, /\/v1\/management\/products/, {
    statusCode: httpStatusCode.internalServerError
  });
});

Then("I should see {string}", (message: string) => {
  cy.get("body").should("contain", message);
});
