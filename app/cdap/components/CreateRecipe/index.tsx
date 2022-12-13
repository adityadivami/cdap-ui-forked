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

import { Box, Container, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import styled from 'styled-components';
import Snackbar, { ISnackbar } from 'components/Snackbar';
import useSnackbar from 'components/Snackbar/useSnackbar';
import CommonRecipeForm from 'components/CreateEditRecipeForm';
import DataPrepStore from 'components/DataPrep/store';
import MyDataPrepApi from 'api/dataprep';
import { getCurrentNamespace } from 'services/NamespaceStore';
import T from 'i18n-react';

// interface IDrawerWidgetProps {
//   headingText: React.ReactNode;
//   openDrawer: boolean;
//   onCloseClick: () => void;
//   recipeData: IRecipeData;
//   onCancel: () => void;
//   onRecipeDataSave: (data: IRecipeData) => void;
//   isNameError: boolean;
//   setIsNameError: React.Dispatch<React.SetStateAction<boolean>>;
//   setSnackbar: (value: ISnackbar) => void;
//   snackbarState: ISnackbar;
// }

const DrawerContainerStyle = styled(Container)`
  width: 460px;
  height: calc(100vh - 225px);
  height: 100%;
  padding-left: 0px;
  padding-right: 0px;
  overflow-y: scroll;
`;

const HeaderStyle = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
`;

const HeaderTextBackIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CloseIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const CloseIconStyle = styled(CloseRoundedIcon)`
  cursor: pointer;
`;

const PaperStyle = styled(Drawer)`
  & .MuiDrawer-paper {
    top: 46px;
    height: calc(100vh - 47px);
    width: 500px;
  }
`;

interface ICreateRecipeProps {
  openDrawer: Boolean;
  setRecipeFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbar: (value: ISnackbar) => void;
}

export default function({ openDrawer, setRecipeFormOpen, setSnackbar }: ICreateRecipeProps) {
  const [isNameError, setIsNameError] = useState(false);

  const { dataprep } = DataPrepStore.getState();
  const { recipe } = dataprep;

  const recipeSteps = [
    'uppercase: body1',
    'titlecase: body2',
    'uppercase: body3',
    'titlecase: body4',
  ];

  const onCloseClick = () => {
    setRecipeFormOpen(false);
  };

  const saveRecipeData = (data) => {
    const params = {
      context: getCurrentNamespace(),
    };
    const requestBody = {
      recipeName: data.recipeName,
      description: data.description,
      directives: recipeSteps,
    };
    MyDataPrepApi.createRecipe(params, requestBody).subscribe(
      () => {
        setIsNameError(false);
        setRecipeFormOpen(false);
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
          setRecipeFormOpen(false);

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
  };

  const onRecipeFormCancel = () => {
    setRecipeFormOpen(false);
    setIsNameError(false);
  };

  const onRecipeDataSave = (data) => {
    setIsNameError(false);
    saveRecipeData(data);
  };

  return (
    <PaperStyle anchor="right" open={openDrawer} data-testid="edit-recipe-drawer-widget-parent">
      <DrawerContainerStyle role="presentation">
        <HeaderStyle>
          <HeaderTextBackIconWrapper>Save Recipe</HeaderTextBackIconWrapper>

          <CloseIconWrapper>
            <CloseIconStyle
              color="action"
              onClick={onCloseClick}
              data-testid="drawer-widget-close-round-icon"
            />
          </CloseIconWrapper>
        </HeaderStyle>
        <CommonRecipeForm
          recipeData={recipe}
          onRecipeDataSave={onRecipeDataSave}
          onCancel={onRecipeFormCancel}
          isNameError={isNameError}
          setIsNameError={setIsNameError}
        />
      </DrawerContainerStyle>
    </PaperStyle>
  );
}
