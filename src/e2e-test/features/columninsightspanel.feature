@Integration_Tests
Feature: ColumnInsightsPanel

  @ADMIN_TEST
  Scenario: Go through the Column Insights Panel
    Given Navigate to Home Page
    Then Click on the Data Explorations card
    Then Click on any column from grid table
    Then Verify if user changes the column name
    Then Verify if user changes the data type
    Then Click on the Cross icon