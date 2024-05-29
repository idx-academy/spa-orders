import "cypress-mochawesome-reporter/register";
import "cypress-xpath";
import "cypress-commands";

import "@cypress/code-coverage/support";

import "@cypress-e2e/support/commands";

declare global {
  namespace Cypress {
    interface ResolvedConfigOptions {
      apiBaseUrl: string;
      password: string;
      username: string;
    }
  }
}

Cypress.on("uncaught:exception", (promise) => {
  if (promise) {
    return false;
  }
});
