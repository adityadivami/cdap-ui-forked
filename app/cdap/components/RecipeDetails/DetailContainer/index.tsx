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
import { Box, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import T from 'i18n-react';
import { IRecipeData } from 'components/RecipeDetails';
import { format, TYPES } from 'services/DataFormatter';
import DirectiveTable from 'components/RecipeDetails/DirectivesTable';

interface IRecipeDetailsProps {
  recipe: IRecipeData;
}

const PREFIX = 'features.WranglerNewUI.RecipeDetails';

const RecipeDetailWrapper = styled(Box)`
  margin-top: 19px;
`;

const StepsGridHead = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: ${grey[700]};
`;

const StyledRecipeName = styled(StepsGridHead)`
  text-transform: capitalize;
  color: ${grey[900]};
  font-size: 16px;
  font-weight: 400;
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

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 25px;
  border-left: 1px solid ${grey[300]};
  margin: 0 10px;
`;

export default function({ recipe }: IRecipeDetailsProps) {
  return (
    <RecipeDetailWrapper>
      <StyledRecipeName component="h5" data-testid="recipe-name">
        {recipe.recipeName}
      </StyledRecipeName>
      <StepDetail>
        <RecipeDetailText component="div" data-testid="recipe-count-and-date">
          {`${recipe.directives.length} ${T.translate(`${PREFIX}.tableHeaders.recipeStep`)}`}
          <VerticalDivider /> {format(recipe.updatedTimeMillis, TYPES.TIMESTAMP_MILLIS)}
        </RecipeDetailText>
      </StepDetail>
      <DescriptionDetail>
        <RecipeDetailText component="p" data-testid="recipe-decription">
          {recipe.description}
        </RecipeDetailText>
      </DescriptionDetail>
      <DirectiveTable directives={recipe.directives}/>
    </RecipeDetailWrapper>
  );
}
