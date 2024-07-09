Feature: Guest Home Page

  Background: Before each
    Given I am on a home page

  Scenario: General view of the home page
    When I can see the Header, Banner, Subintro, Call-to-action, Best Sellers, Shop by category and Footer sections

  Scenario: Search field type and clear
    When I type text Mobile in search field
    And I click on clear button
    Then I can see empty search field again

  Scenario: Navigate to the SignIn dialog
    When I click on Sign In button
    Then I should see Sign In dialog

  Scenario: Navigate to the Product Page
    When I click on Shop All button
    Then I should be redirected to All Products Page


# Scenario: View description of a product
#   When the user hovers on Product Card img
#   Then the user should see the Product description









