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

import { Container, Divider, Typography } from '@material-ui/core';
import React from 'react';
import RecipeHeaderActionTemplate from 'components/RecipeSteps/RecipeHeaderActionTemplate';
import RecipeStepsEmptyScreen from 'components/RecipeSteps/RecipeStepsEmptyScreen';
import RecipeStepsTableComponent from 'components/RecipeSteps/RecipeStepsTableComponent';
import T from 'i18n-react';
import RecipeStepWidget from 'components/RecipeSteps/RecipeStepWidget';
import styled from 'styled-components';
import CreateRecipe from 'components/CreateRecipe';

export interface IRecipeStepsProps {
  setShowRecipePanel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRecipeSaveForm: React.Dispatch<React.SetStateAction<boolean>>;
  showRecipeSaveForm: boolean;
  onRecipeDataSave: (data) => void;
  recipeData: IRecipeData;
  onCancel: () => void;
  isNameError: boolean;
  setIsNameError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IRecipeData {
  name: string;
  description: string;
  directives: string[];
  id?: number;
}

const RecipeStepsTableBodyWrapper = styled(Container)`
  max-height: calc(100% - 456px);
  padding: 0px;
`;

const RecipeStepInfo = styled(Typography)`
  margin-top: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: #616161;
  padding-left: 20px;
  padding-right: 25px;
`;

export default function({
  setShowRecipePanel,
  setShowRecipeSaveForm,
  showRecipeSaveForm,
  recipeData,
  onRecipeDataSave,
  onCancel,
  isNameError,
  setIsNameError,
}: IRecipeStepsProps) {
  const recipe_steps = [
    'uppercase: body1',
    'titlecase: body2',
    'uppercase: body3',
    'titlecase: body4',
  ];

  const closeClickHandler = () => {
    setShowRecipePanel(false);
  };

  if (!(Array.isArray(recipe_steps) && recipe_steps.length)) {
    return <RecipeStepsEmptyScreen />;
  }

  return (
    <>
      <RecipeStepWidget
        headingText={T.translate('features.WranglerNewUI.WranglerNewRecipeSteps.labels.recipe')}
        onClose={closeClickHandler}
        showDivider={true}
        headerActionTemplate={
          <RecipeHeaderActionTemplate setShowRecipeSaveForm={setShowRecipeSaveForm} />
        }
        setShowRecipeSaveForm={setShowRecipeSaveForm}
        showRecipeSaveForm={showRecipeSaveForm}
      >
        <RecipeStepsTableBodyWrapper>
          <RecipeStepsTableComponent recipeSteps={recipe_steps} />
        </RecipeStepsTableBodyWrapper>
        <Divider />
        {showRecipeSaveForm && (
          <>
            <RecipeStepInfo component="div">
              {T.translate('features.WranglerNewUI.RecipeForm.labels.recipeFormInfo')}
            </RecipeStepInfo>
            <CreateRecipe
              recipeData={recipeData}
              onRecipeDataSave={onRecipeDataSave}
              onCancel={onCancel}
              isNameError={isNameError}
              setIsNameError={setIsNameError}
            />
          </>
        )}
      </RecipeStepWidget>
    </>
  );
}
