/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { ERRORS, homePage } from "@cypress-e2e/fixtures/global-data";

Given("I am on a home page", () => {
  cy.getProductsWithQuantity(5);
  cy.visitWithLanguage("/");
});

Given("I am on a home page and Products are loading", () => {
  cy.getProductsLoading(5);
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

When("I type text Mobi in search field", () => {
  cy.get('input[placeholder="Search..."]').type("Mobi");
});

When("I can see search Content", () => {
  cy.getById("header-search-result-label").should("be.visible");
});

When("I click on clear button", () => {
  cy.get(homePage.headerSearchFieldClearIcon).click();
});

Then("I can see empty search field again", () => {
  cy.get('input[placeholder="Search..."]').should("be.empty");
});

When("I type text Mobil in search field", () => {
  cy.get('input[placeholder="Search..."]').type("Mobil");
});

When("I can see search Content with elements", () => {
  cy.getById("header-search-result-label").should("be.visible");
});

When("I click on first searched product", () => {
  cy.get('img[alt*="Mobil"]').first().click();
});

Then("I should be redirected on single product page", () => {
  cy.visitWithLanguage("/products/");
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
  cy.get(homePage.headerMenuList).contains("All Products").click();
});

Then("I should be redirected to All Products Page", () => {
  cy.getById("products-page").should("be.visible");
});

When("I click on Shop Now button", () => {
  cy.getById("banner-intro-button").click();
});

Then("I should be redirected to Products Page", () => {
  cy.getById("products-page").should("be.visible");
});

When(
  "I look through Call-to-action section and click on {string} banner button",
  (category: string) => {
    const buttonIndex = category === "mobile" ? 0 : 1;
    cy.getById("call-to-action-button").eq(buttonIndex).click();
  }
);

Then("I should be redirected to {string} category page", (category) => {
  const categoryPath = category;
  cy.visitWithLanguage(`/products?category=${categoryPath}`);
});

When("I look throw Best Sellers section", () => {
  cy.getById("best-sellers").should("be.visible");
});

Then("I should see only {int} products on it", (productsCount) => {
  cy.wait("@getProductsWithQuantityRequest").then(() => {
    cy.getById("best-sellers").within(() => {
      cy.getById("product-card").should("have.length", productsCount);
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

When("I click on View All button", () => {
  cy.getById("best-sellers-button").click();
});

Then("I should be redirected to Products Page immediately", () => {
  cy.getById("products-page").should("be.visible");
});

When("I look throw Best Sellers section with skeletons", () => {
  cy.getById("best-sellers").should("be.visible");
});

Then("I should see {int} skeletons loading components", (sceletonsCount) => {
  cy.wait("@getProductsRequestLoading").then(() => {
    cy.getById("best-sellers").within(() => {
      cy.getById("product-skeleton").should("have.length", sceletonsCount);
    });
  });
});

When(
  "I look throw Shop By Category section and click on {string} category",
  (category: string) => {
    const categories = ["computer", "tablet", "mobile"];
    const linkIndex = categories.indexOf(category);
    cy.getById("spa-category-section-item-link").eq(linkIndex).click();
  }
);

Then("I should be immidiately redirected to {string} category page", () => {
  cy.visitWithLanguage("/products?category=computer${category}");
});
