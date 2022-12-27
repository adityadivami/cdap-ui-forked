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

public class AddTransformation {
  @Given("Navigate to the home page")
  public void navigateToTheHomePage() {
    SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
    WaitHelper.waitForPageToLoad();
  }

  @Then("Click on the Data Exploration card")
  public void clickOnTheDataExploration() {
    WaitHelper.waitForPageToLoad();
    WebElement ele = Helper.locateElementByTestId("ongoing-data-explore-card-link-0");
    ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoing-data-explore-card-link-0"));
    String url = SeleniumDriver.getDriver().getCurrentUrl();
    Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
  }

  @Then("Click on the Structure icon")
  public void clickOnTheStructureIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("toolbar-icon-button-Structure"));
  }

  @Then("Click on the Change data type")
  public void clickOnTheChangeDataType() {
    ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-changeDatatype"));
  }

  @Then("Select the data type")
  public void selectTheDataType() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-string"));
  }

  @Then("Verify if the user is on the Add transformation panel")
  public void verifyIfTheUserIsOnTheAddTransformationScreen() {
    WaitHelper.waitForPageToLoad();
    Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("add-transformation-drawer")));
  }

  @Then("Click on the Cross icon")
  public void clickOnTheCrossIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("add-transformation-drawer-close"));
  }

  @Then("Click on the Select column button")
  public void clickOnTheSelectColumnButton() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("select-column-button"));
  }

  @Then("Click on the Search icon")
  public void clickOnTheSearchIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("click-handle-focus"));
  }
  @Then("Enter column name {string} in the field")
  public void enterNameOfColumn(String columnName) {
    WebElement ele = Helper.locateElementByTestId("input_id");
    ele.click();
    ele.sendKeys(columnName);
  }

  @Then("Click on the radio button")
  public void clickOnTheRadioButton() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("radio-input-1"));
  }
  @Then("Click on the cross icon of select column")
  public void crossIconOfSelectColumn() {
    ElementHelper.clickOnElement(Helper.locateElementByTestId("select-column-drawer-close"));
  }

  @Then("Click on the Done button")
  public void clickOnTheDoneButton() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("button_done"));
  }

  @Then("Click on the Apply Step button")
  public void clickOnTheApplyStepButton() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("apply-step-button"));
  }
}
