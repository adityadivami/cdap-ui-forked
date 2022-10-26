package io.cdap.cdap.ui.stepsdesign;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.chrome.ChromeDriver;

public class Selectpanel {
    ChromeDriver driver;

    @Given("^I navigate to the Home Page$")
    public void navigateToHomePage() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("http://localhost:11011/cdap/ns/default/home");
        Thread.sleep(5000);
    }

    @When("^I click on the Exploration card$")
    public void clickOnTheExplorationCard() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("wrangler-home-ongoing-data-exploration-card")).click();
    }

    @Then("^I click on the Column Icon at Transformation Toolbar$")
    public void clickOnTheColumnIcon() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("Column")).click();
    }

    @Then("^I select the value Delete column from the column drop-down list$")
    public void selectTheValueFromDropdownList() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("delete-1")).click();
    }

    @Then("^I click on the back arrow icon in pop-up window$")
    public void clickOnTheBackArrowIconAtDeleteColumnPopupWindow() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("box-id")).click();
    }

    @Then("^I click on the checkboxes$")
    public void clickOnTheCheckboxes() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("check-box-input-checkbox-0")).click();
        Thread.sleep(5000);
        driver.findElement(By.id("check-box-input-checkbox-1")).click();
    }

    @Then("^I click on the search icon$")
    public void clickOnTheSearchIcon() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("click-handle-focus")).click();
    }

    @Then("^I click on the search field bar$")
    public void clickOnTheSearchField() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("input_id")).click();
        driver.findElement(By.id("input_id")).sendKeys("Feature_name");
        Thread.sleep(3000);
        for(int i=0;i<12;i++){
            driver.findElement(By.id("input_id")).sendKeys(Keys.BACK_SPACE);
        }
    }

    @Then("^I click on the close icon in pop-up window$")
    public void clickOnTheCloseIconAtDeleteColumnPopupWindow() throws InterruptedException{
        Thread.sleep(1000);
        driver.findElement(By.id("drawer-widget-close-round-icon")).click();
    }

    @And("^I click on the Done button in pop-up window$")
    public void clickOnTheDoneButton() throws  InterruptedException{
        Thread.sleep(3000);
        driver.findElement(By.id("add-transform-button")).click();
    }

    @Then("^I select the value Join two column from the column drop-down list$")
    public void selectTheValueJoinTwoColumn() throws  InterruptedException{
        Thread.sleep(3000);
        driver.findElement(By.id("join-columns-4")).click();
    }

    @Then("^I click on the Structure Icon at Transformation Toolbar$")
    public void clickOnTheStructureIcon() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("Structure")).click();
    }

    @Then("^I click on the Change data type option$")
    public void clickOnTheChangeDataTypeOption() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("changeDatatype-0")).click();
    }

    @Then("^I select the String data type$")
    public void selectTheStringDataType() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("string-0")).click();
    }

    @Then("^I select the Radio button$")
    public void selectTheRadioButton() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("radio-input-radio-0")).click();
    }
}
