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
import SavedRecipeList from 'components/SavedRecipeList';
import React from 'react';
import T from 'i18n-react';
import {dateFormatting} from 'components/SavedRecipeList/utils';

const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

const recipeDetailsMockData =         {
    "recipeId": {
        "namespace": {
            "name": "default",
            "generation": 0
        },
        "recipeId": "c5e51202-808e-4ead-b61f-83f280f3fdac"
    },
    "recipeName": "RecipeABC101",
    "description": "Recipe for cleansing empolyee information",
    "directives": [
        "set-column :body_2_copy body_2 + \u0027text\u0027",
        "trim :body_2"
    ],
    "createdTimeMillis": 1670584496578,
    "updatedTimeMillis": 1670584496578,
    "recipeStepsCount": 2
};

describe('Test SavedRecipeList Component', () => {
  const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

  beforeEach(() => {
    render(<SavedRecipeList setLoading={jest.fn()} />);
  });

  it('should check if the recipe item name is as expected', () => {
    const recipeNameElement = screen.getByTestId(/recipe-name-0/i);
    expect(recipeNameElement).toBeInTheDocument();
    expect(recipeNameElement).toHaveTextContent('RecipeABC101');
  });

  it('should check if the recipe item count is as expected', () => {
    const recipeCountDateElement = screen.getByTestId(/recipe-count-0/i);
    expect(recipeCountDateElement).toBeInTheDocument();
    expect(recipeCountDateElement).toHaveTextContent('2');
  });

  it('should check if the recipe item description is as expected', () => {
    const recipeDescriptionElement = screen.getByTestId(/recipe-decription-0/i);
    expect(recipeDescriptionElement).toBeInTheDocument();
    expect(recipeDescriptionElement).toHaveTextContent('Recipe for cleansing empolyee information');
  });

  it('should check if the recipe item date is as expected', () => {
    const recipeSerialNumberElement = screen.getByTestId(/recipe-date-0/i);
    expect(recipeSerialNumberElement).toBeInTheDocument();
    expect(recipeSerialNumberElement).toHaveTextContent(`${dateFormatting(recipeDetailsMockData.updatedTimeMillis)}`);
  });

  it('should check if the recipe item name head is as expected', () => {
    const recipeNameElement = screen.getByTestId(/recipe-name-head/i);
    expect(recipeNameElement).toBeInTheDocument();
    expect(recipeNameElement).toHaveTextContent(`${T.translate(`${PREFIX}.recipeName`)}`);
  });

  it('should check if the recipe item count head is as expected', () => {
    const recipeCountDateElement = screen.getByTestId(/recipe-count-head/i);
    expect(recipeCountDateElement).toBeInTheDocument();
    expect(recipeCountDateElement).toHaveTextContent(`${T.translate(`${PREFIX}.steps`)}`);
  });

  it('should check if the recipe item description head is as expected', () => {
    const recipeDescriptionElement = screen.getByTestId(/recipe-decription-head/i);
    expect(recipeDescriptionElement).toBeInTheDocument();
    expect(recipeDescriptionElement).toHaveTextContent(`${T.translate(`${PREFIX}.description`)}`);
  });

  it('should check if the recipe item date head is as expected', () => {
    const recipeSerialNumberElement = screen.getByTestId(/recipe-last-updated-head/i);
    expect(recipeSerialNumberElement).toBeInTheDocument();
    expect(recipeSerialNumberElement).toHaveTextContent(`${T.translate(`${PREFIX}.lastUpdated`)}`);
  });

});
