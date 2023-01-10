// /*
//  * Copyright © 2022 Cask Data, Inc.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License"); you may not
//  * use this file except in compliance with the License. You may obtain a copy of
//  * the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//  * License for the specific language governing permissions and limitations under
//  * the License.
//  */

// package io.cdap.cdap.ui.stepsdesign;

// import io.cdap.cdap.ui.utils.Helper;
// import io.cdap.e2e.utils.ElementHelper;
// import io.cdap.e2e.utils.SeleniumDriver;
// import io.cdap.e2e.utils.WaitHelper;
// import io.cucumber.java.en.Then;
// import org.junit.Assert;
// import org.openqa.selenium.By;
// import org.openqa.selenium.WebElement;

// import java.util.List;


// public class EditRecipe {
//     @Then("Click on View All Button")
//     public void clickOnTheViewAllButton() {
//       ElementHelper.clickOnElement(Helper.locateElementByTestId("view-all-recipes"));
// }

// @Then("Verify if the Saved RecipeList table is loaded")
//   public void verifyIfTheUserIsOnTheSavedRecipeListPage() {
//     WaitHelper.waitForPageToLoad();
//     Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-table-container")));
//   }

// @Then("Click on the Kebab icon on each row")
//   public void clickOnTheKebabIcon() {
//     ElementHelper.clickOnElement(Helper.locateElementByTestId(""));
//   }

