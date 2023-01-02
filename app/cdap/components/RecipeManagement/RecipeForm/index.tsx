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

import React, { FormEvent, ChangeEvent } from 'react';
import { FormControl } from '@material-ui/core';
import T from 'i18n-react';
import { IRecipeFormProps } from 'components/RecipeManagement/types';
import {
  FormFieldWrapper,
  Label,
  Form,
  ErrorTextField,
  NormalTextField,
  StyledTextAreaAutosize,
  CancelButton,
  SaveButton,
  FormButtonWrapper,
  ErrorLabel,
} from 'components/RecipeManagement/RecipeForm/styles';

export default function({
  recipeFormData,
  isRecipeNameError,
  recipeNameErrorMessage,
  onRecipeNameChange,
  onFormSubmit,
  setRecipeFormData,
  onCancel,
  isSaveDisabled,
}: IRecipeFormProps) {
  const StyledLabel = isRecipeNameError ? ErrorLabel : Label;
  const StyledTextField = isRecipeNameError ? ErrorTextField : NormalTextField;

  return (
    <>
      <Form
        onSubmit={(event: FormEvent<HTMLFormElement>) => onFormSubmit(event)}
        data-testid="recipe-form-parent"
      >
        <FormFieldWrapper>
          <StyledLabel data-testid="recipe-name-label">
            {T.translate('features.WranglerNewUI.RecipeForm.labels.name')}
          </StyledLabel>
          <StyledTextField
            required
            variant="outlined"
            defaultValue={recipeFormData.recipeName}
            error={isRecipeNameError}
            id="outlined-error-helper-text"
            helperText={isRecipeNameError ? recipeNameErrorMessage : ''}
            fullWidth
            onChange={(event: ChangeEvent<HTMLInputElement>) => onRecipeNameChange(event)}
            data-testid="recipe-name-field"
            placeholder={T.translate('features.WranglerNewUI.RecipeForm.labels.namePlaceholder')}
            autoFocus={true}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <Label data-testid="recipe-description-label">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.description')}
            </Label>
            <StyledTextAreaAutosize
              required
              aria-label="minimum height"
              minRows={3}
              data-testid="recipe-description-field"
              defaultValue={recipeFormData.description}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setRecipeFormData({ ...recipeFormData, ['description']: event.target.value })
              }
              placeholder={T.translate(
                'features.WranglerNewUI.RecipeForm.labels.descriptionPlaceholder'
              )}
            />
          </FormControl>
        </FormFieldWrapper>
        <FormButtonWrapper>
          <CancelButton
            variant="outlined"
            color="primary"
            onClick={() => onCancel()}
            data-testid="recipe-cancel-button"
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.cancel')}
          </CancelButton>
          <SaveButton
            variant="contained"
            type="submit"
            color="primary"
            data-testid="recipe-save-button"
            disabled={isSaveDisabled}
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
          </SaveButton>
        </FormButtonWrapper>
      </Form>
    </>
  );
}
