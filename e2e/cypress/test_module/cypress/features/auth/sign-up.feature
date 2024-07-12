Feature: | Sign Up |

    Background: Before each
        Given I am on any page
        When I see the header
        And I click sign up button in the header
        And I click go to sign up link

    Scenario: Successfull sign up
        And I type type a firstname Joe
        And I type type a lastname Johnes
        And I type an email joejohnes@mail.com
        And I type a password 'Tomato1$'
        And I confirm a password by typing a value 'Tomato1$'
        And I press sign up button inside modal
        Then I should receive a snackbar with message 'You successfully signed up'

    Scenario Outline: Sign up form validation
        And I type type a firstname <firstName>
        And I type type a lastname <lastName>
        And I type an email <email>
        And I type a password '<password>'
        And I confirm a password by typing a value '<confirmPassword>'
        And I press sign up button inside modal
        Then I should see validation error message '<message>'

        Examples:
            | firstName | lastName | email         | password    | confirmPassword | message                                              |
            | D         | test     | test          | test        | test            | First name is too short                              |
            | John      | D        | test          | test        | test            | Last name is too short                               |
            | John      | Doe      | test          | test        | test            | Please provide a valid email address                 |
            | John      | Doe      | test@mail.com | 123         | test            | Password must be at least 8 characters long          |
            | John      | Doe      | test@mail.com | 12345678A   | test            | Password must contain at least one lowercase letter  |
            | John      | Doe      | test@mail.com | 12345678Aa  | test            | Password must contain at least one special character |
            | John      | Doe      | test@mail.com | 12345678Aa$ | %12345678Aa     | Passwords don\'t match                               |


    Scenario: Show/hide password visibility
        And I type a password 'mypassword'
        And I click eye icon
        Then I should see password 'mypassword' instead of dotted