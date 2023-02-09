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

import React, { useState, ChangeEvent, useRef, FormEvent, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import {
  IEditRecipeProps,
  IRecipeData,
  IRecipeNameErrorData,
} from 'components/RecipeManagement/types';
import { debounce } from 'lodash';
import { getRecipeByNameService, updateRecipeService } from 'components/RecipeManagement/services';
import T from 'i18n-react';
import { ActionType } from 'components/RecipeList/types';
import MyDataPrepApi from 'api/dataprep';
import { getCurrentNamespace } from 'services/NamespaceStore';
import {
  reducer,
  defaultInitialState,
  Actions,
  // noErrorState,
} from 'components/RecipeManagement/reducer';
import useFetch from 'components/RecipeManagement/EditRecipe/useFetch';

const StyledEditFormWrapper = styled.div`
  margin-top: 30px;
`;

const recipeNameRegEx = /^[a-z\d\s]+$/i;
const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';

export default function({
  selectedRecipe,
  onCancelClick,
  setSnackbar,
  setRecipeFormOpen,
  setIsRecipeListUpdated,
}: IEditRecipeProps) {
  // const [editRecipeState, dispatch] = useReducer(reducer, defaultInitialState);
  const [apiParams, setApiParams] = useState({
    getRecipeByNameParams: {
      context: '',
      recipeName: '',
    },
    updateRecipeParams: {
      context: '',
      recipe_id: '',
    },
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [recipeFormData, setRecipeFormData] = useState<IRecipeData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  const noErrorState: IRecipeNameErrorData = {
    isRecipeNameError: false,
    recipeNameErrorMessage: '',
  };

  const [recipeNameErrorData, setRecipeNameErrorDataState] = useState(noErrorState);

  const { response: recipeByNameResponse, error: recipeByNameError } = useFetch(
    MyDataPrepApi.getRecipeByName,
    apiParams.getRecipeByNameParams,
    '',
    'getRecipeByName'
  );

  const { response: updateRecipeResponse, error: updateRecipeError } = useFetch(
    MyDataPrepApi.updateRecipe,
    apiParams.updateRecipeParams,
    '',
    'updateRecipe'
  );

  useEffect(() => {
    if (recipeByNameResponse) {
      setRecipeNameErrorData(
        {
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.sameNameErrorMessage`).toString(),
        },
        recipeFormData
      );
    } else if (recipeByNameError) {
      if (recipeByNameError.statusCode === 404) {
        setRecipeNameErrorData(noErrorState, recipeFormData);
      } else {
        setSnackbar({
          open: true,
          isSuccess: false,
          message: (recipeByNameError.response as Record<string, string>).message,
        });
      }
    }
  }, [recipeByNameResponse, recipeByNameError]);

  useEffect(() => {
    if (updateRecipeResponse) {
      setRecipeNameErrorData(noErrorState);
      setRecipeFormOpen(false);
      setSnackbar({
        open: true,
        isSuccess: true,
        message: `${recipeSteps.length} ${T.translate(`${PREFIX}.recipeUpdateSuccessMessage`)}`,
      });
      setIsRecipeListUpdated(true);
    } else if (updateRecipeError) {
      setRecipeFormOpen(false);
      setSnackbar({
        open: true,
        isSuccess: false,
        message: (updateRecipeError as Record<string, string>).message,
      });
    }
  }, [updateRecipeResponse, updateRecipeError]);

  useEffect(() => {
    if (selectedRecipe) {
      recipeFormData.recipeName = selectedRecipe.recipeName;
      recipeFormData.description = selectedRecipe.description;
      recipeFormData.directives = selectedRecipe.directives;
      setRecipeFormData((prevState) => ({ ...prevState, recipeFormData }));
    }
  }, [selectedRecipe]);

  const setRecipeNameErrorData = (
    recipeNameError: IRecipeNameErrorData,
    formData: IRecipeData = recipeFormData
  ) => {
    setRecipeNameErrorDataState(recipeNameError);
    handleSaveButtonMode(formData, recipeNameError);
  };

  const handleSaveButtonMode = (
    formData: IRecipeData,
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

  const handleRecipeFormData = (formData: IRecipeData) => {
    setRecipeFormData(formData);
    handleSaveButtonMode(formData);
  };

  const onRecipeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      recipeName: event.target.value,
    });
    validateIfRecipeNameExists.current({
      recipeName: event.target.value,
      description: recipeFormData.description,
    });
  };

  /*
  In this function we are validating recipe name input filed
  (whether recipe name already exists or not and recipe name without alphanumeric characters)
   based on the result we are showing the helper text
  */
  const validateIfRecipeNameExists = useRef(
    debounce((formData: IRecipeData) => {
      if (formData.recipeName && !recipeNameRegEx.test(formData.recipeName)) {
        setRecipeNameErrorData({
          isRecipeNameError: true,
          recipeNameErrorMessage: T.translate(`${PREFIX}.validationErrorMessage`).toString(),
        });
      } else {
        if (formData.recipeName) {
          setApiParams({
            ...apiParams,
            getRecipeByNameParams: {
              context: getCurrentNamespace(),
              recipeName: formData.recipeName,
            },
          });
        } else {
          setRecipeNameErrorData(noErrorState, formData);
        }
      }
    }, 500)
  );

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
    setIsRecipeListUpdated(true);
  };

  const onUpdateRecipeError = (err: Record<string, unknown>) => {
    setRecipeFormOpen(false);
    setSnackbar({
      open: true,
      isSuccess: false,
      message: (err.response as Record<string, string>).message,
    });
  };

  const onRecipeDataSave = (recipeFormData: IRecipeData) => {
    const payload = {
      recipeName: recipeFormData.recipeName,
      description: recipeFormData.description,
      directives: recipeFormData.directives,
    };
    // updateRecipeService({
    //   selectedRecipe,
    //   payload,
    //   onUpdateRecipeResponse,
    //   onUpdateRecipeError,
    // });
    setApiParams({
      ...apiParams,
      updateRecipeParams: {
        context: getCurrentNamespace(),
        recipe_id: selectedRecipe.recipeId.recipeId,
      },
    });
  };

  const onRecipeDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      description: event.target.value,
    });
  };

  return (
    <StyledEditFormWrapper>
      {recipeFormData && (
        <RecipeForm
          isRecipeNameError={recipeNameErrorData.isRecipeNameError}
          isSaveDisabled={isSaveDisabled}
          onCancel={onCancelClick}
          onFormSubmit={onFormSubmit}
          onRecipeDescriptionChange={onRecipeDescriptionChange}
          onRecipeNameChange={onRecipeNameChange}
          recipeFormData={recipeFormData}
          recipeFormAction={ActionType.EDIT_RECIPE}
          recipeNameErrorMessage={recipeNameErrorData.recipeNameErrorMessage}
        />
      )}
    </StyledEditFormWrapper>
  );
}
