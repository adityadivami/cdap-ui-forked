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
import {
  ICreateAndEditRecipeFormProps,
  IRecipeData,
} from 'components/CreateAndEditRecipeForm/types';
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
} from 'components/CreateAndEditRecipeForm/styledComponents';
import { getCurrentNamespace } from 'services/NamespaceStore';
import MyDataPrepApi from 'api/dataprep';
import { debounce } from 'lodash';

export default function({
  recipeData,
  setIsCreateAndEditRecipeFormOpen,
  setSnackbar,
  recipeFormAction,
}: ICreateAndEditRecipeFormProps) {
  const CreateRecipeFormAction = 'createRecipe';
  const [isNameError, setIsNameError] = useState(false);
  const StyledLabel = getLabelStyle(isNameError);
  const [recipeNameError, setRecipeNameError] = useState('');
  const [recipeFormData, setRecipeFormData] = useState<IRecipeData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisable, setIsSaveDisable] = useState<boolean>(true);

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
      setIsSaveDisable(true);
    } else {
      setIsSaveDisable(false);
    }
  }, [recipeFormData, isNameError]);

  const onCancel = () => {
    setIsCreateAndEditRecipeFormOpen(false);
    setIsNameError(false);
  };

  const onFormHandle = (event: FormEvent) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  const onRecipeDataSave = (recipeFormData: IRecipeData) => {
    if (recipeFormAction === CreateRecipeFormAction) {
      const params = {
        context: getCurrentNamespace(),
      };
      const requestBody = {
        recipeName: recipeFormData.recipeName,
        description: recipeFormData.description,
        directives: recipeSteps,
      };
      MyDataPrepApi.createRecipe(params, requestBody).subscribe(
        () => {
          setIsNameError(false);
          setIsCreateAndEditRecipeFormOpen(false);
          setSnackbar({
            open: true,
            isSuccess: true,
            message: `${recipeSteps.length} ${T.translate(
              'features.WranglerNewUI.RecipeForm.labels.recipeSaveSuccessMessage'
            )}`,
          });
        },
        (err) => {
          if (err.response.message) {
            setIsNameError(true);
          } else {
            setIsCreateAndEditRecipeFormOpen(false);
            setSnackbar({
              open: true,
              isSuccess: false,
              message: T.translate(
                'features.WranglerNewUI.RecipeForm.labels.errorMessage'
              ).toString(),
            });
          }
        }
      );
    }
  };

  const validateRecipeNameExists = useRef(
    debounce((value) => {
      if (value) {
        const params = {
          context: getCurrentNamespace(),
          recipeName: value,
        };
        MyDataPrepApi.getRecipeByName(params).subscribe(
          (res) => {
            setIsNameError(true);
            setRecipeNameError(
              T.translate(
                'features.WranglerNewUI.RecipeForm.labels.sameNameErrorMessage'
              ).toString()
            );
          },
          (err) => {
            if (
              err.statusCode === 404 &&
              err.message === `recipe with name '${value}' does not exist`
            ) {
              setIsNameError(false);
            }
          }
        );
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
          helperText={isNameError ? recipeNameError : ''}
          fullWidth
          onChange={(event) => onRecipeNameChange(event)}
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
          data-testid="recipe-cancel-button"
        >
          {T.translate('features.WranglerNewUI.RecipeForm.labels.cancel')}
        </StyledCancelButton>
        <StyledSaveButton
          variant="contained"
          type="submit"
          color="primary"
          data-testid="recipe-save-button"
          disabled={isSaveDisable}
        >
          {T.translate('features.WranglerNewUI.RecipeForm.labels.save')}
        </StyledSaveButton>
      </StyledFormButtonWrapper>
    </StyledForm>
  );
}
