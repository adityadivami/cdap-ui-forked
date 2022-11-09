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

public class WorkspaceList {
    @Given("Navigate to the Wrangle Home Page")
    public void navigateToTheWrangleHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the View all option")
    public void clickOnTheViewAllOption() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoing-explorations-view-all"));
    }

    @Then("Select & Click on the WorkSpace")
    public void selectAndClickOnTheWorkspace() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card-0"));
    }

    @Then("Click on the Workspace link")
    public void clickOnTheWorkspaceLink() {
        WaitHelper.waitForPageToLoad();
        boolean flag = true;
        while (flag == true) {
            if (Helper.isElementExists(Helper.getCssSelectorByDataTestId("loading-indicator"))) {
                flag = true;
            } else {
                flag = false;
            }
        }
            ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-data-sources-text"));
        }


    @Then("Check if the user is on workspace list")
    public void checkTheUserIsOnTheWorkspaceListOrNot() {
        String url = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(url, "http://localhost:11011/cdap/ns/default/workspace-list");
    }
}
