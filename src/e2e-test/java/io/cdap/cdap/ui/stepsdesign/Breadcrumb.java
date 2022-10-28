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
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.cdap.ui.utils.Constants;

public class Breadcrumb {



    @Given("Navigate to the home page")
    public void navigateToTheHomePage() {

        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the connector type")
    public void clickOnTheDatasource() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("wranglecard-link-1"));
    }

    @Then("Click on the first tab of second column")
    public void clickOnTheFirstTabOfSecondColumn() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-exl"));
    }
    @Then("Click on the first tab of third column")
    public void clickOnTheFirstTabOfThirdColumn() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-information_schema"));
    }
    @When("Hover&Click on the Wrangler")
    public void hoverAndClickOnTheWrangler() {
        WaitHelper.waitForPageToLoad();
        WebElement ele = Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-sql_features");
        Actions action = new Actions(SeleniumDriver.getDriver());
        WaitHelper.waitForPageToLoad();
        action.moveToElement(ele).perform();
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("loadtogrid-wrangle-button"));
    }
    @Then("Click on the Data Sources link")
    public void clickONTheDataSourcesLink() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-data-sources-text"));
    }
    @Then("Check the url is equal to Datasource url text")
    public void dataSourcesText() {
        WaitHelper.waitForPageToLoad();
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/datasources/PostgreSQL");
    }
    @Then("Click on the Home link of wrangle page")
    public void clickOnTheHomeLink() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-home-text"));
    }
    @Then("Click on the Home link button")
    public void clickOnTheHomeLinkButton() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-home-link"));
    }
    @Then("Click on the Exploration card")
    public void clickOnTheExplorationCard() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoingdataexplorations-link-card"));
    }
    @Then("Check the url is equal to home url text")
    public void dashboard() {
        WaitHelper.waitForPageToLoad();
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/home");
    }
}
