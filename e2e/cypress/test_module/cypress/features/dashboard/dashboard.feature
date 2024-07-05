@ignore
Feature: |Dashboard |
  Verify the user can view the dashboard

  Scenario: View Dashboard
    Given the user is on the dashboard page
    Then the user should see the dashboard

  Scenario Outline: User can see both KPIs
    Given the user is on the dashboard page
    When the user views the dashboard
    Then the user should see "<kpi>" information

    Examples:
      | kpi      |
      | products |
      | orders   |