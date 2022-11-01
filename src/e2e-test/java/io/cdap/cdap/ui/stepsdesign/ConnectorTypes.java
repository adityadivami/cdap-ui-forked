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
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cucumber.java.en.Then;
import org.junit.Assert;

public class ConnectorTypes {
    @Given("Navigate to the Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }

    @Then("Click on the \\\"(.*)\\\" connection with test id \\\"(.*)\\\"")
    public void clickOnConnections(String connectionLabel, String connectionTestId) {
        try {
            ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangle-card-" + connectionTestId));
            System.out.println(connectionLabel + " Element is found successfully");
            System.out.println("Clicked on " + connectionLabel + " Element");
            WaitHelper.waitForPageToLoad();
            if (connectionLabel.equals("Add Connections")) {
                String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/connections/create");
                System.out.println("Navigated to " + connectionLabel + " Page - Old UI");
            } else if (connectionLabel.equals("Import Data")) {
                String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/home");
            } else {
                String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/datasources/" + connectionLabel);
                System.out.println("Navigated to Data Source page with connection " + connectionLabel + " selected");
            }
        } catch (Exception e) {
            System.err.println("error: "+e);
        }
    }
}
