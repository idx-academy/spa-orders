/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickAndOpenLink_InSameTab( itemSelector: string, containerSelector?: string): Chainable<Element>;
    clickLink(selector: string): Chainable<Element>;
  }
}
