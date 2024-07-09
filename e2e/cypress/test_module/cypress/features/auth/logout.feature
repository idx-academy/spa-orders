Feature: Logout

    Scenario: Success logout
        Given I authenticate to the system under role ROLE_USER
        When I click logout button
        Then I should be logged out