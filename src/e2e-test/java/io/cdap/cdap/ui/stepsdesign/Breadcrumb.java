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
import org.junit.Assert;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.cdap.ui.utils.Constants;

public class Breadcrumb {



    @Given("Navigate to the home page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the Connector type with \\\"(.*)\\\" and \\\"(.*)\\\"")
    public void clickOnTheConnectorType(String connectionLabel,String connectionTestId) {
        try {
            ElementHelper.clickOnElement(Helper.locateElementByTestId("connector-type-" + connectionTestId));
            System.out.println("Clicked on " + connectionLabel + " Element");
            WaitHelper.waitForPageToLoad();
            if (connectionLabel.equals("Add Connections")) {
                ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangle-card-" + connectionTestId));
                System.out.println("Clicked on " + connectionLabel + " Element");
                WaitHelper.waitForPageToLoad();
                String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/connections/create");
                System.out.println("Navigated to " + connectionLabel + " Page - Old UI");
            }
            if (connectionLabel.equals("PostgreSQL") || connectionLabel.equals("File")) {
                String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/datasources/" + connectionLabel);
                System.out.println("Navigated to Data Source page wit connection " + connectionLabel + " selected");
            }
        }catch(Exception e)
        {
            System.out.println(connectionLabel + " Element does not exist");
        }
    }

//    @Then("click on the postgreSQL")
//    public void clickPostgreSql(){
//
//        WaitHelper.waitForPageToLoad();
//        ElementHelper.clickOnElement(Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-PostgreSQL"));
//    }
//
//
//    @Then("Click on the first tab of second column")
//    public void clickOnTheFirstTabOfSecondColumn() {
//        WaitHelper.waitForPageToLoad();
//        ElementHelper.clickOnElement(Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-EXL"));
//    }
//    @Then("Click on the first tab of third column")
//    public void clickOnTheFirstTabOfThirdColumn() {
//        WaitHelper.waitForPageToLoad();
//        ElementHelper.clickOnElement(Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-information_schema"));
//    }
//    @When("Hover&Click on the Wrangler")
//    public void hoverAndClickOnTheWrangler() {
//        WaitHelper.waitForPageToLoad();
//        WebElement ele = Helper.locateElementByTestId("connectionlist-connectiontabs-tabs-loop-sql_features");
//        Actions action = new Actions(SeleniumDriver.getDriver());
//        WaitHelper.waitForPageToLoad();
//        action.moveToElement(ele).perform();
//        WaitHelper.waitForPageToLoad();
//        ElementHelper.clickOnElement(Helper.locateElementByTestId("loadtogrid-wrangle-button"));
//    }
//    @Then("Click on the Data Sources link")
//    public void clickONTheDataSourcesLink() {
//        WaitHelper.waitForPageToLoad();
//        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-data-sources-text"));
//    }
//    @Then("Check the url is equal to Datasource url text")
//    public void dataSourcesText() {
//        WaitHelper.waitForPageToLoad();
//        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
//        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/datasources/Imported%20Datasets");
//    }
    @Then("Click on the Home link of wrangle page")
    public void clickOnTheHomeLink() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByXPath("breadcrumb-home-text"));
    }
    @Then("Click on the Home link button")
    public void clickOnTheHomeLinkButton() {
        WaitHelper.waitForPageToLoad();
        WaitHelper.waitForElementToBeEnabled(
                Helper.locateElementByTestId("breadcrumb-home-link"));
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-home-link"));
    }
    @Then("Click on the Exploration card")
    public void clickOnTheExplorationCard() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoing-data-explorations-sql_features-1"));
    }
    @Then("Check the url is equal to home url text")
    public void dashboard() {
        WaitHelper.waitForPageToLoad();
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/home");
    }
}
