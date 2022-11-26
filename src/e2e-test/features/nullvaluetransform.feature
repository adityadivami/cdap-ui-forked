@Integration_Tests
Feature: Find and Replace

  @FindAndReplace

  Scenario: Go through the find and replace functionality
    Given Navigate to Home Page of Wrangle
    Then Click on the Data Explorations card
    Then Verify if the Transformation Toolbar is displayed on the Grid Page
    Then Click on the null icon
    Then Click on the option with "remove-missing"
    Then Verify if the user is on the Add transformation step panel
    Then Click on the Select Column button
    Then Click on the radio button of any column "0"
    Then Click on the Done button
    Then Click on the Apply Step button

  Scenario: Go through the find and replace functionality
    Given Navigate to Home Page of Wrangle
    Then Click on the Data Explorations card
    Then Verify if the Transformation Toolbar is displayed on the Grid Page
    Then Click on the null icon
    Then Click on the option with "remove-null-missing"
    Then Verify if the user is on the Add transformation step panel
    Then Click on the Select Column button
    Then Click on the radio button of any column "3"
    Then Click on the Done button
    Then Click on the Apply Step button

  Scenario: Go through the find and replace functionality
    Given Navigate to Home Page of Wrangle
    Then Click on the Data Explorations card
    Then Verify if the Transformation Toolbar is displayed on the Grid Page
    Then Click on the null icon
    Then Click on the option with "remove-null"
    Then Verify if the user is on the Add transformation step panel
    Then Click on the Select Column button
    Then Click on the radio button of any column "1"
    Then Click on the Done button
    Then Click on the Apply Step button

  Scenario: Go through the find and replace functionality
    Given Navigate to Home Page of Wrangle
    Then Click on the Data Explorations card
    Then Verify if the Transformation Toolbar is displayed on the Grid Page
    Then Click on the null icon
    Then Click on the option with "replace-null-missing"
    Then Verify if the user is on the Add transformation step panel
    Then Click on the Select Column button
    Then Click on the radio button of any column "2"
    Then Click on the Done button
    Then Click on the field and enter text
    Then Click on the Apply Step button
