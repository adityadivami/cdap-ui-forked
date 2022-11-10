@Integration_Tests
Feature: TransformationToolbar

  @ADMIN_TEST
  Scenario: Go through the Import Dataset functionality
    Given Navigate to Home Page
    Then Click on the Connector type card
    Then Click on the Import Data button
    Then Click on the file drop zone to upload a file
    Then Click on the Delete icon
    Then Click on the Cross icon
    Then Click on the Import Data button
    Then Click on the file drop zone to upload a file
    Then Click on the Wrangle button
