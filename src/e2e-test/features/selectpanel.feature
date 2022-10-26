@Integration_Tests
Feature: User Selecting the Panels

  @Selectpanel
  Scenario: Selecting the columns in select panel
    Given I navigate to the Home Page
    When I click on the Exploration card
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Delete column from the column drop-down list
    Then I click on the back arrow icon in pop-up window
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Delete column from the column drop-down list
    Then I click on the close icon in pop-up window
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Delete column from the column drop-down list
    Then I click on the search icon
    Then I click on the search field bar
    Then I click on the checkboxes
    And I click on the Done button in pop-up window
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Join two column from the column drop-down list
    Then I click on the back arrow icon in pop-up window
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Join two column from the column drop-down list
    Then I click on the close icon in pop-up window
    Then I click on the Column Icon at Transformation Toolbar
    Then I select the value Join two column from the column drop-down list
    Then I click on the search icon
    Then I click on the search field bar
    Then I click on the checkboxes
    And I click on the Done button in pop-up window
    Then I click on the Structure Icon at Transformation Toolbar
    Then I click on the Change data type option
    Then I select the String data type
    Then I click on the back arrow icon in pop-up window
    Then I click on the Structure Icon at Transformation Toolbar
    Then I click on the Change data type option
    Then I select the String data type
    Then I click on the close icon in pop-up window
    Then I click on the Structure Icon at Transformation Toolbar
    Then I click on the Change data type option
    Then I select the String data type
    Then I click on the search icon
    Then I click on the search field bar
    Then I select the Radio button
    And I click on the Done button in pop-up window