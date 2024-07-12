/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../page_objects/home-pages";
import {
  ERRORS,
  httpMethod,
  httpStatusCode
} from "@cypress-e2e/fixtures/global-data";

Given("I am on a home page", () => {
  cy.intercept(httpMethod.get, "/api/v1/products?page=0&size=5").as(
    "getProducts"
  );
  cy.visit("/");
});

Given("I am on a home page - products server error", () => {
  cy.intercept(httpMethod.get, "/api/v1/products?page=0&size=5", {
    statusCode: httpStatusCode.internalServerError
  }).as("getProductsServerError");
  cy.visit("/");
});

Given("I am on a home page - Products are loading", () => {
  cy.intercept(httpMethod.get, "/api/v1/products?page=0&size=5", (req) => {
    req.continue((res) => {
      res.send({
        statusCode: httpStatusCode.ok,
        body: {
          products: []
        }
      });
    });
  }).as("getProductsLoading");

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
  cy.get(homePage.headerSearchFieldClearIcon).click();
});

Then("I can see empty search field again", () => {
  cy.get('input[placeholder="Search..."]').should("be.empty");
});

When("I click on Cart button", () => {
  cy.get(homePage.headerShopingCartIcon).click();
});

Then("I should see a Cart drawer", () => {
  cy.getById("cart-drawer").contains("Cart").should("be.visible");
});

When("I click on close Cart icon", () => {
  cy.get(homePage.cartDrawerCloseIcon).click();
});

Then("I should not see a Cart drawer", () => {
  cy.getById("cart-drawer").contains("Cart").should("not.be.visible");
});

When("I click on Sign In button", () => {
  cy.getById("auth-button").click();
});

Then("I should see Sign In dialog", () => {
  cy.getById("auth-modal").contains("Sign In").should("be.visible");
});

When("I click on Shop All button", () => {
  cy.get(homePage.headerMenuList).contains("Shop All").click();
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
  cy.getById("product-card-description").first().as("firstProductDescription");
  cy.get("@firstProductDescription")
    .should("be.hidden")
    .then((el) => {
      el.css("visibility", "visible");
      el.css("opacity", "1");
      el.css("transform", "translateY(0)");
    });
});

Then("I should see the Product description", () => {
  cy.get("@firstProductDescription").should("be.visible");
});

When("I click on Add to cart button", () => {
  cy.get("button").contains("Add to cart").first().click();
});

Then("I should see a Cart", () => {
  cy.getById("cart-drawer").should("be.visible");
});

When("I look throw Best Sellers section with error", () => {
  cy.getById("best-sellers").should("be.visible");
});

Then("I should see an error message", () => {
  cy.wait("@getProductsServerError").then(() => {
    cy.getById("best-sellers-products-error").should("be.visible");
    cy.getById("best-sellers-products-error-label")
      .contains(ERRORS.somethingWentWrong)
      .should("be.visible");
  });
});

When("I look throw Best Sellers section with skeletons", () => {
  cy.getById("best-sellers").should("be.visible");
});

Then("I should see five skeletons loading components", () => {
  cy.wait("@getProductsLoading").then(() => {
    cy.getById("best-sellers").within(() => {
      cy.getById("product-skeleton").should("have.length", 5);
    });
  });
});
