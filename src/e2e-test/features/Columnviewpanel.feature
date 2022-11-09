@Integration_Tests
Feature: Column View panel

@divami
  Scenario: shows column view panel functionality
  Given Navigate to Home Page
  Then Click on the Data Explorations card
  Then Verify if the column view button is displayed on the Grid Page
  Then click on columnview button
  Then verify columns names of that file displayed in panel
  Then Enter any name of the columns in the search field
  Then verify if the search result is displayed
  Then Click on cross icon
  Then click on columnview button
  Then again click on columnview button and verify if the panel is closed

