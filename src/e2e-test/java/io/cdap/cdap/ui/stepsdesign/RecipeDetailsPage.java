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
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

public class RecipeDetailsPage {
  @Given("Navigate to home page to test Recipe details page")
  public void navigateToHomePageToTestRecipeDetails() {
    try {
      SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
      WaitHelper.waitForPageToLoad();
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on ongoing data exploration for recipe details")
  public void clickOnTheDataExplorationCardForRecipeDetails() {
    try {
      WaitHelper.waitForPageToLoad();
      List<String> productName = new ArrayList<String>();
      List<WebElement> allProductsName = SeleniumDriver.getDriver().findElements(
       By.xpath(".//*[@data-testid='wrangler-home-ongoing-data-exploration-card']"));
      ElementHelper.clickOnElement(allProductsName.get(0));
      String url = SeleniumDriver.getDriver().getCurrentUrl();
      Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Click on recipe name on grid page")
  public void clickOnRecipeName() {
    try {
      WaitHelper.waitForPageToLoad();
      Helper.waitSeconds(5);
      WaitHelper.waitForElementToBeDisplayed(Helper.locateElementByTestId("recipe-box-0"));
      WaitHelper.waitForElementToBeClickable(Helper.locateElementByTestId("recipe-box-0"));
      ElementHelper.clickOnElement(Helper.locateElementByTestId("recipe-box-0"));
    } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }

  @Then("Verify if Recipe details page is displayed")
  public void verifyRecipeDetailsPanel() {
    try {
      WaitHelper.waitForElementToBeDisplayed(Helper.locateElementByTestId("select-column-drawer"));
      Assert.assertTrue(ElementHelper.isElementDisplayed
              (Helper.locateElementByTestId("select-column-drawer")));
  } catch (Exception e) {
      System.err.println("error:" + e);
    }
  }
}
