import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import ProductsPageObject from "../page_objects/ProductsPage";
import HomePageObject from "../page_objects/HomePage";

const productsPage = new ProductsPageObject();
const homePage = new HomePageObject()

Given("the user is on Products Page", () => {
  productsPage.navigateToProductsPage();
});

When("the user click on Logo button", () => {
  cy.clickAndOpenLink('[data-cy="logo"]');
});

Then("the user should be redirected to Home Page", () => {
  homePage.navigateToHomePage();
});
