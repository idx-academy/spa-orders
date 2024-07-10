Feature: User Home Page

    Scenario: Orders button visibility fo login user
        Given I authenticate to the system under role ROLE_USER
        When I can see orders button on a header
        And I click on the orders button
        Then I can see orders page