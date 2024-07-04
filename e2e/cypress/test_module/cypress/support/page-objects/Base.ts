/// <reference types="cypress" />

class BaseObject {
  baseURL = "http://localhost:3000/";
  navigate(path) {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.baseURL + path);
    });
  }
}

export default BaseObject;
