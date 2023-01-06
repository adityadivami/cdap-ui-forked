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
import { format, TYPES } from 'services/DataFormatter';
import DirectiveTable from 'components/RecipeManagement/RecipeDetails/DirectivesTable';
import { IRecipeDetailsProps } from 'components/RecipeManagement/types';

const PREFIX = 'features.WranglerNewUI.Recipe';

const DetailsWrapper = styled(Box)`
  margin-top: 19px;
`;

const RecipeNameLabel = styled(Typography)`
  text-transform: capitalize;
  color: ${grey[900]};
  font-size: 16px;
  font-weight: 400;
`;

const DescriptionWrapper = styled(Box)`
  margin: 20px 0 10px;
`;

const DetailsText = styled(Typography)`
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

const RecipeDetails = ({ selectedRecipe }: IRecipeDetailsProps) => {
  return (
    <DetailsWrapper>
      <RecipeNameLabel component="h5" data-testid="recipe-name">
        {selectedRecipe.recipeName}
      </RecipeNameLabel>
      <DescriptionWrapper>
        <DetailsText component="div" data-testid="recipe-count-and-date">
          {`${selectedRecipe.directives.length} ${T.translate(
            `${PREFIX}.common.tableHeaders.recipeStep`
          )}`}
          <VerticalDivider /> {format(selectedRecipe.updatedTimeMillis, TYPES.TIMESTAMP_MILLIS)}
        </DetailsText>
      </DescriptionWrapper>
      <DescriptionWrapper>
        <DetailsText component="p" data-testid="recipe-decription">
          {selectedRecipe.description}
        </DetailsText>
      </DescriptionWrapper>
      <DirectiveTable directives={selectedRecipe.directives} />
    </DetailsWrapper>
  );
};

export default RecipeDetails;
