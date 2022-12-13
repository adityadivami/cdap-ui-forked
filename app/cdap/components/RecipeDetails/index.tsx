/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import React from 'react';
import styled from 'styled-components';
import { Box, Container, Drawer, Typography } from '@material-ui/core';
import DrawerHeader from 'components/RecipeDetails/DrawerHeader';
import { grey } from '@material-ui/core/colors';
import T from 'i18n-react';
import { IRecipeItem } from 'components/SavedRecipeList';
import { dateFormatting } from 'components/RecipeDetails/utils';

interface IRecipeDetailsProps {
  recipeDetails: IRecipeItem;
  onCloseDetail: () => void;
}

const PREFIX = 'features.WranglerNewUI.RecipeDetails';

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    top: 46px;
    height: calc(100vh - 47px);
  }
`;

const DrawerContainerBox = styled(Container)`
  width: 460px;
  height: 100%;
  padding-left: 30px;
`;

const RecipeDetailWrapper = styled(Box)`
  margin-top: 19px;
`;

const RecipeName = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: ${grey[700]};
  text-transform: capitalize;
`;

const StepDetail = styled(Box)`
  margin: 10px 0;
`;

const DescriptionDetail = styled(Box)`
  margin: 20px 0;
`;

const RecipeDetailText = styled(Typography)`
  color: ${grey[700]};
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
`;

const RecipeStepText = styled(Typography)`
  color: ${grey[700]};
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
`;

const StepsGridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  padding: 15px 10px;
`;

const StepsGridWrapperHead = styled(StepsGridWrapper)`
  padding: 9px 10px;
`;

const StepsGridHead = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: ${grey[700]};
`;

const HeadDivider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${grey[700]};
  opacity: 0.6;
`;

const CellDivider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${grey[300]};
`;

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 25px;
  border-left: 1px solid ${grey[300]};
  margin: 0 10px;
`;

const getSerialNumber = (recipeStepIndex: number) => {
  if (recipeStepIndex < 10) {
    return `0${recipeStepIndex + 1}`;
  } else {
    return `${recipeStepIndex + 1}`;
  }
};

export default function({ recipeDetails, onCloseDetail }: IRecipeDetailsProps) {
  return (
    <StyledDrawer open={true} data-testid="select-column-panel" anchor="right">
      <DrawerContainerBox role="presentation" data-testid="select-column-drawer">
        <DrawerHeader onCloseDetail={onCloseDetail} />
        <RecipeDetailWrapper>
          <RecipeName component="h5" data-testid="recipe-name">
            {recipeDetails.recipeName}
          </RecipeName>
          <StepDetail>
            <RecipeDetailText component="div" data-testid="recipe-count-and-date">
              {`${recipeDetails.directives.length} ${T.translate(
                `${PREFIX}.tableHeaders.recipeStep`
              )}`}
              <VerticalDivider /> {dateFormatting(recipeDetails.createdTimeMillis)}
            </RecipeDetailText>
          </StepDetail>
          <DescriptionDetail>
            <RecipeDetailText data-testid="recipe-decription">
              {recipeDetails.description}
            </RecipeDetailText>
          </DescriptionDetail>
          <StepsGridWrapperHead>
            <StepsGridHead component="body1" data-testid="recipe-step-serial-number-column-head">
              {T.translate(`${PREFIX}.tableHeaders.serialNo`)}
            </StepsGridHead>
            <StepsGridHead component="body1" data-testid="recipe-step-text-column-head">
              {T.translate(`${PREFIX}.tableHeaders.recipeStep`)}
            </StepsGridHead>
          </StepsGridWrapperHead>
          <HeadDivider />
          {recipeDetails.directives.map((recipeStep, recipeStepIndex) => {
            return (
              <>
                <StepsGridWrapper>
                  <RecipeStepText component="body1" data-testid="recipe-step-index">
                    {getSerialNumber(recipeStepIndex)}
                  </RecipeStepText>
                  <RecipeStepText component="body1" data-testid={`recipe-step-text-${recipeStepIndex}`}>
                    {recipeStep}
                  </RecipeStepText>
                </StepsGridWrapper>
                {recipeStepIndex !== recipeDetails.directives.length - 1 && <CellDivider />}
              </>
            );
          })}
        </RecipeDetailWrapper>
      </DrawerContainerBox>
    </StyledDrawer>
  );
}
