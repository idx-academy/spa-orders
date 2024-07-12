Feature: | Products Page |

  Background: Before each
    Given I am on a Products Page

  Scenario: Back to Home Page
    When I click on Logo button
    Then I should be redirected to Home Page and see the banner
