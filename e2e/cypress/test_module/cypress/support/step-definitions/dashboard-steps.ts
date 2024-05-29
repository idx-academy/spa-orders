import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("the user is on the dashboard page", () => {
  cy.visit("/dashboard");
});

Then("the user should see the dashboard", () => {
  cy.get("h1").should("contain", "Dashboard");
});

Then("the user should see {string} information", (kpi: string) => {
  cy.get("h2").should("contain", kpi);
});