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

import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import HeaderTemplate from 'components/ImportRecipeStepper/HeaderTemplate';
import { grey } from '@material-ui/core/colors';
import T from 'i18n-react';
import RecipeList from 'components/RecipeList';
import { SortBy, SortOrder } from 'components/RecipeList/types';

interface IRecipeImportListProps {
  previousStep: () => void;
  nextStep: (data?) => void;
}

const PREFIX = 'features.WranglerNewUI.ImportRecipe';

const RecipeImportSubText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: ${grey[700]};
  margin-top: 30px;
  margin-bottom: 10px;
  padding-left: 25px;
`;

export const DrawerContainerStyle = styled(Box)`
  width: 1010px;
  height: calc(100vh - 190px);
  border-right: 1px solid ${grey[300]};
  padding-left: 20px;
  padding-right: 20px;
`;

export default function({ previousStep, nextStep }: IRecipeImportListProps) {
  const handleSelectRecipe = (selectedObject: any) => {
    nextStep(selectedObject);
  };

  return (
    <DrawerContainerStyle data-testid="recipe-import-list-container">
      <HeaderTemplate
        headingText={`${T.translate(`${PREFIX}.title`)}`}
        previousStep={previousStep}
      />
      <RecipeImportSubText data-testid="recipe-import-sub-text">
        {T.translate(`${PREFIX}.subTitle`)}
      </RecipeImportSubText>
      <Box m={2}>
        <RecipeList
          isOpen={true}
          showAllColumns={false}
          showActions={false}
          selectHandler={handleSelectRecipe}
          sortBy={SortBy.UPDATED}
          sortOrder={SortOrder.DESCENDING}
          pageSize={6}
          showPagination={true}
          enableSorting={true}
        />
      </Box>
    </DrawerContainerStyle>
  );
}
