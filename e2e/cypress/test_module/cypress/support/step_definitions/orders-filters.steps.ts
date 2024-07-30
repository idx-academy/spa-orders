/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {
  deliveryMethods,
  orderDeliveryStatuses
} from "@cypress-e2e/fixtures/constants";

When("I can see orders filter button", () => {
  cy.getById("filter-button").should("be.visible");
});

When("I click on the orders filter button", () => {
  cy.getById("filter-button").click();
});

When("I should see the orders filter drawer", () => {
  cy.getById("orders-filter-drawer").should("be.visible");
});

When("I click on the apply button", () => {
  cy.getById("apply-filters-button").click();
});

Then("I should see the orders filter drawer closed", () => {
  cy.getById("orders-filter-drawer").should("not.be.visible");
});

Given("I select order status {string}", (orderStatus: string) => {
  cy.getById(`order-${orderDeliveryStatuses[orderStatus]}-status`).click();
});

When("I select creation date {string}", (creationDate: string) => {
  cy.getById("creation-date-select").click();
  cy.getById(`${creationDate}-date-select`).click();
});

When("I select delivery method {string}", (deliveryMethod: string) => {
  cy.getById(`delivery-method-${deliveryMethods[deliveryMethod]}`).click();
});

When(
  "I set price range from {string} to {string}",
  (priceFrom: string, priceTo: string) => {
    cy.getById("price-range-from").type(priceFrom);
    cy.getById("price-range-to").type(priceTo);
  }
);

When("I set is paid checkbox to {string}", (isPaid) => {
  const isPaidCheckbox = cy.getById("is-paid-checkbox");
  if (isPaid === "true") {
    isPaidCheckbox.click();
  } else if (isPaid === "false") {
    isPaidCheckbox.dblclick();
  }
});

Then("I see the applied filters count {string}", (count) => {
  cy.getById("applied-filters-count").should("contain.text", count);
});

When("I click label {string}", (sortKey) => {
  cy.getById(`table-head-${sortKey}-label`).click();
});

Then("I should see the active sorting label {string}", (sortKey) => {
  cy.getById(`table-head-${sortKey}-label`).should("have.class", "Mui-active");
});
