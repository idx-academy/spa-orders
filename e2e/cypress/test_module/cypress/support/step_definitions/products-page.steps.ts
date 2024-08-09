/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { sortingNameParamMap } from "@cypress-e2e/fixtures/constants";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";

Given("The user is on the products page", () => {
  cy.visitWithLanguage("/products");

  cy.intercept(httpMethod.get, /\/api\/v1\/products/).as("productsPageRequest");
});

Given("The user is on the products page and his connection is bad", () => {
  cy.visitWithLanguage("/products");
  cy.getProductsServerError(12);
});

When("The user clicks on Logo button", () => {
  cy.getById("logo").click();
});

Given("The loading fails", () => {
  cy.wait("@getProductsRequestServerError");
});

Then("The user should see error message", () => {
  cy.getById("products-error-label").should("be.visible");
});

When("The user waits until products will be loaded", () => {
  cy.getById("product-skeleton").should("have.length", 10);
});

Then("The user should be redirected to Home Page and see the banner", () => {
  cy.getById("banner").should("be.visible");
});

Given("The user is on the first page of products", () => {
  cy.intercept(httpMethod.get, /\/api\/v1\/products/).as("productsPageRequest");
  cy.visitWithLanguage("/products?page=1");
});

Given("The user is on the second page of products", () => {
  cy.intercept(httpMethod.get, /\/api\/v1\/products/).as("productsPageRequest");
  cy.visitWithLanguage("/products?page=1");
  cy.get(`[aria-current="true"]`)
    .invoke("text")
    .then((text) => {
      cy.intercept(httpMethod.get, new RegExp("page=" + (Number(text) + 1))).as(
        "productsPageRequest"
      );
    });
  cy.get('[aria-label="Go to next page"]').click();
});

When("The user looks at the pagination", () => {
  cy.getById("pagination").should("be.visible");
});

When("The user looks at the product", () => {
  cy.getById("product-card").first().should("be.visible");
});

When("Hovers product image", () => {
  cy.getById("product-card-img").first().invoke("mouseover");
  cy.getById("product-card-description").first().as("firstProductDescription");

  cy.get("@firstProductDescription")
    .should("be.hidden")
    .then((el) => {
      el.css("visibility", "visible");
      el.css("opacity", "1");
      el.css("transform", "translateY(0)");
    });
});

Then("The user should see product description", () => {
  cy.get("@firstProductDescription").should("be.visible");
});

When("The user looks at the products section", () => {
  cy.getById("products-container").should("be.visible");
});

Then("The user should see {int} products", (productsCount) => {
  cy.getById("product-card").should("have.length", productsCount);
});

When("The user looks at the sorting dropdown", () => {
  cy.getById("products-dropdown").should("be.visible");
});

When("The user opens sorting dropdown", () => {
  cy.getById("products-dropdown").click();
});

When("The user clicks {int} page", (page: number) => {
  cy.intercept(httpMethod.get, new RegExp("page=" + page)).as(
    "productsPageRequest"
  );
  cy.get(`[aria-label="Go to page ${page}"]`).click();
});

When("The user clicks next page button", () => {
  cy.get(`[aria-current="true"]`)
    .invoke("text")
    .then((text) => {
      cy.intercept(httpMethod.get, new RegExp("page=" + (Number(text) + 1))).as(
        "productsPageRequest"
      );
    });
  cy.get('[aria-label="Go to next page"]').click();
});

When("The user clicks previous page button", () => {
  cy.get(`[aria-current="true"]`)
    .invoke("text")
    .then((text) => {
      cy.intercept(httpMethod.get, new RegExp("page=" + (Number(text) - 1))).as(
        "productsPageRequest"
      );
    });
  cy.get('[aria-label="Go to previous page"]').click();
});

When("The user chooses sorting by {string}", (criteria: string) => {
  cy.intercept(
    httpMethod.get,
    new RegExp("sort=" + encodeURIComponent(sortingNameParamMap[criteria]))
  ).as("productsRequest");

  cy.getById("dropdown-item").contains(criteria).click();
});

Then("The {int} page of products should be displayed", (page) => {
  cy.wait("@productsPageRequest");
  cy.get(`[aria-label="page ${page}"]`).should(
    "have.attr",
    "aria-current",
    "true"
  );
});

Then("Sorting by {string} should be applied", (criteria: string) => {
  cy.getById("products-dropdown").contains(criteria).should("be.visible");
});
