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

import javax.swing.*;

public class ColumnInsightsPanel {
    @Given("Navigate to Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the Data Explorations card")
    public void clickOnTheDataExplorationCard() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card-0"));
            String url = SeleniumDriver.getDriver().getCurrentUrl();
            Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Click on any column from grid table")
    public void clickOnAnyColumnFromGridTable() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("grid-header-cell-1"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Verify if user changes the column name as {string}")
    public void verifyIfUserChangesTheColumnName(String inputValue) {
        try {
            WaitHelper.waitForPageToLoad();
           WebElement edit = Helper.locateElementByXPath("//svg[@data-testid=edit-icon']");
            Actions action = new Actions(SeleniumDriver.getDriver());
            action.moveToElement(edit).click(edit);
            action.perform();
           boolean check1= edit.isSelected();
            System.out.println(check1);
            Helper.locateElementByXPath("//input[@data-testid='column-name-edit-input']").click();
            Helper.locateElementByXPath("//input[@data-testid='column-name-edit-input']").clear();
            Helper.locateElementByXPath("//input[@data-testid='column-name-edit-input']").sendKeys(inputValue);
            ElementHelper.clickOnElement(Helper.locateElementByTestId("edit-icon"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("verify if edited name as {string} displayed for column")
    public void editedNameDisplayed(String inputValue) {
        try {
            String edited = Helper.locateElementByTestId("grid-header-cell-" + inputValue).getText();
            Assert.assertEquals(edited, inputValue);
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Verify if user changes the data type")
    public void verifyIfUserChangesTheDataType() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("datatype-input-select"));
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByXPath("//ul/li[@data-testid='input-select-1']" ));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("verify if selected datatype is displayed for column as per \\\"(.*)\\\"")
    public void datatypeDisplayed(int id) {
        try {
            String text = Helper.locateElementByTestId("datatype-input-select").getText();
            String edited = Helper.locateElementByTestId("input-select-" + id).getText();
            if (edited.equals(text)) {
                ElementHelper.clickOnElement(Helper.locateElementByTestId("drawer-widget-close-round-icon"));
                String columnType = Helper.locateElementByTestId("typography-component-" + edited).getText();
                Assert.assertEquals(columnType, edited);
            }
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }

    @Then("Click on the Cross icon")
    public void clickOnTheCrossIcon() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("drawer-widget-close-round-icon"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
}