Feature: Sign In

    Background: Before each
        Given I am on any page
        When I see the header
        And I click sign up button in the header

    Scenario: Successfull sign in
        And I type type an email 'test@mail.com'
        And I type a password 'Tomato1$'
        And I press sign in button inside modal
        Then I should receive a snackbar with message 'You successfully signed in'

    Scenario: Sign in form validation
        And I type type an email 'test@mail.com'
        And I type a password 'password'
        And I press sign in button inside modal
        Then I should see validation errors displayed

    Scenario: Show/hide password visibility
        And I type a password 'mypassword'
        And I click eye icon
        Then I should see password 'mypassword' instead of dotted