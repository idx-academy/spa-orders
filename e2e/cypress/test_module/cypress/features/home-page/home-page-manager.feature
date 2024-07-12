Feature: | Manager Home Page |

    Scenario: Dashboard button visibility for login user
        Given I authenticate to the system under role ROLE_MANAGER
        When I can see dasboard button on the header
        And I click on the dashboard button
        Then I can see dasboard page