Feature: |User Home Page|
  Verify the all elements of the home page is displayed correctly

  Background: Before each
    Given the user is on home page

  Scenario: View Header section
    When the user views the header
    Then the user should see the logo, Search input, basket ahd Login button inside header
    And the user should see the menu-list with thee items inside header

  Scenario: Navigate to the Product Page
    When the user click on  on Shop All button
    Then the uset should be redirected to All Products Page

  Scenario: View Banner section
    When the user views the banner
    Then the user should see the banner with bage, title and button

  Scenario: View Subintro section
    When the user views the Subintro
    Then the user should see the list of four elements inside Subintro

  Scenario: View Call-to-action section
    When the user views the Call-to-action
    Then the user should see the two Call-to-action elements with buttons inside Call-to-action

  Scenario: View Best Sellers section
    When the user views the Best Sellers
    Then the user should see the title of section, five products and button
    And the user should see product card with img, footer, which contain price and button

  Scenario: View Shop by category section
    When the user views the Shop by category
    Then the user should see the title and three category items within of Shop by category

  Scenario: View Footer section
    When the user views the Footer
    Then the user should see the four lists with titles and socials list within Footer








