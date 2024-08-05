Feature: | Сart page |
  Verify that cart page functionality works correctly

  Background: User is signed in and navigates to the products page and adds an item to the cart
    Given I authenticate to the system under User role
    When I click on "All Products" to open the all products page
    And I add the first product to the cart

  Scenario: Verify the item is in the cart
    Then the cart icon should display 1 item

  Scenario: View the Cart Page
    Given I am on the cart page
    Then I should see the cart page

  Scenario: Increase quantity of product item from 1 to 2
    Given the cart has an item with quantity 1
    When I click on the increase button for the product quantity
    Then I should see the changed quantity is 2

  Scenario: Decrease quantity of product item from 2 to 1
    Given the cart has an item with quantity 2
    When I click on the decrease button for the product quantity
    Then I should see the changed quantity is 1

  Scenario: Remove a product item from the cart
    Given the cart has an item with quantity 1
    When I click on the remove button for a product
    Then I should to receive a snackbar with message 'The product was successfully removed from the cart.'