Feature: |Products Page|

  Background: Before each
    Given the user is on Products Page

  Scenario: Back to Home Page
    When the user click on  on Logo button
    Then the user should be redirected to Home Page
