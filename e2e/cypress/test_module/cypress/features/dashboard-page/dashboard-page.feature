Feature: | Dashboard Page |

  Background: Before each
    Given I authenticate to the system under "ROLE_MANAGER" role
    When I click on the Dashboard button


  Scenario Outline: General view of the dashboard page
    When I can see the "<tab1>" and "<tab2>" tabs
    When I click on the "<tab1>" tab
    Then I should see the "<tab1>" tab content
    When I click on the "<tab2>" tab
    Then I should see the "<tab2>" tab content

    Examples:
      | tab1     | tab2   |
      | products | orders |