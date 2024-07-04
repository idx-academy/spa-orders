/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickAndOpenLink(
      itemSelector: string,
      containerSelector?: string
    ): Chainable<Element>;
  }
}
