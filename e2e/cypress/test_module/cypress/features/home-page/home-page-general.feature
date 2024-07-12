Feature: | Guest Home Page |

  Background: Before each
    Given I am on a home page

  Scenario: General view of the home page
    When I can see the Header, Banner, Subintro, Call-to-action, Best Sellers, Shop by category and Footer sections

  Scenario: Search field type and clear
    When I type text Mobile in search field
    And I click on clear button
    Then I can see empty search field again

  Scenario: Open and Close user Cart
    When I click on Cart button
    Then I should see a Cart drawer
    When I click on close Cart icon
    Then I should not see a Cart drawer

  Scenario: Navigate to the SignIn dialog
    When I click on Sign In button
    Then I should see Sign In dialog

  Scenario: Navigate to the Product Page
    When I click on Shop All button
    Then I should be redirected to All Products Page

 Scenario: Navigate from banner to Product Page
    When I click on Shop Now button
    Then I should be redirected to Products Page

  Scenario: Interacting with the Best Sellers section
    When I look throw Best Sellers section
    Then I should see only 5 products on it
    When I am hovering on Product Card img
    Then I should see the Product description
    When I click on View All button
    Then I should be redirected to Products Page immediately

  Scenario: Best Sellers section with bed products request
    Given I am on a home page and receive products server error
    When I look throw Best Sellers section with error
    Then I should see an error message

  Scenario: Best Sellers section products skeletons
    Given I am on a home page and Products are loading
    When I look throw Best Sellers section with skeletons
    Then I should see 5 skeletons loading components











