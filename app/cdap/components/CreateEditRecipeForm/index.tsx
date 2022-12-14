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

import React, { FormEvent, useEffect, useState } from 'react';
import { FormControl } from '@material-ui/core';
import T from 'i18n-react';
import { ICommonRecipeFormProps, IRecipeData } from 'components/CreateEditRecipeForm/types';
import {
  FormFieldWrapper,
  NormalLabel,
  StyledForm,
  StyledRecipeNameTextField,
  StyledDescriptionTextArea,
  StyledCancelButton,
  StyledSaveButton,
  StyledFormButtonWrapper,
  getLabelStyle,
} from 'components/CreateEditRecipeForm/styles';

export default function({
  recipeData,
  onRecipeDataSave,
  onCancel,
  isNameError,
  setIsNameError,
}: ICommonRecipeFormProps) {
  const StyledLabel = getLabelStyle(isNameError);
  const [recipeFormData, setRecipeFormData] = useState<IRecipeData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

  useEffect(() => {
    if (isNameError) {
      setIsSaveDisable(true);
    }
  }, [isNameError]);

  useEffect(() => {
    setRecipeFormData(recipeData);
  }, [recipeData]);

  useEffect(() => {
    if (
      recipeFormData.recipeName === '' ||
      recipeFormData.description === '' ||
      recipeFormData.recipeName?.trim().length === 0 ||
      recipeFormData.description?.trim().length === 0
    ) {
      setIsSaveDisable(true);
    } else {
      setIsNameError(false);
      setIsSaveDisable(false);
    }
  }, [recipeFormData]);

  const onFormHandle = (event: FormEvent) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  return (
    <>
      <StyledForm
        onSubmit={(event: FormEvent) => onFormHandle(event)}
        data-testid="recipe-form-parent"
      >
        <FormFieldWrapper>
          <StyledLabel data-testid="recipe-name-label">
            {T.translate('features.WranglerNewUI.RecipeForm.labels.name')}
          </StyledLabel>
          <StyledRecipeNameTextField
            required
            variant="outlined"
            defaultValue={recipeData.recipeName}
            error={isNameError}
            id="outlined-error-helper-text"
            helperText={
              isNameError
                ? T.translate('features.WranglerNewUI.RecipeForm.labels.nameErrorMessage')
                : ''
            }
            fullWidth
            onChange={(event) =>
              setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value })
            }
            data-testid="recipe-name-field"
            placeholder={T.translate('features.WranglerNewUI.RecipeForm.labels.namePlaceholder')}
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormControl variant="outlined">
            <NormalLabel data-testid="recipe-description-label">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.description')}
            </NormalLabel>
            <StyledDescriptionTextArea
              required
              aria-label="minimum height"
              minRows={3}
              data-testid="recipe-description-field"
              defaultValue={recipeData.description}
              onChange={(event) =>
                setRecipeFormData({ ...recipeFormData, ['description']: event.target.value })
              }
              placeholder={T.translate(
                'features.WranglerNewUI.RecipeForm.labels.descriptionPlaceholder'
              )}
            />
          </FormControl>
        </FormFieldWrapper>
        <StyledFormButtonWrapper>
          <StyledCancelButton
            variant="outlined"
            color="primary"
            onClick={() => onCancel()}
            data-testid="common-recipe-cancel-button"
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.cancel')}
          </StyledCancelButton>
          <StyledSaveButton
            variant="contained"
            type="submit"
            color="primary"
            data-testid="common-recipe-save-button"
            disabled={isSaveDisable}
          >
            {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
          </StyledSaveButton>
        </StyledFormButtonWrapper>
      </StyledForm>
    </>
  );
}
