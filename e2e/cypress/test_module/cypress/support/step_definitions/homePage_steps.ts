import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on a home page", () => {
  cy.visit("/");
});

When(
  "I can see the Header, Banner, Subintro, Call-to-action, Best Sellers, Shop by category and Footer sections",
  () => {
    cy.get('[data-cy="header-toolbar"]').should("be.visible");
    cy.get('[data-cy="banner"]').should("be.visible");
    cy.get('[data-cy="subintro"]').should("be.visible");
    cy.get('[data-cy="call-to-action"]').should("be.visible");
    cy.get('[data-cy="best-sellers"]').should("be.visible");
    cy.get('[data-cy="category-section"]').should("be.visible");
    cy.get('[data-cy="footer"]').should("be.visible");
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
  cy.get('[data-cy="auth-button"]').click();
});

Then("I should see Sign In dialog", () => {
  cy.get('[data-cy="auth-modal"]').contains("Sign In").should("be.visible");
});

When("I click on Shop All button", () => {
  cy.get('[data-testid="menu-item"]').contains("Shop All").click();
});

Then("I should be redirected to All Products Page", () => {
  cy.get("h1").contains("All Products");
});

// When("I am hovering on Product Card img", () => {
//   cy.get('[data-cy="product-card-img"]').first().trigger("mouseover");

// });

// Then("I should see the Product description", () => {
//   cy.get('[data-cy="product-card-description"]').should('be.visible');

// });
