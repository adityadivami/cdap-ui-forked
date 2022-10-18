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


import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class Breadcrumb {
    ChromeDriver driver;
    @Given("^I navigate to the home page$")
    public void navigateToTheHomePage() throws InterruptedException {
        driver = new ChromeDriver();
        System.out.println("hello world");
        driver.get("http://localhost:11011/cdap/ns/default/home");
        Thread.sleep(1000);
    }

    @Then("^I click on the Data source$")
    public void clickOnTheDatasource() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.id("wranglecard-link-13")).click();
    }

    @Then("^I click on the first tab of second column$")
    public void clickOnTheFirstTabOfSecondColumn() throws InterruptedException {
        Thread.sleep(10000);
        driver.findElement(By.id("connectionlist-connectiontabs-tabs-loop-1-0")).click();
    }

    @Then("^I click on the first tab of third column$")
    public void clickOnTheFirstTabOfThirdColumn() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.id("connectionlist-connectiontabs-tabs-loop-2-0")).click();
    }
    @When("^I hover&click on the Wrangler")
    public void hoverAndClickOnTheWrangler() throws InterruptedException{
        Thread.sleep(5000);
        WebElement ele = driver.findElement(By.id("connectionlist-connectiontabs-label-loop-3-0"));
        Actions action = new Actions(driver);
        Thread.sleep(5000);
        action.moveToElement(ele).perform();
        Thread.sleep(5000);
        driver.findElement(By.id("tablabelcansample-typography-2")).click();
    }

    @Then("^I click on the Data Sources link$")
    public void clickONTheDataSourcesLink() throws InterruptedException{
        Thread.sleep(5000);
        driver.findElement(By.id("breadcrumb-data-sources-text")).click();
    }

    @Then("^I click on the Home link$")
    public void clickOnTheHomeLink() throws InterruptedException {
        Thread.sleep(10000);
        driver.findElement(By.id("breadcrumb-home-text")).click();
    }

    @Then("^I click on the Home link button$")
    public void clickOnTheHomeLinkButton() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.id("connectionlist-subheader-1")).click();
    }

    @Then("^I click on the Exploration$")
    public void exploration() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.id("ongoingdataexplorations-link-1")).click();
    }

    @Then("^I check the text$")
    public void dashboard() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.id("wranglehome-1"));
    }
}
