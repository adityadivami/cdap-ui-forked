@Integration_Tests
  Feature: Workspaces List

    @WorkspacesList
    Scenario: Navigating through the Workspaces list
      Given Navigate to the Home Page
      Then Click on the View all option
      Then Select & Click on the WorkSpace
      Then Click on the Workspace link
      Then Check the user is on workspace list or not
      Then Click on the Home link


