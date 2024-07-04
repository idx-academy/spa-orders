/// <reference types="cypress" />

class Base_PO {
  baseURL = "http://localhost:3000/";
  navigate(path) {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.baseURL + path);
    });
  }
}

export default Base_PO;
