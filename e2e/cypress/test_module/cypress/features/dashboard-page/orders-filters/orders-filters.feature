Feature: | Orders filters |

  Background: Before each
    Given I authenticate to the system under role ROLE_MANAGER
    When I can see dashboard button on the header
    And I click on the dashboard button

  Scenario: View the Orders Filters Drawer
    When I can see orders filter button
    And I click on the orders filter button
    When I should see the orders filter drawer
    When I click on the apply button
    Then I should see the orders filter drawer closed

  Scenario Outline: Apply Orders Filters
    When I can see orders filter button
    And I click on the orders filter button
    Given I select order status '<orderStatus>'
    And I select creation date '<creationDate>'
    And I select delivery method '<deliveryMethod>'
    And I set price range from '<priceFrom>' to '<priceTo>'
    And I set is paid checkbox to '<isPaid>'
    When I click on the apply button
    And I should see the orders filter drawer closed
    Then I see the applied filters count '<Applied filters count>'

    Examples:
      | orderStatus | creationDate   | deliveryMethod | priceFrom | priceTo | isPaid | Applied filters count |
      | In progress | yesterday      | Nova Post      | 0         | 10000   | true   | 5                     |
      | Shipped     | last-week      | Ukr Post       | 5000      | 15000   | false  | 5                     |
      | Delivered   | last-two-weeks | Nova Post      | 1000      | 20000   | -      | 4                     |
      | Canceled    | last-month     | Ukr Post       | 0         | 5000    | -      | 4                     |
      | Completed   | last-week      | Nova Post      | 2000      | 10000   | true   | 5                     |

  Scenario Outline: Apply Sorting
    When I click label '<sortKey>'
    Then I should see the active sorting label '<sortKey>'

    Examples:
      | sortKey     |
      | orderStatus |
      | createdAt   |
      | total       |
      | isPaid      |
