package io.cdap.cdap.ui.stepsdesign;

import io.cdap.cdap.ui.utils.Constants;
import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

public class WorkspacesList {
    @Given("Navigate to the Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the View all option")
    public void clickOnTheViewAllOption(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("data-testid"));
    }
    @Then("Select & Click on the WorkSpace")
    public void selectAndClickOnTheWorkspace(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("data-testid"));
    }
    @Then("Click on the Workspace link")
    public void clickOnTheWorkspaceLink(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("data-testid"));
    }
    @Then("Check the user is on workspace list or not")
    public void checkTheUserIsOnTheWorkspaceListOrNot(){
        String url= SeleniumDriver.getDriver()

    }
    @Then("Click on the Home link")
    public void clickOnTheHomeLink(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("data-testid"));
    }
}
