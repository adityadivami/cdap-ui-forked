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

import React, { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import { IRecipeFormData, IEditRecipeProps } from 'components/RecipeManagement/types';
import { debounce } from 'lodash';
import { getRecipeByName, updateRecipe } from 'components/RecipeManagement/EditRecipe/services';
import T from 'i18n-react';

import { EDIT_RECIPE } from 'components/RecipeList/ViewAllRecipes';

const StyledEditFormWrapper = styled.div`
  margin-top: 30px;
`;

const recipeNameRegEx = /^[a-z\d\s]+$/i;
const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';

const noErrorState = {
  isRecipeNameError: false,
  recipeNameErrorMessage: '',
};

export default function({
  selectedRecipe,
  onCancelClick,
  setSnackbar,
  setRecipeFormOpen,
  setUpdateRecipeList,
}: IEditRecipeProps) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
    directives: [],
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [recipeNameErrorData, setRecipeNameErrorData] = useState(noErrorState);
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  useEffect(() => {
    return () => {
      setUpdateRecipeList(false);
    };
  }, []);

  useEffect(() => {
    if (selectedRecipe) {
      recipeFormData.recipeName = selectedRecipe.recipeName;
      recipeFormData.description = selectedRecipe.description;
      recipeFormData.directives = selectedRecipe.directives;
      setRecipeFormData(recipeFormData);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    handleSaveButtonMode();
  }, [recipeNameErrorData.isRecipeNameError]);

  const handleSaveButtonMode = (formData = recipeFormData) => {
    if (
      formData.recipeName === '' ||
      formData.description === '' ||
      formData.recipeName?.trim().length === 0 ||
      formData.description?.trim().length === 0 ||
      recipeNameErrorData.isRecipeNameError
    ) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  };

  const handleRecipeFormData = (formData) => {
    setRecipeFormData(formData);
    handleSaveButtonMode(formData);
  };

  const onCancel = () => {
    onCancelClick();
  };

  const onRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      recipeName: event.target.value,
    });
    validateRecipeNameExists.current(event.target.value);
  };

  const validateRecipeNameExists = useRef(
    debounce((recipeName: string) => {
      if (recipeName && !recipeNameRegEx.test(recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        recipeName
          ? getRecipeByName(recipeName, onGetRecipeByNameResponse, onGetRecipeByNameError)
          : setRecipeNameErrorData(noErrorState);
      }
    }, 500)
  );

  const onGetRecipeByNameResponse = () => {
    !recipeNameErrorData.isRecipeNameError &&
      setRecipeNameErrorData({
        isRecipeNameError: true,
        recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
      });
  };

  const onGetRecipeByNameError = (err, recipeName) => {
    if (
      err.statusCode === 404 &&
      err.message === `recipe with name '${recipeName}' does not exist`
    ) {
      setRecipeNameErrorData(noErrorState);
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  const onUpdateRecipeResponse = () => {
    setRecipeNameErrorData(noErrorState);
    setRecipeFormOpen(false);
    setSnackbar({
      open: true,
      isSuccess: true,
      message: `${recipeSteps.length} ${T.translate(`${PREFIX}.recipeUpdateSuccessMessage`)}`,
    });
    setUpdateRecipeList(true);
  };

  const onUpdateRecipeError = (err) => {
    setRecipeFormOpen(false);
    setSnackbar({
      open: true,
      isSuccess: false,
      message: err.response.message,
    });
  };

  const onRecipeDataSave = (recipeFormData) => {
    const payload = {
      recipeName: recipeFormData.recipeName,
      description: recipeFormData.description,
      directives: recipeSteps,
    };
    updateRecipe(
      selectedRecipe.recipeId.recipeId,
      payload,
      onUpdateRecipeResponse,
      onUpdateRecipeError
    );
  };

  const onRecipeDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      description: event.target.value,
    });
  };

  return (
    <>
      <StyledEditFormWrapper>
        {recipeFormData && (
          <RecipeForm
            recipeFormData={recipeFormData}
            isRecipeNameError={recipeNameErrorData.isRecipeNameError}
            recipeNameErrorMessage={recipeNameErrorData.recipeNameErrorMessage}
            onRecipeNameChange={onRecipeNameChange}
            onFormSubmit={onFormSubmit}
            setRecipeFormData={setRecipeFormData}
            onCancel={onCancel}
            isSaveDisabled={isSaveDisabled}
            recipeFormAction={EDIT_RECIPE}
            onRecipeDescriptionChange={onRecipeDescriptionChange}
          />
        )}
      </StyledEditFormWrapper>
    </>
  );
}
