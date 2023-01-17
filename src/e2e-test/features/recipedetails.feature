#
# Copyright © 2022 Cask Data, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.
#

@Integration_Tests
Feature: recipe details page
  Scenario: Should open recipe details page
    Given Navigate to Home Page
    Then Click on View All Button
    Then Verify if the Saved RecipeList table is loaded
    Then Click on the Kebab icon on each row
    Then Click on the View
    Then Verify if the user is on the Recipe details panel
    Then Click on close icon
