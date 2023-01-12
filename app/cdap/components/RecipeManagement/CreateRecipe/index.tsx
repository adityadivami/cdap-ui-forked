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

import React, { FormEvent, ChangeEvent, useState, useRef } from 'react';
import T from 'i18n-react';
import { getRecipeByName, createRecipe } from 'components/RecipeManagement/CreateRecipe/services';
import { debounce } from 'lodash';
import { IRecipeFormData, IRecipeNameErrorData } from 'components/RecipeManagement/types';
import RecipeForm, { CREATE_RECIPE } from 'components/RecipeManagement/RecipeForm';
import { ICreateRecipeProps } from 'components/RecipeManagement/types';

const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';
const recipeNameRegEx = /^[a-z\d\s]+$/i;

const noErrorState: IRecipeNameErrorData = {
  isRecipeNameError: false,
  recipeNameErrorMessage: '',
};

export default function CreateRecipe({ setShowRecipeForm, setSnackbar }: ICreateRecipeProps) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [recipeNameErrorData, setRecipeNameErrorDataState] = useState<IRecipeNameErrorData>(
    noErrorState
  );

  const setRecipeNameErrorData = (
    recipeNameError: IRecipeNameErrorData,
    formData: IRecipeFormData = recipeFormData
  ) => {
    setRecipeNameErrorDataState(recipeNameError);
    handleSaveButtonMode(formData, recipeNameError);
  };

  // This static data has to be removed when we have actual API data, then directly we will get that data from store as directives
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  const handleSaveButtonMode = (
    formData: IRecipeFormData = recipeFormData,
    nameErrorData: IRecipeNameErrorData = recipeNameErrorData
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
    validateRecipeNameExists.current({
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
    createRecipe({ requestBody, onCreateRecipeResponse, onCreateRecipeError });
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
      message: err.response['message'],
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
    !recipeNameErrorData.isRecipeNameError &&
      setRecipeNameErrorData(
        {
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
        },
        formData
      );
  };

  const validateRecipeNameExists = useRef(
    debounce((formData: IRecipeFormData) => {
      if (formData.recipeName && !recipeNameRegEx.test(formData.recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        formData.recipeName
          ? getRecipeByName({ formData, onGetRecipeByNameResponse, onGetRecipeByNameError })
          : setRecipeNameErrorData(noErrorState);
      }
    }, 500)
  );

  return (
    <>
      <RecipeForm
        recipeFormData={recipeFormData}
        isRecipeNameError={recipeNameErrorData.isRecipeNameError}
        recipeNameErrorMessage={recipeNameErrorData.recipeNameErrorMessage}
        onRecipeNameChange={onRecipeNameChange}
        onFormSubmit={onFormSubmit}
        onCancel={onCancel}
        isSaveDisabled={isSaveDisabled}
        recipeFormAction={CREATE_RECIPE}
        onRecipeDescriptionChange={onRecipeDescriptionChange}
      />
    </>
  );
}
