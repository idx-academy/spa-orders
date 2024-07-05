/// <reference types="cypress" />

class BaseObject {
  navigate(path) {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.baseURL + path);
    });
  }
}

export default BaseObject;
