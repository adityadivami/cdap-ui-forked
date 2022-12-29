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

import React, {
  FormEvent,
  ChangeEvent,
  useEffect,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
} from 'react';
import T from 'i18n-react';
import { getRecipeByName, createRecipe } from 'components/CreateRecipe/services';
import { debounce } from 'lodash';
import { IRecipeFormData } from 'components/RecipeManagement/types';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import { ISnackbar } from 'components/Snackbar';

export interface ICreateRecipeProps {
  setShowRecipeForm: Dispatch<SetStateAction<boolean>>;
  setSnackbar: Dispatch<SetStateAction<ISnackbar>>;
}

export default function({ setShowRecipeForm, setSnackbar }: ICreateRecipeProps) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [recipeNameError, setRecipeNameError] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // This static data has to be removed when we have actual API data, then directly we will get that data from store as directives
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

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

  const onCreateRecipeError = (err) => {
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

  const onRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const recipeNameRegEx = /^[a-z\d\s]+$/i;
    setRecipeFormData({ ...recipeFormData, ['recipeName']: event.target.value });
    if (event.target.value && !recipeNameRegEx.test(event.target.value)) {
      setRecipeNameError(
        T.translate('features.WranglerNewUI.RecipeForm.labels.validationErrorMessage').toString()
      );
      setIsNameError(true);
    } else {
      setIsNameError(false);
      validateRecipeNameExists.current(event.target.value);
    }
  };

  const onCancel = () => {
    setShowRecipeForm(false);
    setIsNameError(false);
  };

  const onGetRecipeByNameError = (err, value) => {
    if (err.statusCode === 404 && err.message === `recipe with name '${value}' does not exist`) {
      setIsNameError(false);
    }
  };

  const validateRecipeNameExists = useRef(
    debounce((value: string) => {
      if (value) {
        getRecipeByName(value, onGetRecipeByNameResponse, onGetRecipeByNameError);
      }
    }, 500)
  );

  const onGetRecipeByNameResponse = () => {
    setIsNameError(true);
    setRecipeNameError(
      T.translate('features.WranglerNewUI.RecipeForm.labels.sameNameErrorMessage').toString()
    );
  };

  return (
    <>
      <RecipeForm
        recipeFormData={recipeFormData}
        isNameError={isNameError}
        recipeNameError={recipeNameError}
        onRecipeNameChange={onRecipeNameChange}
        onFormSubmit={onFormSubmit}
        setRecipeFormData={setRecipeFormData}
        onCancel={onCancel}
        isSaveDisabled={isSaveDisabled}
      />
    </>
  );
}
