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

export const dateFormatting = (millisecondsTime) => {
  const normalDateString = new Date(millisecondsTime);
  const splitTime = normalDateString.toLocaleTimeString('en-US').split(':');
  const timeFormat = `${splitTime[0]}:${splitTime[1]}${splitTime[2].split(' ')[1]}`;
  const getMonthName = normalDateString.toLocaleString('default', { month: 'long' });
  const finalFormat = `${normalDateString.getDate()} ${getMonthName}, ${timeFormat}`;
  return finalFormat;
};

const Wrapper = styled(Box)`
  padding-left: 25px;
`;

const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 25% 15% 40% 20%;
  align-items: center;
  padding: 20px 10px;
  &:hover {
    background: ${grey[300]};
    cursor: pointer;
  }
`;

const GridHeadWrapper = styled(GridWrapper)`
  padding: 10px;
  &:hover {
    background: transparent;
    cursor: unset;
  }
  cursor: unset;
`;

const HeadDivider = styled(Box)`
  width: 100%;
  opacity: 0.6;
  border-bottom: 1px solid ${grey[700]};
`;

const CellDivider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${grey[300]};
`;

const GridHead = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

const GridCellText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

const getRecipeListMock = {
  nextPageToken: 'recipe6601',
  message: 'Success',
  count: 10,
  values: [
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: 'f9b4b5ae-8bc8-4896-9bb2-a2a831a6d522',
      },
      recipeName: 'RecipeABC1',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_1', 'titlecase: body_5'],
      createdTimeMillis: 1670584163250,
      updatedTimeMillis: 1670584163250,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: 'c5e51202-808e-4ead-b61f-83f280f3fdac',
      },
      recipeName: 'RecipeABC101',
      description: 'Recipe for cleansing empolyee information',
      directives: ['set-column :body_2_copy body_2 + \u0027text\u0027', 'trim :body_2'],
      createdTimeMillis: 1670584496578,
      updatedTimeMillis: 1670584496578,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '16b8551f-72a7-4b71-b867-1c8cbc0995a4',
      },
      recipeName: 'RecipeABC2',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_1', 'titlecase: body_5'],
      createdTimeMillis: 1670584245491,
      updatedTimeMillis: 1670584245491,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '8fc8da7b-f109-4771-80d3-c02ec4dd5259',
      },
      recipeName: 'RecipeABC3',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_3', 'titlecase: body_4'],
      createdTimeMillis: 1670584286877,
      updatedTimeMillis: 1670584286877,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '7e0ce92d-ae9a-4630-8af7-ec4eec745ccf',
      },
      recipeName: 'RecipeABC4',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_3', 'titlecase: body_4'],
      createdTimeMillis: 1670584303120,
      updatedTimeMillis: 1670584303120,
      recipeStepsCount: 2,
    },
  ],
  truncated: 'false',
};

export const DrawerContainerStyle = styled(Box)`
  width: 1010px;
  height: calc(100vh - 190px);
  border-right: 1px solid #e0e0e0;
  padding-left: 20px;
  padding-right: 20px;
`;

const RecipeImportSubText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  color: ${grey[700]};
  margin-top: 30px;
  margin-bottom: 20px;
  padding-left: 25px;
`;

export default function({ previousStep, nextStep }) {
  const recipeList = getRecipeListMock.values;
  return (
    <DrawerContainerStyle>
      <HeaderTemplate
        headingText={`${T.translate('features.WranglerNewUI.ImportRecipe.title')}`}
        previousStep={previousStep}
      />
      <RecipeImportSubText>
        {T.translate('features.WranglerNewUI.ImportRecipe.subTitle')}
      </RecipeImportSubText>
      {/* --------------- WRAPPER will be replaced by Saved Recipe List component ---------------- */}
      <Wrapper data-testid="saved-recipe-list-wrapper">
        <GridHeadWrapper>
          <GridHead component="body1" data-testid="recipe-name-head">
            {T.translate(`${PREFIX}.recipeName`)}
          </GridHead>
          <GridHead component="body1" data-testid="recipe-steps-head">
            {T.translate(`${PREFIX}.steps`)}
          </GridHead>
          <GridHead component="body1" data-testid="recipe-description-head">
            {T.translate(`${PREFIX}.description`)}
          </GridHead>
          <GridHead component="body1" data-testid="recipe-last-updated-head">
            {T.translate(`${PREFIX}.lastUpdated`)}
          </GridHead>
        </GridHeadWrapper>
        <HeadDivider />
        {recipeList.map((recipeItem, recipeIndex) => (
          <>
            <GridWrapper key={recipeItem.recipeId} onClick={() => nextStep(recipeItem)}>
              <GridCellText component="body1" data-testid={`recipe-name-${recipeIndex}`}>
                {recipeItem.recipeName}
              </GridCellText>
              <GridCellText component="body1" data-testid={`recipe-count-${recipeIndex}`}>
                {recipeItem.recipeStepsCount}
              </GridCellText>
              <GridCellText component="body1" data-testid={`recipe-description-${recipeIndex}`}>
                {recipeItem.description}
              </GridCellText>
              <GridCellText component="body1" data-testid={`recipe-date-${recipeIndex}`}>
                {dateFormatting(recipeItem.updatedTimeMillis)}
              </GridCellText>
            </GridWrapper>
            {recipeIndex !== recipeList.length - 1 && <CellDivider />}
          </>
        ))}
      </Wrapper>
    </DrawerContainerStyle>
  );
}
