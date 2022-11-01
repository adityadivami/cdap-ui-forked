/*
 * Copyright © 2022 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package io.cdap.cdap.ui.stepsdesign;


import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.cdap.ui.utils.Constants;

public class Breadcrumb {
    @Given("Navigate to the Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the View all option")
    public void clickOnTheViewAllOption() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("connector-types-view-all"));
    }
    @Then("Click on the Home link")
    public void  clickOnTheHomeLink(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("breadcrumb-home-link"));
    }
    @Then("Click on the Connector type card")
    public void clickOnTheConnectorTypeCard() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("wranglecard-link-1"));
    }
    @Then("Click on the another Connector type in Data Sources page")
    public void clickOnTheAnotherConnectorType() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("connections-tab-label-browse-File"));
    }
    @Then("Click on the Home link in Data Sources page")
    public void clickOnTheHomeLinkInDataSourcesPage() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("breadcrumb-home-link"));
    }
    @Then("Click on the Exploration card")
    public void clickOnTheExplorationCard(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card"));
    }
    @Then("Click on the Home link on wrangle page")
    public void clickOnTheHomeLinkOnWranglePage(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(
                Helper.locateElementByTestId("breadcrumb-home-text"));
    }
}
