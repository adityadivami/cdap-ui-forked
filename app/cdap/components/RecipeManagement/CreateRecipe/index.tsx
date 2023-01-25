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

import { createRecipeService, getRecipeByNameService } from 'components/RecipeManagement/services';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import {
  ICreateRecipeProps,
  IRecipeFormData,
  IRecipeNameErrorData,
} from 'components/RecipeManagement/types';
import T from 'i18n-react';
import { debounce } from 'lodash';
import React, { FormEvent, useRef, useState, useReducer } from 'react';
import { ActionType } from 'components/RecipeList/types';
import {
  reducer,
  defaultInitialState,
  Actions,
  noErrorState,
} from 'components/RecipeManagement/reducer';

const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';
const recipeNameRegEx = /^[a-z\d\s]+$/i;

export default function CreateRecipe({ setShowRecipeForm, setSnackbar }: ICreateRecipeProps) {
  const [createRecipeState, dispatch] = useReducer(reducer, defaultInitialState);
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const setRecipeNameErrorData = (
    recipeNameError: IRecipeNameErrorData,
    formData: IRecipeFormData = recipeFormData
  ) => {
    dispatch({
      type: Actions.SET_RECIPE_NAME_ERROR_STATE,
      payload: recipeNameError,
    });
    handleSaveButtonMode(formData, recipeNameError);
  };

  // TODO: This static data has to be removed when we have actual API data, then directly we will get that data from store as directives
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  const handleSaveButtonMode = (
    formData: IRecipeFormData = recipeFormData,
    nameErrorData: IRecipeNameErrorData = createRecipeState.recipeNameErrorData
  ) => {
    if (
      formData.recipeName === '' ||
      formData.description === '' ||
      formData.recipeName?.trim().length === 0 ||
      formData.description?.trim().length === 0 ||
      nameErrorData.isRecipeNameError
    ) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  };

  const handleRecipeFormData = (formData: IRecipeFormData) => {
    setRecipeFormData(formData);
    handleSaveButtonMode(formData);
  };

  const onRecipeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      recipeName: event.target.value,
    });
    validateIfRecipeNameExists.current({
      recipeName: event.target.value,
      description: recipeFormData.description,
    });
  };

  const onRecipeDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      description: event.target.value,
    });
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  const onRecipeDataSave = (recipeFormData: IRecipeFormData) => {
    const requestBody = {
      recipeName: recipeFormData.recipeName,
      description: recipeFormData.description,
      directives: recipeSteps,
    };
    createRecipeService({ requestBody, onCreateRecipeResponse, onCreateRecipeError });
  };

  const onCreateRecipeResponse = () => {
    setShowRecipeForm(false);
    setSnackbar({
      open: true,
      isSuccess: true,
      message: `${recipeSteps.length} ${T.translate(`${PREFIX}.recipeSaveSuccessMessage`)}`,
    });
  };

  const onCreateRecipeError = (err: Record<string, unknown>) => {
    setShowRecipeForm(false);
    setSnackbar({
      open: true,
      isSuccess: false,
      message: (err.response as Record<string, string>).message,
    });
  };

  const onCancel = () => {
    setShowRecipeForm(false);
  };

  const onGetRecipeByNameError = (err: Record<string, unknown>, formData: IRecipeFormData) => {
    if (err.statusCode === 404) {
      setRecipeNameErrorData(noErrorState, formData);
    }
  };

  const onGetRecipeByNameResponse = (formData: IRecipeFormData) => {
    !createRecipeState.recipeNameErrorData.isRecipeNameError &&
      setRecipeNameErrorData(
        {
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
        },
        formData
      );
  };

  // In this function we are validating recipe name input filed (whether recipe name already exists or not and recipe name without alphanumeric characters) based on the result we are showing the helper text
  const validateIfRecipeNameExists = useRef(
    debounce((formData: IRecipeFormData) => {
      if (formData.recipeName && !recipeNameRegEx.test(formData.recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        if (formData.recipeName) {
          getRecipeByNameService({ formData, onGetRecipeByNameResponse, onGetRecipeByNameError });
        } else {
          setRecipeNameErrorData(noErrorState);
        }
      }
    }, 500)
  );

  return (
    <RecipeForm
      recipeFormData={recipeFormData}
      isRecipeNameError={createRecipeState.recipeNameErrorData.isRecipeNameError}
      recipeNameErrorMessage={createRecipeState.recipeNameErrorData.recipeNameErrorMessage}
      onRecipeNameChange={onRecipeNameChange}
      onFormSubmit={onFormSubmit}
      onCancel={onCancel}
      isSaveDisabled={isSaveDisabled}
      recipeFormAction={ActionType.CREATE_RECIPE}
      onRecipeDescriptionChange={onRecipeDescriptionChange}
    />
  );
}
