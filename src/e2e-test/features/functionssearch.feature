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
Feature: Functions_Search

  @Functions_Search
  Scenario: Go through the Functions Search functionality
    Given Navigate to the Home Page
    Then Click on the Ongoing Data Explorations card
    Then Verify if the Transformation Toolbar is displayed on the Grid Page
    Then Click on the Search field and send the values
#    Then Enter name of the transformation in the search field and check the search results
#    Then Click on the transformation from results
#    Then Click on the Search field and check the recent history
#    Then Click on the Search field
#    Then Enter name of the transformation in the search field and check the search results
    Then Click on the Clear icon
