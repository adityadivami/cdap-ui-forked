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

import React, { FormEvent, useEffect, useState, useRef } from 'react';
import { FormControl } from '@material-ui/core';
import T from 'i18n-react';
import { IRecipeFormProps } from 'components/RecipeForm/types';
import {
  FormFieldWrapper,
  Label,
  Form,
  StyledTextField,
  StyledTextAreaAutosize,
  CancelButton,
  SaveButton,
  FormButtonWrapper,
  ErrorLabel,
} from 'components/RecipeForm/styledComponents';
import { getRecipeByName, createRecipe } from 'components/RecipeForm/services';
import { debounce } from 'lodash';
import { IRecipeData } from 'components/DataPrep/store';

const CREATE_RECIPE_FORM_ACTION = 'createRecipe';

export default function({
  recipeData,
  setShowRecipeForm,
  setSnackbar,
  recipeFormAction,
}: IRecipeFormProps) {
  const [isNameError, setIsNameError] = useState(false);
  const StyledLabel = isNameError ? ErrorLabel : Label;
  const [recipeNameError, setRecipeNameError] = useState('');
  const [recipeFormData, setRecipeFormData] = useState<IRecipeData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  // This static data has to be removed when we have actual API data, then directly we will get that data from store as directives
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  useEffect(() => {
    setRecipeFormData(recipeData);
  }, [recipeData]);

  useEffect(() => {
    if (
      recipeFormData.recipeName === '' ||
      recipeFormData.description === '' ||
      recipeFormData.recipeName?.trim().length === 0 ||
      recipeFormData.description?.trim().length === 0 ||
      isNameError
    ) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [recipeFormData, isNameError]);

  const onCancel = () => {
    setShowRecipeForm(false);
    setIsNameError(false);
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  const createRecipeResponseHandler = () => {
    setIsNameError(false);
    setShowRecipeForm(false);
    setSnackbar({
      open: true,
      isSuccess: true,
      message: `${recipeSteps.length} ${T.translate(
        'features.WranglerNewUI.RecipeForm.labels.recipeSaveSuccessMessage'
      )}`,
    });
  };

  const createRecipeErrorHandler = (err) => {
    if (err.response.message) {
      setIsNameError(true);
    } else {
      setShowRecipeForm(false);
      setSnackbar({
        open: true,
        isSuccess: false,
        message: T.translate('features.WranglerNewUI.RecipeForm.labels.errorMessage').toString(),
      });
    }
  };

  const onRecipeDataSave = (recipeFormData: IRecipeData) => {
    if (recipeFormAction === CREATE_RECIPE_FORM_ACTION) {
      const requestBody = {
        recipeName: recipeFormData.recipeName,
        description: recipeFormData.description,
        directives: recipeSteps,
      };
      createRecipe(requestBody, createRecipeResponseHandler, createRecipeErrorHandler);
    }
  };

  const getRecipeByNameResponseHandler = () => {
    setIsNameError(true);
    setRecipeNameError(
      T.translate('features.WranglerNewUI.RecipeForm.labels.sameNameErrorMessage').toString()
    );
  };

  const getRecipeByNameErrorHandler = (err, value) => {
    console.log(recipeFormData, 'recipeFormData.recipeName');
    if (err.statusCode === 404 && err.message === `recipe with name '${value}' does not exist`) {
      setIsNameError(false);
    }
  };

  const validateRecipeNameExists = useRef(
    debounce((value) => {
      if (value) {
        getRecipeByName(value, getRecipeByNameResponseHandler, getRecipeByNameErrorHandler);
      }
    }, 500)
  );

  const onRecipeNameChange = (event) => {
    setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value });
    const recipeNameRegEx = /^[a-z\d\s]+$/i;
    if (event.target.value && !recipeNameRegEx.test(event.target.value)) {
      setRecipeNameError(
        T.translate('features.WranglerNewUI.RecipeForm.labels.validationErrorMessage').toString()
      );
      setIsNameError(true);
    } else {
      validateRecipeNameExists.current(event.target.value);
    }
  };

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
            defaultValue={recipeData.recipeName}
            error={isNameError}
            id="outlined-error-helper-text"
            helperText={isNameError ? recipeNameError : ''}
            fullWidth
            onChange={(event) => onRecipeNameChange(event)}
            data-testid="recipe-name-field"
            placeholder={T.translate('features.WranglerNewUI.RecipeForm.labels.namePlaceholder')}
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
