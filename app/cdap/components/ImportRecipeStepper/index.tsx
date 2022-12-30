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

import React, { useState } from 'react';
import RecipeImportList from 'components/ImportRecipeStepper/RecipeImportList';
import RecipeDetail from 'components/ImportRecipeStepper/RecipeDetailImport';
import RecipeSteps from 'components/RecipeSteps';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { IRecipeItem } from 'components/RecipeDetails';

const RecipeStepPanel = styled(Box)`
  box-shadow: -3px 4px 15px rgba(68, 132, 245, 0.25);
`;

export default function({ setShowRecipePanel }) {
  const [current, setCurrentStep] = useState(1);
  const [componentData, setComponentData] = useState<IRecipeItem>();

  const nextStep = (data?) => {
    if (data) {
      setComponentData(data);
    }
    setCurrentStep(current + 1);
  };

  const previousStep = () => {
    setCurrentStep(current - 1);
  };

  const steps = [
    {
      value: 1,
      content: (
        <RecipeStepPanel>
          <RecipeSteps
            setShowRecipePanel={setShowRecipePanel}
            onDeleteRecipeSteps={() => console.log()}
            nextStep={nextStep}
          />
        </RecipeStepPanel>
      ),
    },
    {
      value: 2,
      content: <RecipeImportList nextStep={nextStep} previousStep={previousStep} />,
    },
    {
      value: 3,
      content: (
        <RecipeDetail
          nextStep={() => setCurrentStep(0)}
          recipeDetails={componentData}
          previousStep={previousStep}
        />
      ),
    },
  ];

  return (
    <Box data-testid="step-wrapper">
      {steps.map((item) => {
        return item.value === current && item.content;
      })}
    </Box>
  );
}
