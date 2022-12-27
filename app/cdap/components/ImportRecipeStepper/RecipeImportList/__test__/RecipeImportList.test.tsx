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

import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import RecipeImportList from 'components/ImportRecipeStepper/RecipeImportList';
import React from 'react';
import T from 'i18n-react';

const PREFIX = 'features.WranglerNewUI.ImportRecipe';

describe('Test RecipeImportList Component', () => {
  it('Should render RecipeImportList Component', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeImportContainer = screen.getByTestId(/recipe-import-list-container/i);
    expect(recipeImportContainer).toBeInTheDocument();
  });

  it('Should render RecipeImportList Component and recipeImportSubText should be as expected.', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeImportSubText = screen.getByTestId(/recipe-import-sub-text/i);
    expect(recipeImportSubText).toHaveTextContent(T.translate(`${PREFIX}.subTitle`).toString());
  });
});
