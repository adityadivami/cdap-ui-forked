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
  margin-left: 31px;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 16px;
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

export default function({
  openDrawer,
  onCloseClick,
  onCancel,
  recipeData,
  setSnackbar,
  setRecipeFormOpen,
}) {
  const [recipeFormData, setRecipeFormData] = useState<IRecipeFormData>({
    recipeName: '',
    description: '',
    directives: [],
  });
  const [isNameError, setIsNameError] = useState(false);

  const [recipeNameError, setRecipeNameError] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
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

  const onGetRecipeByNameError = (err, value) => {
    if (err.statusCode === 404 && err.message === `recipe with name '${value}' does not exist`) {
      setIsNameError(false);
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRecipeDataSave(recipeFormData);
  };

  const onUpdateRecipeResponse = () => {
    setIsNameError(false);
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
    if (err.response.message) {
      setIsNameError(true);
    } else {
      setRecipeFormOpen(true);
      setSnackbar({
        open: true,
        isSuccess: false,
        message: T.translate('features.WranglerNewUI.RecipeForm.labels.errorMessage').toString(),
      });
    }
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

  return (
    <>
      <StyledPaper anchor="right" open={openDrawer} data-testid="edit-recipe-drawer-widget-parent">
        <StyledDrawerContainer role="presentation">
          <StyledHeader>
            <DrawerWidgetHeading headingText="Edit Recipe" />
            <CloseIconButton onClick={onCloseClick}>
              <StyledCloseIcon color="action" data-testid="drawer-widget-close-round-icon" />
            </CloseIconButton>
          </StyledHeader>
          <StyledEditFormWrapper>
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
          </StyledEditFormWrapper>
        </StyledDrawerContainer>
      </StyledPaper>
    </>
  );
}
