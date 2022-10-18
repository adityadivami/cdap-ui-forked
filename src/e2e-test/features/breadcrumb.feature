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
Feature: Breadcrumb - Navigate to the application
  @Breadcrumb
  Scenario: Navigate to the Data Source
    Given I navigate to the home page
    Then I click on the Data source
    Then I click on the first tab of second column
    Then I click on the first tab of third column
    Then I hover&click on the Wrangler
    Then I click on the Home link
    Then I click on the Data source
    Then I click on the first tab of second column
    Then I click on the first tab of third column
    Then I hover&click on the Wrangler
    Then I click on the Data Sources link
    Then I click on the Home link button
    Then I click on the Exploration
    Then I click on the Home link
    Then I check the text