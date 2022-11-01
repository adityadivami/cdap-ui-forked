package io.cdap.cdap.ui.stepsdesign;

import io.cdap.cdap.ui.utils.Constants;
import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.junit.Assert;

public class OngoingDataExploration {
    @Given("Navigate to the home page")
    public void navigateToTheHomePage(){
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the Data Exploration")
    public void clickOnTheDataExploration(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card"));
    }
    @Then("Check the data exploration text is showing or not")
    public void checkTheDataExplorationFile(){
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/wrangler-grid/b53e2cbe-23a8-4cee-a69b-70c26dec5c6b");
    }
    @Then("Click on the Home link")
    public void clickONTheHomeLink(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-home-text"));
    }
    @Then("Check the user is on the home page or not")
    public void checkTheUserIsOnTheHomePageOrNot(){
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/home");
    }
}