import "cypress-wait-until";

import { httpMethod, httpStatusCode } from "@cypress-e2e/fixtures/global-data";

const USERNAME = Cypress.config().username;
const PASSWORD_ENV_PROPERTY = Cypress.config().password;
const PASSWORD = Cypress.env(PASSWORD_ENV_PROPERTY);

// @ts-ignore
Cypress.Commands.add("login", () => {
  if (Cypress.env("configFile") !== "local") {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.request({
      headers: {
        "Accept-API-Version": "resource=2.0, protocol=1.0",
        "Content-Type": "application/json",
        "X-OpenAM-Password": PASSWORD,
        "X-OpenAM-Username": USERNAME,
      },
      method: httpMethod.post,
      // url: commonRoutes.global.authenticate,
    }).then((resp) => {
      cy.log(`${resp.status}`);

      expect(resp.status).to.eq(httpStatusCode.ok);
    });
  }
});
