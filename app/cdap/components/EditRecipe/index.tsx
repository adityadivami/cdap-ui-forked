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

import { Container, Drawer, IconButton } from '@material-ui/core';
import React, { useState, ChangeEvent, useRef, FormEvent, useEffect } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DrawerWidgetHeading from './DrawerWidgetHeading';
import CreateAndEditRecipeForm from 'components/CreateAndEditRecipeForm';
import { IRecipeData } from 'components/CreateAndEditRecipeForm/types';
import styled from 'styled-components';
import { ISnackbar } from 'components/Snackbar';
import RecipeForm from 'components/RecipeManagement/RecipeForm';
import { IRecipeFormData } from 'components/RecipeManagement/types';
import { debounce } from 'lodash';
import { getRecipeByName, updateRecipe } from 'components/EditRecipe/services';
import T from 'i18n-react';

interface IDrawerWidgetProps {
  headingText: React.ReactNode;
  openDrawer: boolean;
  onCloseClick: () => void;
  recipeData: IRecipeData;
  setSnackbar: (value: ISnackbar) => void;
  setRecipeFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledDrawerContainer = styled(Container)`
  width: 460px;
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  overflow-y: scroll;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 16px;
  margin-left: 20px;
`;

const CloseIconButton = styled(IconButton)`
  display: flex;
  align-items: center;
`;

const StyledCloseIcon = styled(CloseRoundedIcon)`
  cursor: pointer;
`;

const StyledPaper = styled(Drawer)`
  & .MuiDrawer-paper {
    top: 46px;
    height: calc(100vh - 47px);
    width: 500px;
  }
`;

const StyledEditFormWrapper = styled.div`
  margin-top: 30px;
`;

const recipeNameRegEx = /^[a-z\d\s]+$/i;
const PREFIX = 'features.WranglerNewUI.RecipeForm.labels';
export const EDIT_RECIPE = 'editRecipe';

const noErrorState = {
  isRecipeNameError: false,
  recipeNameErrorMessage: '',
};

export default function({
  openDrawer,
  onCloseClick,
  onCancelClick,
  recipeData,
  setSnackbar,
  setRecipeFormOpen,
}) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
    directives: [],
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [recipeNameErrorData, setRecipeNameErrorData] = useState(noErrorState);
  const recipeSteps = ['uppercase: body1', 'titlecase: body2'];

  useEffect(() => {
    setRecipeFormData(recipeData);
  }, [recipeData]);

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

  useEffect(() => {
    handleSaveButtonMode();
  }, [recipeNameErrorData.isRecipeNameError]);

  const handleRecipeFormData = (formData) => {
    setRecipeFormData(formData);
    handleSaveButtonMode(formData);
  };

  const onCancel = () => {
    onCancelClick();
    setRecipeNameErrorData(noErrorState); // TODO: do we need this line??
  };


  const onClose = () => {
    onCloseClick();
    setRecipeNameErrorData(noErrorState); 
  }

  const onRecipeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      message: `${recipeSteps.length} ${T.translate(
        'features.WranglerNewUI.RecipeForm.labels.recipeSaveSuccessMessage'
      )}`,
    });
  };


  const onUpdateRecipeError = (err) => {
    setRecipeFormOpen(false);
    setSnackbar({
      open: true,
      isSuccess: false,
      message: err.response.message,
    });
  };

  const onRecipeDataSave = (recipeFormData: IRecipeData) => {
    const payload = {
      recipeName: recipeFormData.recipeName,
      description: recipeFormData.description,
      directives: recipeSteps,
    };
    updateRecipe(
      recipeData.recipeId.recipeId,
      payload,
      onUpdateRecipeResponse,
      onUpdateRecipeError
    );
  };

  const onRecipeDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleRecipeFormData({
      ...recipeFormData,
      description: event.target.value,
    });
  };

  return (
    <>
      <StyledPaper anchor="right" open={openDrawer} data-testid="edit-recipe-drawer-widget-parent">
        <StyledDrawerContainer role="presentation">
          <StyledHeader>
            <DrawerWidgetHeading headingText="Edit Recipe" />
            <CloseIconButton onClick={onClose}>
              <StyledCloseIcon color="action" data-testid="drawer-widget-close-round-icon" />
            </CloseIconButton>
          </StyledHeader>
          <StyledEditFormWrapper>
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
          </StyledEditFormWrapper>
        </StyledDrawerContainer>
      </StyledPaper>
    </>
  );
}
