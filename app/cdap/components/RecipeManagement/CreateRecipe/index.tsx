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

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import T from 'i18n-react';
import { createRecipeService } from 'components/RecipeManagement/services';
import { ActionType } from 'components/RecipeList/types';
import {
  ICreateRecipeProps,
  IRecipeFormData,
  IRecipeNameErrorData,
} from 'components/RecipeManagement/types';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import MyDataPrepApi from 'api/dataprep';
import { getCurrentNamespace } from 'services/NamespaceStore';
import useFetch from 'components/RecipeManagement/CreateRecipe/useFetch';

const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';
const recipeNameRegEx = /^[a-z\d\s]+$/i;
export const noErrorState: IRecipeNameErrorData = {
  isRecipeNameError: false,
  recipeNameErrorMessage: '',
};

export default function CreateRecipe({ setShowRecipeForm, setSnackbar }: ICreateRecipeProps) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
  });
  const [recipeNameErrorData, setRecipeNameErrorDataState] = useState(noErrorState);

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const [params, setParams] = useState({
    context: '',
    recipeName: '',
  });

  const setRecipeNameErrorData = (
    recipeNameError: IRecipeNameErrorData,
    formData: IRecipeFormData = recipeFormData
  ) => {
    setRecipeNameErrorDataState(recipeNameError);
    handleSaveButtonMode(formData, recipeNameError);
  };

  /*
   * TODO: This static data has to be removed when we have actual API data,
   * then directly we will get that data from store as directives
   */

  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  const handleSaveButtonMode = (
    formData: IRecipeFormData = recipeFormData,
    nameErrorData: IRecipeNameErrorData = recipeNameErrorData
  ) => {
    const shouldDisableSaveButton =
      formData.recipeName === '' ||
      formData.description === '' ||
      formData.recipeName?.trim().length === 0 ||
      formData.description?.trim().length === 0 ||
      nameErrorData.isRecipeNameError;
    setIsSaveDisabled(shouldDisableSaveButton);
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

  /*
   * In this function we are validating recipe name input filed
   * (whether recipe name already exists or not and recipe name without alphanumeric characters)
   * based on the result we are showing the helper text
   */

  const validateIfRecipeNameExists = useRef(
    debounce((formData: IRecipeFormData) => {
      if (formData.recipeName && !recipeNameRegEx.test(formData.recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        if (formData.recipeName) {
          setParams({
            context: getCurrentNamespace(),
            recipeName: formData.recipeName,
          });
        } else {
          setRecipeNameErrorData(noErrorState);
        }
      }
    }, 500)
  );

  const [response, error] = useFetch(MyDataPrepApi.getRecipeByName, params);

  useEffect(() => {
    if (response) {
      setRecipeNameErrorData(
        {
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
        },
        recipeFormData
      );
    } else if (error) {
      if (error.statusCode === 404) {
        setRecipeNameErrorData(noErrorState, recipeFormData);
      }
    }
  }, [response, error]);

  return (
    <RecipeForm
      recipeFormData={recipeFormData}
      isRecipeNameError={recipeNameErrorData.isRecipeNameError}
      recipeNameErrorMessage={recipeNameErrorData.recipeNameErrorMessage}
      onRecipeNameChange={onRecipeNameChange}
      onFormSubmit={onFormSubmit}
      onCancel={onCancel}
      isSaveDisabled={isSaveDisabled}
      recipeFormAction={ActionType.CREATE_RECIPE}
      onRecipeDescriptionChange={onRecipeDescriptionChange}
    />
  );
}
