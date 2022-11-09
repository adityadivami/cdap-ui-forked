package io.cdap.cdap.ui.stepsdesign;

import io.cdap.cdap.ui.utils.Constants;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cucumber.java.en.Given;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Then;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.cdap.ui.utils.Helper;
import org.junit.Assert;




public class ColumnViewPanel {
    @Given("Navigate to Home Page")
    public void navigateToHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();

    }
    @Then("Click on the Data Explorations card")
    public void dataExplorationsCard() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card"));
            String url=SeleniumDriver.getDriver().getCurrentUrl();
            Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
    @Then("Verify if the column view button is displayed on the Grid Page")
    public void verifyColumnViewButtonDisplayed() {

    }
    @Then("click on columnview button")
    public void clickCloumnButton() {

    }
    @Then("verify columns names of that file displayed in panel")
    public void verifyColumnsName() {

    }
    @Then("Enter any name of the columns in the search field")
    public void verifySearchField() {

    }
    @Then("verify if the search result is displayed")
    public void verifySearchResult() {

    }
    @Then("Click on cross icon")
    public void clickOnCrossIcon() {

    }
    @Then("again click on columnview button and verify if the panel is closed")
    public void verifypanelclosed() {

    }
}
