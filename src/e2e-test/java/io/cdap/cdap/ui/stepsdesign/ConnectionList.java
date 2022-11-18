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

import io.cdap.cdap.ui.utils.Constants;
import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.junit.Assert;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

public class ConnectionList {
    @Given("Navigate to Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the Connector type card with \\\"(.*)\\\"")
    public void clickOnTheConnectionTypeCard(String testId) {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("connector-type-" + testId));
            String url = SeleniumDriver.getDriver().getCurrentUrl();
            Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/datasources/"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Verify if the Wrangle button is visible")
    public void clickOnFirstTabOfTheSecondColumn() {
        try {
            for (int i = 1; i <= 10; i++) {
                WebElement ele = Helper.locateElementByTestId("connections-tab-column" + i + "-item0");
                if (ElementHelper.isElementDisplayed(ele)) {
                    System.out.println("element found at index = " + i);
                    // WebElement button = Helper.locateElementByTestId("connection-tab-label-" + i
                    // + "0");
                    Actions action = new Actions(SeleniumDriver.getDriver());
                    action.moveToElement(ele).build().perform();
                    Helper.waitSeconds(10);
                    if (Helper.isElementExists("connections-tab-label-can-simple-" + i)) {
                        Helper.isElementExists("wrangle-text");
                        System.out.println("wrangle text is visible");
                        break;
                    } else {
                        ele.click();
                        System.out.println("folder clicked");
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("error: " + e);
        }
    }

    @Then("Click on the Add connection button")
    public void clickOnTheAddConnectionButton() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("sub-header-handle-add-connection"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Click on the Cross icon")
    public void clickOnTheCrossIcon() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("close-icon"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Check if the infography is displayed")
    public void checkIfTheInfographyIsDisplayed() {
        try {
            WaitHelper.waitForPageToLoad();
            Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("home-infographic-icon")));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Click on Search icon")
    public void clickOnSearchIcon() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("search-icon-1"));
    }

    @Then("Enter file name {string} and verify the result")
    public void verifyFileResult(String fileName) {
        WaitHelper.waitForPageToLoad();
        WebElement ele = Helper.locateElementByTestId("search-field-1");
        ele.click();
        ele.sendKeys(fileName);
        String text = Helper.locateElementByTestId("connections-tab-column1-item0").getText();
        Assert.assertEquals(fileName, text);
    }

    @Then("Click on clear icon")
    public void clickClearIcon() {
        ElementHelper.clickOnElement(Helper.locateElementByTestId("clear-search-icon-1"));
    }
}
