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

const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

describe('Test RecipeImportList Component', () => {
  it('should check if the onClick triggered is as expected', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeRowElement = screen.getByTestId(/recipe-item-0/i);
    expect(recipeRowElement).toBeInTheDocument();
    fireEvent.click(recipeRowElement);
  });

  it('should check if the recipe item name head is as expected', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeNameElement = screen.getByTestId(/recipe-name-head/i);
    expect(recipeNameElement).toBeInTheDocument();
    expect(recipeNameElement).toHaveTextContent(`${T.translate(`${PREFIX}.recipeName`)}`);
  });

  it('should check if the recipe item count head is as expected', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeCountDateElement = screen.getByTestId(/recipe-steps-head/i);
    expect(recipeCountDateElement).toBeInTheDocument();
    expect(recipeCountDateElement).toHaveTextContent(`${T.translate(`${PREFIX}.steps`)}`);
  });

  it('should check if the recipe item description head is as expected', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeDescriptionElement = screen.getByTestId(/recipe-description-head/i);
    expect(recipeDescriptionElement).toBeInTheDocument();
    expect(recipeDescriptionElement).toHaveTextContent(`${T.translate(`${PREFIX}.description`)}`);
  });

  it('should check if the recipe item date head is as expected', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeSerialNumberElement = screen.getByTestId(/recipe-last-updated-head/i);
    expect(recipeSerialNumberElement).toBeInTheDocument();
    expect(recipeSerialNumberElement).toHaveTextContent(`${T.translate(`${PREFIX}.lastUpdated`)}`);
  });

  it('should test when recipe item is clicked', () => {
    render(<RecipeImportList previousStep={jest.fn()} nextStep={jest.fn()} />);
    const recipeSerialNumberElement = screen.getByTestId(/recipe-item-0/i);
    fireEvent.click(recipeSerialNumberElement);
  });
});
