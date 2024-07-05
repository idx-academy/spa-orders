import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPageObject from "../page_objects/ProductsPage";

const productsPage = new ProductsPageObject();

Given("the user is on Products Page", () => {
  productsPage.navigateToProductsPage();
});

When("the user click on  on Logo button", () => {
  cy.clickAndOpenLink('[data-cy="logo"]');
});

Then("the user should be redirected to Home Page", () => {
  cy.get('[data-cy="banner"]').should("be.visible");
});
