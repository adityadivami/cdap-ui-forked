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
import { Box, Button } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import T from 'i18n-react';
import { DrawerContainerStyle } from 'components/ImportRecipeStepper/RecipeImportList';
import HeaderTemplate from 'components/ImportRecipeStepper/HeaderTemplate';
import RecipeDetails from 'components/RecipeDetails/DetailContainer';
import { IRecipeItem } from 'components/RecipeDetails';

interface IRecipeDetailImportProps {
  recipeDetails: IRecipeItem;
  previousStep: () => void;
  nextStep: (data?) => void;
}

const PREFIX = 'features.WranglerNewUI.ImportRecipe';

const RecipeDetailWrapper = styled(Box)`
  margin-top: 30px;
  padding-left: 30px;
  height: 70%;
`;

const ButtonWrapper = styled(Box)`
  text-align: right;
`;

const ImportStepsButton = styled(Button)`
  width: 162px;
  height: 36px;
  margin-left: 10px;
  background: ${blue[500]};
  box-shadow: 0px 2px 4px rgba(70, 129, 244, 0.15);
  border-radius: 4px;
  color: #ffffff;
  &:hover {
    background: ${blue[500]};
    color: #ffffff;
  }
`;

const CancelButton = styled(Button)`
  width: 162px;
  height: 36px;
  border-color: ${blue[500]};
  border-radius: 4px;
  color: ${blue[500]};
  &:hover {
    border-color: ${blue[500]};
    background: #ffffff;
    color: ${blue[500]};
  }
`;

export default function({ recipeDetails, previousStep, nextStep }: IRecipeDetailImportProps) {
  return (
    <DrawerContainerStyle>
      <HeaderTemplate
        headingText={`${T.translate(`${PREFIX}.title`)}`}
        previousStep={previousStep}
      />
      <RecipeDetailWrapper>
        <RecipeDetails recipeDetails={recipeDetails} />
      </RecipeDetailWrapper>
      <ButtonWrapper>
        <CancelButton variant="outlined">{T.translate(`${PREFIX}.cancel`)}</CancelButton>
        <ImportStepsButton variant="contained">
          {T.translate(`${PREFIX}.importSteps`)}
        </ImportStepsButton>
      </ButtonWrapper>
    </DrawerContainerStyle>
  );
}
