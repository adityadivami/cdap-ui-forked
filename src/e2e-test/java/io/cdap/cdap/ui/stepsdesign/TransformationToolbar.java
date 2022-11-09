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


public class TransformationToolbar {
    @Given("Navigate to Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the Data Explorations card")
    public void clickOnTheDataExplorationCard() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card"));
            String url = SeleniumDriver.getDriver().getCurrentUrl();
            Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
    @Then("Verify if the Transformation Toolbar is displayed on the Grid Page")
    public void verifyIfTheTransformationToolbarIsDisplayedOnTheGridPage() {
        WaitHelper.waitForPageToLoad();
        try {
            boolean flag = true;
            while (flag == true) {
                if (Helper.isElementExists(Helper.getCssSelectorByDataTestId("loading-indicator"))) {
                    flag = true;
                } else {
                    flag = false;
                }
            }
            Assert.assertTrue(Helper.isElementExists
                    (Helper.getCssSelectorByDataTestId("transformations-toolbar-container")));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
    @Then("Verify if all icons are displayed on Toolbar with \\\"(.*)\\\"")
    public void verifyAllTheIconsAreDisplayedOnToolbar(String testId) {
        try {
            WaitHelper.waitForPageToLoad();
            Assert.assertTrue(Helper.isElementExists(Helper.getCssSelectorByDataTestId("toolbar-icon-"
                    + testId)));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
    @Then("Click on the function names toggle with testId as \\\"(.*)\\\" and \\\"(.*)\\\"")
    public void clickOnTheSliderButton(String testId, String iconLabelName) {
        try {
            WaitHelper.waitForPageToLoad();
            WebElement ele = Helper.locateElementByXPath
                    ("//input[@data-testid='transformations-toolbar-icons-function-name-toggler']");
            Actions action = new Actions(SeleniumDriver.getDriver());
            WaitHelper.waitForPageToLoad();
            action.moveToElement(ele).perform();
            ele.click();
            WaitHelper.waitForPageToLoad();
            WebElement icon = Helper.locateElementByTestId("toolbar-icon-title-" + testId);
            String text = icon.getText();
            String actual = iconLabelName;
            Assert.assertEquals(text, actual);
        } catch (Exception e) {
            System.err.println("error: " + e);
        }
    }
    @Then("Verify by Clicking on the Up and Down arrow icon")
    public void clickOnTheUpAndDownArrowButton() {
        try {
            WaitHelper.waitForPageToLoad();
            WebElement ele = Helper.locateElementByXPath("//*[@data-testid='toggle-toolbar-header']");
            Actions action = new Actions(SeleniumDriver.getDriver());
            WaitHelper.waitForPageToLoad();
            action.moveToElement(ele).perform();
            ele.click();
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
}
