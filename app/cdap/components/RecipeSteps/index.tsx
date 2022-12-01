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
import DataPrepStore from 'components/DataPrep/store';
import React, { useEffect, Fragment, useState } from 'react';
import RecipeHeaderActionTemplate from 'components/RecipeSteps/RecipeHeaderActionTemplate';
import RecipeStepsEmptyScreen from 'components/RecipeSteps/RecipeStepsEmptyScreen';
import RecipeStepsTableComponent from 'components/RecipeSteps/RecipeStepsTableComponent';
import T from 'i18n-react';
import { IRecipeStepsProps } from 'components/RecipeSteps/types';
import styled from 'styled-components';
import RecipeStepWidget from 'components/RecipeSteps/RecipeStepWidget';
import CreaeRecipe from 'components/CreateRecipe';

const RecipeStepsBody = styled(Container)`
  height: calc(100% - 100px);
  padding: 0px;
`;

const DrawerContainer = styled(Container)`
  width: 460px;
  height: 100%;
  border-top: 1px solid #3994ff;
  height: calc(100vh - 190px);
  border-right: 1px solid #e0e0e0;
`;

const Header = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0px;
  padding-right: 0px;
`;

const HeaderTextIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RecipeStepInfo = styled(Typography)`
  margin-top: 15px;
`;

export default function({ setShowRecipePanel, deleteRecipes }: IRecipeStepsProps) {
  const [recipeSteps, setRecipeSteps] = useState<string[]>([]);

  const { dataprep } = DataPrepStore.getState();

  useEffect(() => {
    setRecipeSteps(dataprep.directives);
  }, [dataprep]);

  const closeClickHandler = () => {
    setShowRecipePanel(false);
  };

  const handleDeleteRecipeSteps = (new_arr, remaining_arr) => {
    deleteRecipes(new_arr, remaining_arr);
  };

  return (
    <Fragment>
      <RecipeStepWidget
        headingText={T.translate('features.WranglerNewUI.WranglerNewRecipeSteps.labels.recipe')}
        onClose={closeClickHandler}
        showDivider={true}
        headerActionTemplate={<RecipeHeaderActionTemplate />}
      >
        <RecipeStepsBody>
          {Array.isArray(recipeSteps) && recipeSteps.length ? (
            <>
              <RecipeStepsTableComponent
                recipeSteps={recipeSteps}
                handleDeleteRecipeSteps={handleDeleteRecipeSteps}
              />
              <Divider />
              <RecipeStepInfo>
                2 steps will be saved as a recpe. You can access this saved recipe from the recipes
                section on Wrangler Home page.
              </RecipeStepInfo>
              <CreaeRecipe />
            </>
          ) : (
            <RecipeStepsEmptyScreen />
          )}
        </RecipeStepsBody>
      </RecipeStepWidget>
    </Fragment>

    // <DrawerWidget
    //   headingText={T.translate('features.WranglerNewUIWranglerNewRecipeSteps.labels.recipe')}
    //   openDrawer={showRecipePanel}
    //   showDivider={true}
    //   headerActionTemplate={<RecipeHeaderActionTemplate />}
    //   closeClickHandler={closeClickHandler}
    // >
    //   <RecipeStepsBody>
    //     {Array.isArray(recipeSteps) && recipeSteps.length ? (
    //       <RecipeStepsTableComponent
    //         recipeSteps={recipeSteps}
    //         handleDeleteRecipeSteps={handleDeleteRecipeSteps}
    //       />
    //     ) : (
    //       <RecipeStepsEmptyScreen />
    //     )}
    //   </RecipeStepsBody>
    // </DrawerWidget>
  );
}
