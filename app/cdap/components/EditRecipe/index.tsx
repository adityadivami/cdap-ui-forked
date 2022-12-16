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
import DrawerWidgetHeading from './DrawerWidgetHeading';
import CreateAndEditRecipeForm from 'components/CreateAndEditRecipeForm';
import { IRecipeData } from 'components/CreateAndEditRecipeForm/types';
import styled from 'styled-components';
import Snackbar, { ISnackbar } from 'components/Snackbar';
import MyDataPrepApi from 'api/dataprep';
import DataPrepStore from 'components/DataPrep/store';

interface IDrawerWidgetProps {
  headingText: React.ReactNode;
  openDrawer: boolean;
  onCloseClick: () => void;
  recipeData: IRecipeData;
  onCancel: () => void;
  setSnackbar: (value: ISnackbar) => void;
  snackbarState: ISnackbar;
}

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

export default function({
  headingText,
  openDrawer,
  onCloseClick,
  recipeData,
  snackbarState,
  setSnackbar,
}: IDrawerWidgetProps) {
  const [recipeFormOpen, setRecipeFormOpen] = useState(true);

  return (
    <>
      <PaperStyle anchor="right" open={openDrawer} data-testid="edit-recipe-drawer-widget-parent">
        <DrawerContainerStyle role="presentation">
          <HeaderStyle>
            <HeaderTextBackIconWrapper>
              <DrawerWidgetHeading headingText={headingText} />
            </HeaderTextBackIconWrapper>

            <CloseIconWrapper>
              <CloseIconStyle
                color="action"
                onClick={onCloseClick}
                data-testid="drawer-widget-close-round-icon"
              />
            </CloseIconWrapper>
          </HeaderStyle>
          <CreateAndEditRecipeForm
            recipeData={recipeData}
            setIsCreateAndEditRecipeFormOpen={setRecipeFormOpen}
            recipeFormAction="editRecipe"
            setSnackbar={setSnackbar}
          />
        </DrawerContainerStyle>
        <Snackbar
          handleClose={() => setSnackbar({ open: false })}
          open={snackbarState.open}
          message={snackbarState.message}
          isSuccess={snackbarState.isSuccess}
        />
      </PaperStyle>
    </>
  );
}
