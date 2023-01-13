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

import { FormControl } from '@material-ui/core';
import {
  CancelButton,
  CreateRecipeFormButtonWrapper,
  EditRecipeFormButtonWrapper,
  ErrorLabel,
  ErrorTextField,
  FormFieldWrapper,
  Label,
  NormalTextField,
  SaveButton,
  StyledTextAreaAutosize,
} from 'components/RecipeManagement/RecipeForm/styles';
import { IRecipeFormProps } from 'components/RecipeManagement/types';
import T from 'i18n-react';
import React, { FormEvent } from 'react';

export const CREATE_RECIPE = 'createRecipe';
const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';

export default function RecipeForm({
  recipeFormData,
  isRecipeNameError,
  recipeNameErrorMessage,
  onRecipeNameChange,
  onFormSubmit,
  onCancel,
  isSaveDisabled,
  recipeFormAction,
  onRecipeDescriptionChange,
}: IRecipeFormProps) {
  const StyledLabel = isRecipeNameError ? ErrorLabel : Label;
  const StyledTextField = isRecipeNameError ? ErrorTextField : NormalTextField;
  const StyledFormButtonWrapper =
    recipeFormAction === CREATE_RECIPE
      ? CreateRecipeFormButtonWrapper
      : EditRecipeFormButtonWrapper;

  return (
    <>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => onFormSubmit(event)}
        data-testid="recipe-form-parent"
      >
        <FormFieldWrapper>
          <StyledLabel data-testid="recipe-form-name-label" component="span">
            {recipeFormAction === CREATE_RECIPE && T.translate(`${PREFIX}.createRecipeNameLabel`)}
            {!(recipeFormAction === CREATE_RECIPE) && T.translate(`${PREFIX}.editRecipeNameLabel`)}
          </StyledLabel>
          <StyledTextField
            autoFocus={true}
            aria-label="recipe form recipe name textfield"
            data-testid="recipe-form-name-field"
            defaultValue={recipeFormData.recipeName}
            error={isRecipeNameError}
            fullWidth
            helperText={isRecipeNameError ? recipeNameErrorMessage : ''}
            onChange={onRecipeNameChange}
            placeholder={T.translate(`${PREFIX}.namePlaceholder`)}
            required
            value={recipeFormData.recipeName}
            variant="outlined"
            inputProps={{
              'data-testid': 'recipe-name-input',
            }}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <Label data-testid="recipe-form-description-label" component="span">
              {T.translate(`${PREFIX}.description`)}
            </Label>
            <StyledTextAreaAutosize
              aria-label="recipe form description textarea"
              data-testid="recipe-form-description-field"
              defaultValue={recipeFormData.description}
              minRows={3}
              onChange={onRecipeDescriptionChange}
              placeholder={T.translate(`${PREFIX}.descriptionPlaceholder`)}
              required
              value={recipeFormData.description}
            />
          </FormControl>
        </FormFieldWrapper>
        <StyledFormButtonWrapper>
          <SaveButton
            variant="contained"
            type="submit"
            data-testid="recipe-form-save-button"
            disabled={isSaveDisabled}
          >
            {T.translate(`${PREFIX}.save`)}
          </SaveButton>
          <CancelButton
            variant="outlined"
            color="primary"
            onClick={() => onCancel()}
            data-testid="recipe-form-cancel-button"
          >
            {T.translate(`${PREFIX}.cancel`)}
          </CancelButton>
        </StyledFormButtonWrapper>
      </form>
    </>
  );
}
