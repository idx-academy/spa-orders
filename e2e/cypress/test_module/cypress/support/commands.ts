import "cypress-wait-until";

Cypress.Commands.addQuery("getById", (id: string) => {
  const getFn = cy.now(
    "get",
    `[data-cy="${id}"]`
  ) as () => Promise<HTMLElement>;
  return () => getFn();
});

Cypress.Commands.add("loginWithRole", (role = "ROLE_USER") => {
  cy.clearLocalStorage();

  const email = Cypress.env(`${role}_EMAIL`);
  const password = Cypress.env(`${role}_PASSWORD`);

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
      expect(userDetails.role).to.eq(role);
    });

  cy.getById("snackbar").should("contain", "You successfully signed in");
});
