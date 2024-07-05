import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import HomePageObject from "../page_objects/HomePage";
import ProductsPageObject from "../page_objects/ProductsPage";

const homePage = new HomePageObject();
const productsPage = new ProductsPageObject();

Given("the user is on home page", () => {
  homePage.navigateToHomePage();
});

When("the user views the header", () => {
  cy.get('[data-cy="header-toolbar"]').should("be.visible");
});

Then(
  "the user should see the logo, Search input, basket, Login button and menu-list inside header",
  () => {
    cy.get('[data-cy="header-toolbar"]').within(() => {
      cy.get('[data-cy="logo"]').should("be.visible");
      cy.get('input[placeholder="Search..."]').should("be.visible");
      cy.get('[data-testid="ShoppingCartIcon"]').should("be.visible");
      cy.get('button[type="button"]').contains("Sign In").should("be.visible");
    });
    cy.get('[data-cy="header-menu"]').within(() => {
      cy.get('[data-testid="menu-item"]').should("have.length", 4);
    });
  }
);

When("the user enter text in search field", () => {
  cy.get('input[placeholder="Search..."]').type("tablet");
});

When("the user click on cleat button", () => {
  cy.get('[data-testid="ClearIcon"]').click();
});

Then("the search field should be empty", () => {
  cy.get('input[placeholder="Search..."]').should("be.empty");
});

When("the user click on  on Shop All button", () => {
  homePage.clickOnShopAllButton();
});

Then("the user should be redirected to All Products Page", () => {
  productsPage.navigateToProductsPage();
});

When("the user click on  on Sign In button", () => {
  homePage.clickOnSignInButton();
});

Then("the user should see Sign In dialog", () => {
  cy.get('[data-cy="auth-modal"]').contains("Sign In").should("be.visible");
});

When("the user views the Banner", () => {
  cy.get('[data-cy="banner"]').should("be.visible");
});

Then("the user should see the banner with bage, title and button", () => {
  cy.get('[data-cy="banner"]').within(() => {
    cy.get('[data-cy="banner-bage"]')
      .contains("Best Prices")
      .should("be.visible");
    cy.get("h1").should("be.visible");
    cy.get('button[type="button"]').contains("Shop Now").should("be.visible");
  });
});

When("the user views the Subintro", () => {
  cy.get('[data-cy="subintro"]').should("be.visible");
});

Then("the user should see the list of four elements inside Subintro", () => {
  cy.get('[data-cy="subintro"]').within(() => {
    cy.get('[data-testid="spa-subintro-item"]').should("have.length", 4);
  });
});

When("the user views the Call-to-action", () => {
  cy.get('[data-cy="call-to-action"]').should("be.visible");
});

Then(
  "the user should see the two Call-to-action elements with buttons inside Call-to-action",
  () => {
    cy.get('[data-cy="call-to-action"]').within(() => {
      cy.get('[data-cy="call-to-action-button"]')
        .should("have.length", 2)
        .each(($button) => {
          cy.wrap($button).contains("Shop");
        });
    });
  }
);

When("the user views the Best Sellers", () => {
  cy.get('[data-cy="best-sellers"]').should("be.visible");
});

Then(
  "the user should see the title of section, five products, button and product card with img",
  () => {
    cy.get('[data-cy="best-sellers"]').within(() => {
      cy.get("h3").contains("Best Sellers").should("be.visible");
      cy.get('[data-cy="product-card"]').should("have.length", 5);
      cy.get('button[type="button"]').contains("View All").should("be.visible");
    });
    cy.get('[data-cy="product-card"]').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('[data-cy="product-card-img"]').should("be.visible");
        cy.get('[data-cy="product-card-description"]').should("exist");
        cy.get('[data-cy="product-card-caption"]').should("be.visible");
        cy.get('[data-cy="product-card-price"]')
          .contains("$")
          .should("be.visible");
        cy.get('[data-cy="product-card-add-button"]')
          .contains("Add to cart")
          .should("be.visible");
      });
    });
  }
);

// When("the user hovers on Product Card img", () => {
//   cy.get('[data-cy="product-card-img"]:first').trigger('mouseover');
// });

// Then("the user should see the Product description", () => {
//   cy.get('[data-cy="product-card-description:first"]').should("be.visible");
// });

When("the user views the Shop by category", () => {
  cy.get('[data-cy="category-section"]').should("be.visible");
});

Then(
  "the user should see the title and three category items within of Shop by category",
  () => {
    cy.get('[data-cy="category-section"]').within(() => {
      cy.get("h3").contains("Shop By Category").should("be.visible");
      cy.get('[data-cy="category-section-container"]').within(() => {
        cy.get('[data-testid="spa-category-section-item"]').should(
          "have.length",
          3
        );
      });
    });
  }
);

When("the user views the Footer", () => {
  cy.get('[data-cy="footer"]').should("be.visible");
});

Then(
  "the user should see the four lists with titles and socials list within Footer",
  () => {
    cy.get('[data-cy="footer"]').within(() => {
      cy.get("h3")
        .should("have.length", 3)
        .each(($heading) => {
          cy.wrap($heading).should("be.visible");
        });
      cy.get('[data-cy="footer-location-info"]').should("be.visible");
      cy.get('[data-cy="footer-socials"]').should("be.visible");
      cy.get('[data-cy="footer-customer-support-info"]').should("be.visible");
      cy.get('[data-cy="footer-policy-info"]').should("be.visible");
    });
  }
);
