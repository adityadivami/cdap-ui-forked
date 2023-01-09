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

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import EditRecipe from 'components/RecipeManagement/EditRecipe';

describe('Test Create Recipe Component', () => {
  beforeEach(() => {
    render(
      <EditRecipe
        selectedRecipe={{
          recipeId: {
            namespace: { name: 'default', generation: '0' },
            recipeId: 'd428d827-e25d-45bb-83d6-7f24d9af9bfe',
          },
          recipeName: 'recipeName',
          description: 'recipe description',
          directives: ['uppercase: body1', 'titlecase: body2'],
          recipeStepsCount: 2,
          createdTimeMillis: 1672837524405,
          updatedTimeMillis: 1673259206448,
        }}
        onCancelClick={jest.fn()}
        setSnackbar={jest.fn()}
        setRecipeFormOpen={jest.fn()}
        setIsRecipeListUpdated={jest.fn()}
      />
    );
  });

  it('should render the component as expected', () => {
    const parentElement = screen.getByTestId(/edit-recipe-drawer-widget-parent/i);
    expect(parentElement).toBeInTheDocument();
  });
});
