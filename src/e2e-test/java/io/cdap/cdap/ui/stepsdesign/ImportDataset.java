package io.cdap.cdap.ui.stepsdesign;

import io.cdap.cdap.ui.utils.Constants;
import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.junit.Assert;

public class ImportDataset {
    @Given("Navigate to Home Page")
    public void navigateToTheHomePage() {
        SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
        WaitHelper.waitForPageToLoad();
    }
    @Then("Click on the Connector type card")
    public void clickOnTheConnectionTypeCard() {
        try {
            WaitHelper.waitForPageToLoad();
            ElementHelper.clickOnElement(Helper.locateElementByTestId("item2"));
            String url=SeleniumDriver.getDriver().getCurrentUrl();
            Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/datasources/PostgreSQL"));
        } catch (Exception e) {
            System.err.println("error:" + e);
        }
    }
    @Then("Click on the Import Data button")
    public void clickOnTheImportDataCard() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("import-data"));
    }
    @Then("Click on the file drop zone to upload a file")
    public void clickOnTheFileDropZoneToUploadAFile() {
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("file-drop-zone"));
    }
    @Then("Click on the Delete icon")
    public void clickOnTheDeleteIon(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("delete-svg"));
    }
    @Then("Click on the Cross icon")
    public void clickOnTheCrossIcon(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("drawer-widget-close-round-icon"));
    }
    @Then("Click on the Wrangle button")
    public void clickOnTheWrangleIcon(){
        WaitHelper.waitForPageToLoad();
        ElementHelper.clickOnElement(Helper.locateElementByTestId("upload-button"));
    }
}
