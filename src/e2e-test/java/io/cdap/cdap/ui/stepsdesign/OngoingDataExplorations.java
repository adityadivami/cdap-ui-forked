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

public class OngoingDataExplorations {
    @Given("Navigate to the Home Page")
    public void navigateToTheHomePage(){
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the Data Explorations Card")
    public void clickOnTheDataExplorationsCard(){
        WaitHelper.waitForPageToLoad();
        WebElement ele = Helper.locateElementByTestId("home-ongoing-explorations-text-0");
        String homeText = ele.getText();
        System.out.println(homeText);
        ElementHelper.clickOnElement(Helper.locateElementByTestId("wrangler-home-ongoing-data-exploration-card"));
        String url=SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
        WebElement test = Helper.locateElementByTestId("breadcrumb-workspace-name");
        String ActualText= test.getText();
        System.out.println(ActualText);
        Assert.assertEquals(ActualText, homeText );
        System.out.println("The file name is displayed correctly on grid page");
    }
    @Then("Click on the Home link")
    public void clickOnTheHomeLink(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("breadcrumb-home-text"));
        System.out.println("the home link is clicked");
    }
    @Then("Check if the user is on the Home Page")
    public void checkIfTheUserIsOnTheHomePage(){
        String ActualText = SeleniumDriver.getDriver().getCurrentUrl();
        Assert.assertEquals(ActualText, "http://localhost:11011/cdap/ns/default/home");
        System.out.println("The assertion for home url is passed");
    }
}
