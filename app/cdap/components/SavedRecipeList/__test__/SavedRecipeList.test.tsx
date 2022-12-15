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
import { dateFormatting } from 'components/SavedRecipeList/utils';
import MyDataPrepApi from 'api/dataprep';

const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

const recipeDetailsMockData = {
  recipeId: {
    namespace: {
      name: 'default',
      generation: 0,
    },
    recipeId: '67832db1-70da-4caa-b7de-8dab2e9bd1c3',
  },
  recipeName: 'recipe501',
  description: 'desc401',
  directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
  createdTimeMillis: 1670825128222,
  updatedTimeMillis: 1670825128222,
  recipeStepsCount: 4,
};

const getRecipeListMock = {
  nextPageToken: 'recipe6601',
  message: 'Success',
  count: 10,
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
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '4d906696-abc4-41d5-95fe-2b8aba31a210',
      },
      recipeName: 'recipe301',
      description: 'desc301',
      directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
      createdTimeMillis: 1670824506385,
      updatedTimeMillis: 1670824506385,
      recipeStepsCount: 4,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: 'a85d29d7-383c-4767-a29d-a9964bdd4295',
      },
      recipeName: 'recipe3032',
      description: 'desc301',
      directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
      createdTimeMillis: 1670824609478,
      updatedTimeMillis: 1670824609478,
      recipeStepsCount: 4,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: 'fd247506-dcba-4023-83a2-ebfb22aa49ec',
      },
      recipeName: 'recipe304',
      description: 'desc301',
      directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
      createdTimeMillis: 1670824647200,
      updatedTimeMillis: 1670824647200,
      recipeStepsCount: 4,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '2eacb6f9-2eda-4532-aec6-914778c5915d',
      },
      recipeName: 'recipe401',
      description: 'desc401',
      directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
      createdTimeMillis: 1670825117873,
      updatedTimeMillis: 1670825117873,
      recipeStepsCount: 4,
    },
    {
      recipeId: {
        namespace: {
          name: 'default',
          generation: 0,
        },
        recipeId: '67832db1-70da-4caa-b7de-8dab2e9bd1c3',
      },
      recipeName: 'recipe501',
      description: 'desc401',
      directives: ['uppercase: body1', 'titlecase: body2', 'uppercase: body3', 'titlecase: body4'],
      createdTimeMillis: 1670825128222,
      updatedTimeMillis: 1670825128222,
      recipeStepsCount: 4,
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

  it('should check if the recipe item name head is as expected', () => {
    render(<SavedRecipeList setLoading={jest.fn()} />);
    const recipeNameElement = screen.getByTestId(/recipe-name-head/i);
    expect(recipeNameElement).toBeInTheDocument();
    expect(recipeNameElement).toHaveTextContent(`${T.translate(`${PREFIX}.recipeName`)}`);
  });

  it('should check if the recipe item count head is as expected', () => {
    render(<SavedRecipeList setLoading={jest.fn()} />);
    const recipeCountDateElement = screen.getByTestId(/recipe-steps-head/i);
    expect(recipeCountDateElement).toBeInTheDocument();
    expect(recipeCountDateElement).toHaveTextContent(`${T.translate(`${PREFIX}.steps`)}`);
  });

  it('should check if the recipe item description head is as expected', () => {
    render(<SavedRecipeList setLoading={jest.fn()} />);
    const recipeDescriptionElement = screen.getByTestId(/recipe-description-head/i);
    expect(recipeDescriptionElement).toBeInTheDocument();
    expect(recipeDescriptionElement).toHaveTextContent(`${T.translate(`${PREFIX}.description`)}`);
  });

  it('should check if the recipe item date head is as expected', () => {
    render(<SavedRecipeList setLoading={jest.fn()} />);
    const recipeSerialNumberElement = screen.getByTestId(/recipe-last-updated-head/i);
    expect(recipeSerialNumberElement).toBeInTheDocument();
    expect(recipeSerialNumberElement).toHaveTextContent(`${T.translate(`${PREFIX}.lastUpdated`)}`);
  });
});
