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
  Scenario Outline: Navigate to the Data Source
    Given Navigate to the home page
    Then  Click on the Connector type with "<connectionLabel>" and "<connectionTestId>"
#    Then click on the postgreSQL
#    Then Click on the first tab of second column
#    Then Click on the first tab of third column
#    Then Hover&Click on the Wrangler
#    Then Click on the Home link of wrangle page
    Then Click on the Home link button
    Then Check the url is equal to home url text
#    Then Click on the Connector type
#    Then click on the postgreSQL
#    Then Click on the first tab of second column
#    Then Click on the first tab of third column
#    Then Hover&Click on the Wrangler
#    Then Click on the Data Sources link
#    Then Check the url is equal to Datasource url text
    Then Click on the Exploration card
    Then Click on the Home link of wrangle page
    Then Check the url is equal to home url text
    Examples:
         | connectionLabel | connectionTestId |
         | PostgreSQL | postgresql |
         | File | file |