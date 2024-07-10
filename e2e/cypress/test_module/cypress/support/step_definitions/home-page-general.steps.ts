/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on a home page", () => {
  cy.intercept("GET", "/api/v1/products?page=0&size=5").as("getProducts");
  cy.visit("/");
});

When(
  "I can see the Header, Banner, Subintro, Call-to-action, Best Sellers, Shop by category and Footer sections",
  () => {
    cy.getById("header-toolbar").should("be.visible");
    cy.getById("banner").should("be.visible");
    cy.getById("subintro").should("be.visible");
    cy.getById("call-to-action").should("be.visible");
    cy.getById("best-sellers").should("be.visible");
    cy.getById("category-section").should("be.visible");
    cy.getById("footer").should("be.visible");
  }
);

When("I type text Mobile in search field", () => {
  cy.get('input[placeholder="Search..."]').type("Mobile");
});

When("I click on clear button", () => {
  cy.get('[data-testid="ClearIcon"]').click();
});

Then("I can see empty search field again", () => {
  cy.get('input[placeholder="Search..."]').should("be.empty");
});

When("I click on Sign In button", () => {
  cy.getById("auth-button").click();
});

Then("I should see Sign In dialog", () => {
  cy.getById("auth-modal").contains("Sign In").should("be.visible");
});

When("I click on Shop All button", () => {
  cy.get('[data-testid="menu-item"]').contains("Shop All").click();
});

Then("I should be redirected to All Products Page", () => {
  cy.get("h1").contains("All Products");
});

When("I look throw Best Sellers section", () => {
  cy.getById("best-sellers").should("be.visible");
});

Then("I should see only five products on it", () => {
  cy.wait("@getProducts").then(() => {
    cy.getById("best-sellers").within(() => {
      cy.getById("product-card").should("have.length", 5);
    });
  });
});

When("I am hovering on Product Card img", () => {
  cy.getById("product-card-img").first().trigger("mouseover");
});

Then("I should see the Product description", () => {
  cy.getById("product-card-description").first().should("be.visible");
});
