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
import MyDataPrepApi from 'api/dataprep';
import SavedRecipeList from 'components/SavedRecipeList';
import React from 'react';

const getRecipeListMock = {
  nextPageToken: '',
  message: 'Success',
  count: 5,
  values: [
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: 'f9b4b5ae-8bc8-4896-9bb2-a2a831a6d522',
      },
      recipeName: 'RecipeABC1',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_1', 'titlecase: body_5'],
      createdTimeMillis: 1670584163250,
      updatedTimeMillis: 1670584163250,
      recipeStepsCount: 2,
    },
    {
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
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '16b8551f-72a7-4b71-b867-1c8cbc0995a4',
      },
      recipeName: 'RecipeABC2',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_1', 'titlecase: body_5'],
      createdTimeMillis: 1670584245491,
      updatedTimeMillis: 1670584245491,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '8fc8da7b-f109-4771-80d3-c02ec4dd5259',
      },
      recipeName: 'RecipeABC3',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_3', 'titlecase: body_4'],
      createdTimeMillis: 1670584286877,
      updatedTimeMillis: 1670584286877,
      recipeStepsCount: 2,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '7e0ce92d-ae9a-4630-8af7-ec4eec745ccf',
      },
      recipeName: 'RecipeABC4',
      description: 'Recipe for cleansing empolyee information',
      directives: ['uppercase: body_3', 'titlecase: body_4'],
      createdTimeMillis: 1670584303120,
      updatedTimeMillis: 1670584303120,
      recipeStepsCount: 2,
    },
  ],
  truncated: 'false',
};

describe('Test SavedRecipeList Component', () => {
  jest.spyOn(MyDataPrepApi, 'getRecipeList').mockImplementation(() => {
    return {
      subscribe: (callback) => {
        callback(getRecipeListMock);
      },
    };
  });

  it('should render the SavedRecipeList Component and trigger the click event expecting onRecipeClick to be called once', () => {
    const recipeClickListener = jest.fn();
    render(<SavedRecipeList onRecipeClick={recipeClickListener} />);
    const recipeRowElement = screen.getByTestId(/recipe-box-0/i);
    fireEvent.click(recipeRowElement);
    expect(recipeRowElement).toBeInTheDocument();
    expect(recipeClickListener).toHaveBeenCalled();
  });
});
