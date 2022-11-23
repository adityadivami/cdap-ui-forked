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

public class FunctionsSearch {
    @Given("Navigate to the Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the Ongoing Data Explorations card")
    public void clickOnTheOngoingDataExplorationsCard() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoing-data-exploration-card-0"));
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
            Assert.assertTrue(
                    Helper.isElementExists(Helper.getCssSelectorByDataTestId("transformations-toolbar-container")));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Click on the Search field and send the values")
    public void clickOnTheSearchField() {
        try {

            WebElement element = Helper.locateElementByTestId("function-search-input-field");
            WaitHelper.waitForPageToLoad();
            element.click();
            element.sendKeys("lowercase");
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

//    @Then("Enter name of the transformation in the search field and check the search results")
//    public void enterNameOfAnyColumnFromTheList() {
//        try {
//            WaitHelper.waitForPageToLoad();
//            Helper.locateElementByTestId("function-search-input-field").sendKeys("lowercase");
//            Assert.assertTrue(ElementHelper.isElementDisplayed
//                    (Helper.locateElementByTestId("functions-search-recent-results")));
//        } catch (Exception e) {
//            System.err.println("error:" + e);
//        }
//    }

//    @Then("Click on the transformation from results")
//    public void clickOnTheTransformationFromResults() {
//        try {
//            WaitHelper.waitForPageToLoad();
//            ElementHelper.clickOnElement(Helper.locateElementByTestId("search-result-lowercase"));
//        } catch (Exception e) {
//            System.err.println("error:" + e);
//        }
//    }

//    @Then("Click on the Search field and check the recent history")
//    public void clickOnTheSearchFieldAndCheckTheRecentHistory() {
//        try {
//            WaitHelper.waitForPageToLoad();
//            ElementHelper.clickOnElement(Helper.locateElementByTestId("function-search-input-field"));
//            Assert.assertTrue(ElementHelper.isElementDisplayed
//                    (Helper.locateElementByTestId("function-search-recent-results")));
//        } catch (Exception e) {
//            System.err.println("error:" + e);
//        }
//    }

    @Then("Click on the Clear icon")
    public void clickOnTheCloseIcon() {
        try {
            WebElement element = Helper.locateElementByTestId("clear-search-icon");
            WaitHelper.waitForPageToLoad();
            element.click();
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
}
