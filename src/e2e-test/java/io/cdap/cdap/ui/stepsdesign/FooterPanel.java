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

public class FooterPanel {
  @Given("Navigate to Home Page to test footer")
  public void navigateToHomePageFooter() {
    WaitHelper.waitForPageToLoad();
    SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
  }

  @Then("Click on the Data Explorations card")
  public void clickOnTheDataExplorationCard() {
    try {
      WaitHelper.waitForPageToLoad();
      ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card-0"));
      String url = SeleniumDriver.getDriver().getCurrentUrl();
      Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
    } catch (Exception e) {
      System.err.println("error" + e);
    }
  }

  @Then("Verify if the Footer Panel is displayed")
  public void verifyIfTheFooterPanelIsDisplayed() {
    try {
      WaitHelper.waitForElementToBeDisplayed(
              Helper.locateElementByCssSelector(Helper.getCssSelectorByDataTestId("footer-panel-wrapper")));
//      WaitHelper.waitForPageToLoad();
//      Helper.isElementExists(Helper.getCssSelectorByDataTestId())
//      Assert.assertTrue(Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-wrapper")));
    } catch (Exception e) {
      System.err.println("error" + e);
    }
  }

  @Then("Verify if the elements on the Footer Panel are displayed")
  public void verifyIfTheElementsOnTheFooterPanelAreDisplayed() {
    try {
      WaitHelper.waitForPageToLoad();
      Assert.assertTrue(
      Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-column-view-panel-tab")));
      Assert.assertTrue(Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-meta-info-tab")));
      Assert.assertTrue(Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-zoom-tab")));
      Assert.assertTrue(Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-directives-tab")));
      Assert.assertTrue(
      Helper.isElementExists(Helper.getCssSelectorByDataTestId("footer-panel-recipe-steps-tab")));
    } catch (Exception e) {
      System.err.println("error" + e);
    }
  }
}
