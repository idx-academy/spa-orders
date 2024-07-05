import "cypress-wait-until";

Cypress.Commands.addQuery("getById", (id: string) => {
  const getFn = cy.now(
    "get",
    `[data-cy="${id}"]`
  ) as () => Promise<HTMLElement>;
  return () => getFn();
});

Cypress.Commands.add("login", () => {
  const email = Cypress.env("email");
  const password = Cypress.env("password");

  cy.intercept("POST", "/api/auth/sign-in").as("loginRequest");

  cy.visit("/");
  cy.getById("auth-button").click();
  cy.getById("auth-email").click().type(email);
  cy.getById("auth-password").click().type(password, { log: false });
  cy.getById("auth-signin-submit").click();

  cy.wait("@loginRequest");

  cy.window()
    .its("localStorage")
    .invoke("getItem", "spa-user-details")
    .then((value) => {
      const userDetails = JSON.parse(value);
      expect(userDetails.token).to.exist;
    });
});
