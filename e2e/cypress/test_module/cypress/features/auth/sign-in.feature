Feature: | Sign In |

    Background: Before each
        Given I am on any page
        When I see the header
        And I click sign up button in the header

    Scenario: Successfull sign in
        And I type an email test@mail.com
        And I type a password 'Tomato1$'
        And I press sign in button inside modal
        Then I should receive a snackbar with message 'You successfully signed in'

    Scenario Outline: Sign in form validation
        And I type an email '<email>'
        And I type a password '<password>'
        And I press sign in button inside modal
        Then I should see validation error message '<message>'

        Examples:
            | email            | password      | message                                              |
            | bad_email        | test_password | Please provide a valid email address                 |
            | example@mail.com | 123           | Password must be at least 8 characters long          |
            | example@mail.com | 12345678      | Password must contain at least one uppercase letter  |
            | example@mail.com | 12345678A     | Password must contain at least one lowercase letter  |
            | example@mail.com | 12345678Aa    | Password must contain at least one special character |

    Scenario: Show/hide password visibility
        And I type a password 'mypassword'
        And I click eye icon
        Then I should see password 'mypassword' instead of dotted