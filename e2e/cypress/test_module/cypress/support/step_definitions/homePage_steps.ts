import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on home page", () => {
  cy.visit("/");
});

When("the user views the header", () => {
  cy.get(".header").should("be.visible");
});

Then(
  "the user should see the logo, Search input, basket ahd Login button inside header",
  () => {
    cy.get(".header").within(() => {
      cy.get(".spa-logo").should("be.visible");
      cy.get('input[placeholder="Search..."]').should("be.visible");
      cy.get('[data-testid="ShoppingCartIcon"]').should("be.visible");
      cy.get('button[type="button"]').contains("Login").should("be.visible");
    });
  }
);

Then("the user should see the menu-list with thee items inside header", () => {
  cy.get(".header").within(() => {
    cy.get(".menu").should("be.visible");
    cy.get('[data-testid="menu-item"]').should("have.length", 4);
  });
});

When("the user click on  on Shop All button", () => {
  cy.get(".header").within(() => {
    cy.get('[data-testid="menu-item"]').first().click();
  });
});

Then("the uset should be redirected to All Products Page", () => {
  cy.get("h1").contains("All Products").should("be.visible");
});

When("the user views the banner", () => {
  cy.get(".spa-banner-intro__wrapper").should("be.visible");
});

Then("the user should see the banner with bage, title and button", () => {
  cy.get(".spa-banner-intro__wrapper").within(() => {
    cy.get(".spa-badge").contains("Best Prices").should("be.visible");
    cy.get("h1").should("be.visible");
    cy.get('button[type="button"]').contains("Shop Now").should("be.visible");
  });
});

When("the user views the Subintro", () => {
  cy.get(".spa-subintro").should("be.visible");
});

Then("the user should see the list of four elements inside Subintro", () => {
  cy.get(".spa-subintro").within(() => {
    cy.get('[data-testid="spa-subintro-item"]').should("have.length", 4);
  });
});

When("the user views the Call-to-action", () => {
  cy.get(".call-to-action").should("be.visible");
});

Then(
  "the user should see the two Call-to-action elements with buttons inside Call-to-action",
  () => {
    cy.get(".call-to-action").within(() => {
      cy.get(".call-to-action__item").should("have.length", 2);
      cy.get('.call-to-action__item button[type="button"]').should(
        ($buttons) => {
          expect($buttons).to.have.length(2);
          $buttons.each((index, button) => {
            expect(button).to.contain.text("Shop");
          });
        }
      );
    });
  }
);

When("the user views the Best Sellers", () => {
  cy.get(".spa-best-sellers").should("be.visible");
});

Then(
  "the user should see the title of section, five products and button",
  () => {
    cy.get(".spa-best-sellers").within(() => {
      cy.get("h3").contains("Best Sellers").should("be.visible");
      cy.get(".spa-best-sellers__container").find("a").should("have.length", 5);
      cy.get('button[type="button"]').contains("View All").should("be.visible");
    });
  }
);

Then(
  "the user should see product card with img, footer, which contain price and button",
  () => {
    cy.get(".spa-product-card").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get(".spa-product-card__img").within(() => {
          cy.get(".spa-product-card__img-name").should("be.visible");
          cy.get(".spa-product-card__description").should("exist");
        });

        cy.get(".spa-typography__caption").should("be.visible");

        cy.get(".spa-product-card__footer").within(() => {
          cy.get(".spa-product-card__footer-price")
            .contains("$")
            .should("be.visible");
          cy.get('button[type="button"]')
            .should("be.visible")
            .within(() => {
              cy.get('[data-testid="AddIcon"]').should("be.visible");
            });
        });
      });
    });
  }
);

When("the user views the Shop by category", () => {
  cy.get(".spa-category-section").should("be.visible");
});

Then(
  "the user should see the title and three category items within of Shop by category",
  () => {
    cy.get(".spa-category-section").within(() => {
      cy.get("h3").contains("Shop By Category").should("be.visible");
      cy.get(".spa-category-section__container").within(() => {
        cy.get('[data-testid="spa-category-section-item"]').should(
          "have.length",
          3
        );
      });
    });
  }
);

When("the user views the Footer", () => {
  cy.get(".footer").should("be.visible");
});

Then(
  "the user should see the four lists with titles and socials list within Footer",
  () => {
    cy.get(".footer__container").within(() => {
      cy.get("h3")
        .should("have.length", 3)
        .each(($heading) => {
          cy.wrap($heading).should("be.visible");
        });

      cy.get(".footer__list")
        .should("have.length", 3)
        .each(($list) => {
          cy.wrap($list).should("be.visible");
        });
      cy.get(".footer__socials").should("be.visible");
    });
  }
);
