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

import React, { FormEvent, ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import T from 'i18n-react';
import { getRecipeByName, createRecipe } from 'components/RecipeManagement/CreateRecipe/services';
import { debounce } from 'lodash';
import { IRecipeFormData } from 'components/RecipeManagement/types';
import RecipeForm, { CREATE_RECIPE } from 'components/RecipeManagement/RecipeForm';
import { ICreateRecipeProps } from 'components/RecipeManagement/types';

const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';
const recipeNameRegEx = /^[a-z\d\s]+$/i;

export default function CreateRecipe({ setShowRecipeForm, setSnackbar }: ICreateRecipeProps) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [recipeNameErrorData, setRecipeNameErrorData] = useState({
    isRecipeNameError: false,
    recipeNameErrorMessage: '',
  });

  // This static data has to be removed when we have actual API data, then directly we will get that data from store as directives
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  useEffect(() => {
    if (
      recipeFormData.recipeName === '' ||
      recipeFormData.description === '' ||
      recipeFormData.recipeName?.trim().length === 0 ||
      recipeFormData.description?.trim().length === 0 ||
      recipeNameErrorData.isRecipeNameError
    ) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [recipeFormData, recipeNameErrorData.isRecipeNameError]);

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
    createRecipe(requestBody, onCreateRecipeResponse, onCreateRecipeError);
  };

  const onCreateRecipeResponse = () => {
    setRecipeNameErrorData({
      isRecipeNameError: false,
      recipeNameErrorMessage: '',
    });
    setShowRecipeForm(false);
    setSnackbar({
      open: true,
      isSuccess: true,
      message: `${recipeSteps.length} ${T.translate(`${PREFIX}.recipeSaveSuccessMessage`)}`,
    });
  };

  const onCreateRecipeError = (err) => {
    setShowRecipeForm(false);
    setSnackbar({
      open: true,
      isSuccess: false,
      message: err.response.message,
    });
  };

  const onRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value });
    validateRecipeNameExists.current(event.target.value);
  };

  const onCancel = () => {
    setShowRecipeForm(false);
    setRecipeNameErrorData({
      isRecipeNameError: false,
      recipeNameErrorMessage: '',
    });
  };

  const onGetRecipeByNameError = (err, recipeName) => {
    if (
      err.statusCode === 404 &&
      err.message === `recipe with name '${recipeName}' does not exist`
    ) {
      setRecipeNameErrorData({
        isRecipeNameError: false,
        recipeNameErrorMessage: '',
      });
    }
  };

  const validateRecipeNameExists = useRef(
    debounce((recipeName: string) => {
      if (recipeName && !recipeNameRegEx.test(recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        setRecipeNameErrorData({
          isRecipeNameError: false,
          recipeNameErrorMessage: '',
        });
        if (recipeName) {
          getRecipeByName(recipeName, onGetRecipeByNameResponse, onGetRecipeByNameError);
        }
      }
    }, 500)
  );

  const onGetRecipeByNameResponse = () => {
    setRecipeNameErrorData({
      isRecipeNameError: true,
      recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
    });
  };

  return (
    <>
      <RecipeForm
        recipeFormData={recipeFormData}
        isRecipeNameError={recipeNameErrorData.isRecipeNameError}
        recipeNameErrorMessage={recipeNameErrorData.recipeNameErrorMessage}
        onRecipeNameChange={onRecipeNameChange}
        onFormSubmit={onFormSubmit}
        setRecipeFormData={setRecipeFormData}
        onCancel={onCancel}
        isSaveDisabled={isSaveDisabled}
        recipeFormAction={CREATE_RECIPE}
      />
    </>
  );
}
