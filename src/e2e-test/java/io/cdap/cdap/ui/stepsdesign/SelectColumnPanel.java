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

public class SelectColumnPanel {
  @Then("Click on the Structure icon")
  public void clickOnTheStructureIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("toolbar-icon-structure"));
  }
  @Then("Click on the change data type")
  public void clickOnTheChangeDataType() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-changeDatatype"));
  }

  @Then("Select the data type")
  public void selectTheDataType() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-string"));
  }

  @Then("Verify if the user is on the select column panel")
  public void verifyIfTheUserIsOnTheSelectColumnPanel() {
    WaitHelper.waitForPageToLoad();
    Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("select-column-drawer")));
  }

  @Then("Click on the Back icon")
  public void clickOnTheBackIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("back-icon"));
  }

  @Then("Click on the Cross icon")
  public void clickOnTheCrossIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("select-column-drawer-close-icon"));
  }

  @Then("Click on the Search icon")
  public void clickOnTheSearchIcon() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("click-handle-focus"));
  }

  @Then("Enter name of any column from the List")
  public void enterNameOfAnyColumnFromTheList() {
    WaitHelper.waitForPageToLoad();
    Helper.locateElementByTestId("input-search-id").sendKeys("Body_0");
    Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("radio-input-0")));
  }

  @Then("Click on the radio button of any column")
  public void clickOnTheRadioButtonOfAnyColumn() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("radio-input-0"));
  }

  @Then("Click on the Done button")
  public void clickOnTheDoneButton() {
    WaitHelper.waitForPageToLoad();
    ElementHelper.clickOnElement(Helper.locateElementByTestId("click-handle-focus"));
  }

  @Then("Verify if the select column panel is closed")
  public void verifyIfTheSelectColumnIsClosed() {
    WaitHelper.waitForPageToLoad();
    Assert.assertFalse(Helper.isElementExists("select-column-drawer"));
  }
}
