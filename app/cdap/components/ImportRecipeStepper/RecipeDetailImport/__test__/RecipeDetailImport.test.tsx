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

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import RecipeDetailImport from 'components/ImportRecipeStepper/RecipeDetailImport';
import React from 'react';
import T from 'i18n-react';

const PREFIX = 'features.WranglerNewUI.ImportRecipe';

const recipeDetailsMockData = {
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
};

describe('Test RecipeDetailsImport Component', () => {
  it('Should render RecipeDetailImport Component.', () => {
    render(
      <RecipeDetailImport
        nextStep={jest.fn()}
        recipeDetails={recipeDetailsMockData}
        previousStep={jest.fn()}
      />
    );
    const recipeDetailContainer = screen.getByTestId(/recipe-detail-import-container/i);
    expect(recipeDetailContainer).toBeInTheDocument();
  });

  it('Should test Cancel Button.', () => {
    render(
      <RecipeDetailImport
        nextStep={jest.fn()}
        recipeDetails={recipeDetailsMockData}
        previousStep={jest.fn()}
      />
    );
    const cancelButton = screen.getByTestId(/recipe-detail-import-cancel-button/i);
    expect(cancelButton).toHaveTextContent(T.translate(`${PREFIX}.cancel`).toString());
    expect(cancelButton).toBeInTheDocument();
  });

  it('Should test Import Steps Button.', () => {
    render(
      <RecipeDetailImport
        nextStep={jest.fn()}
        recipeDetails={recipeDetailsMockData}
        previousStep={jest.fn()}
      />
    );
    const importStepsButton = screen.getByTestId(/recipe-detail-import-steps-button/i);
    expect(importStepsButton).toHaveTextContent(T.translate(`${PREFIX}.importSteps`).toString());
    expect(importStepsButton).toBeInTheDocument();
  });
});
