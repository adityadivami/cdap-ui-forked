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
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("toolbar-icon-structure"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }
  @Then("Click on the change data type")
  public void clickOnTheChangeDataType() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-changeDatatype"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Select the data type")
  public void SelectTheDataType() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("menu-item-string"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Verify if the user is on the select column panel")
  public void verifyIfTheUserIsOnTheSelectColumnPanel() {
    try {
      WaitHelper.waitForPageToLoad();
      Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("select-column-drawer")));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on the Back icon")
  public void clickOnTheBackIcon() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("back-icon"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on the Cross icon")
  public void clickOnTheCrossIcon() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("select-column-drawer-close-icon"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on the Search icon")
  public void clickOnTheSearchIcon() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("click-handle-focus"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Enter name of any column from the list")
  public void enterNameOfAnyColumnFromTheList() {
    try {
      WaitHelper.waitForPageToLoad();
      Helper.locateElementByTestId("input-search-id").sendKeys("Body_0");
      Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("radio-input-0")));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on the radio button of any column")
  public void clickOnTheRadioButtonOfAnyColumn() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("radio-input-0"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on the Done button")
  public void clickOnTheDoneButton() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("click-handle-focus"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Verify if the select column panel is closed")
  public void verifyIfTheSelectColumnIsClosed() {
     try {
       WaitHelper.waitForPageToLoad();
       Assert.assertFalse(Helper.isElementExists("select-column-drawer"));
     } catch (Exception e) {
       System.err.println("error:" + e);
     }
  }
}
