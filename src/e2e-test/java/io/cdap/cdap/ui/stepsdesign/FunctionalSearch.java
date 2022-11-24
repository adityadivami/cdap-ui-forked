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
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class FunctionalSearch {
       @Given("Navigate to the Home Page")
        public void navigateToTheHomePage() {
            SeleniumDriver.openPage(Constants.WRANGLE_HOME_URL);
            WaitHelper.waitForPageToLoad();
        }

        @Then("Click on the Ongoing Data Explorations card")
        public void clickOnTheOngoingDataExplorationsCard() {
            try {
                WaitHelper.waitForPageToLoad();
                ElementHelper.clickOnElement(Helper.locateElementByTestId("ongoing-data-exploration-card-0"));
                String url = SeleniumDriver.getDriver().getCurrentUrl();
                Assert.assertTrue(url.contains("http://localhost:11011/cdap/ns/default/wrangler-grid"));
            } catch (Exception e) {
                System.err.println("error:" + e);
            }
        }
        @Then("Verify if the Transformation Toolbar is displayed on the Grid Page")
        public void verifyIfTheTransformationToolbarIsDisplayedOnTheGridPage() {
            WaitHelper.waitForPageToLoad();
            try {
                boolean flag = true;
                while (flag == true) {
                    if (Helper.isElementExists(Helper.getCssSelectorByDataTestId("loading-indicator"))) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                }
                Assert.assertTrue(
                        Helper.isElementExists(Helper.getCssSelectorByDataTestId("transformations-toolbar-container")));
            } catch (Exception e) {
                System.err.println("error:" + e);
            }
        }

        @Then("Click on the Search field and send the values")
        public void clickOnTheSearchField() {
            try {

                WebElement element = Helper.locateElementByTestId("function-search-input-field");
                WebElement inputElement = SeleniumDriver.getDriver().findElement(By.xpath
                        ("//*[@data-testid='function-search-input-field']/input[@placeholder='Search for functions']"));
                Assert.assertTrue(ElementHelper.isElementDisplayed(inputElement));
                JavascriptExecutor executor = (JavascriptExecutor)SeleniumDriver.getDriver();
                executor.executeScript("arguments[0].click();", inputElement);
                inputElement.sendKeys("lowercase");
                String text = element.getText();
                System.out.println(text);
            } catch (Exception e) {
                System.err.println("error:" + e);
            }
        }

        @Then("Click on the Clear icon")
        public void clickOnTheCloseIcon() {
            try {
                WebElement element = Helper.locateElementByTestId("clear-search-icon");
                WaitHelper.waitForPageToLoad();
                element.click();
            } catch (Exception e) {
                System.err.println("error:" + e);
            }
        }
    }

