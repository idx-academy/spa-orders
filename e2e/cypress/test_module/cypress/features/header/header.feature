Feature: Header
  Verify the header is displayed correctly

  Scenario: View Header
    Given the user is on home page
    When the user views the header
    Then the user should see the header

  Scenario: View Login Button
    Given the user is on home page
    When the user views the login button
    Then the user should see the login button with text "Login"
