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

import io.cdap.cdap.ui.utils.Helper;
import io.cdap.e2e.utils.ElementHelper;
import io.cdap.e2e.utils.SeleniumDriver;
import io.cdap.e2e.utils.WaitHelper;
import io.cucumber.java.en.Then;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;


public class EditRecipe {
    @Then("Click on View All Button")
    public void clickOnTheViewAllButton() {
      ElementHelper.clickOnElement(Helper.locateElementByTestId("view-all-recipes"));
}

@Then("Verify if the Saved RecipeList table is loaded")
  public void verifyIfTheUserIsOnTheSavedRecipeListPage() {
    WaitHelper.waitForPageToLoad();
    Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-table-container")));
  }

@Then("Click on the Kebab icon on each row")
  public void clickOnTheKebabIcon() {
    List<WebElement> allRecipesName = SeleniumDriver.getDriver().findElements(
    By.xpath("//*[starts-with(@data-testid,'kebab-icon-')]"));
    WebElement ele = allRecipesName.get(0);
    ele.click();
  }
  
@Then("Click on the Edit")
  public void clickOnTheEditIcon() {
    ElementHelper.clickOnElement(Helper.locateElementByTestId("Edit-on-popover"));
 }
 
 @Then("Verify if the user is on the Edit Recipe panel")
 public void verifyIfTheUserIsOnTheEditRecipePanel() {
   Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("editRecipe-drawer-widget")));
}

@Then("Verify if Edit Recipe panel has Recipe Name TextField and Description TextArea")
public void verifyIfTheEditRecipePanelHasForm() {
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-form-parent")));
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-form-name-field")));
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-form-description-field")));
}

@Then("Verify if Edit Recipe panel has Cancel")
public void verifyIfTheEditRecipePanelHasCancelButton() {
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-form-cancel-button")));
}

@Then("Enter RecipeName in the TextField and Description in the TextArea")
public void enterRecipeNameAndDescription() {
  WebElement recipeName = Helper.locateElementByTestId("recipe-name-input");
  recipeName.click();
  recipeName.clear();
  recipeName.sendKeys("lavanya");
  WebElement description = Helper.locateElementByTestId("recipe-form-description-field");
  description.click();
  description.sendKeys("updated");
  Assert.assertTrue((Helper.locateElementByTestId("recipe-form-cancel-button").isEnabled()));
}

@Then("Check Save Button is Enabled")
public void verifyIfTheSaveButtonIsEnabled() {
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("recipe-form-save-button")));
}

@Then("Click on Save Button")
public void clickOnSaveButton() {

      ElementHelper.clickOnElement(Helper.locateElementByTestId("recipe-form-save-button"));
}

@Then("Verify if the Edit Recipe panel is closed")
public void verifyEditRecipePanelClosed() {
      Assert.assertFalse(Helper.isElementExists("EDIT_RECIPE-drawer-widget"));
}

@Then("Verify if SnackBar is opened")
public void verifyIfSnackbarIsOpened() {
  Assert.assertTrue(ElementHelper.isElementDisplayed(Helper.locateElementByTestId("snackbar-alert")));
}
}
