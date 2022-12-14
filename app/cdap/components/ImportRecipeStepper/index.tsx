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

import React from 'react';
import {Box, Button, Typography} from '@material-ui/core';
import ArrowBackIosOutlined from '@material-ui/icons/ArrowBackIosOutlined';

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
    ],
    truncated: 'false',
  };
  


export default function({
    recipeItem,

}) {
    const selectedStep = 1
    const Component1 = () => <Button onClick={() => }>Open List</Button>
const Component2 = () => <div>
    <Typography><ArrowBackIosOutlined/>Import Recipe</Typography>
    {getRecipeListMock.values.map((item)=> <Box role="button" tabIndex={0}>{item.recipeName}</Box>)}
</div>
const Component3 = (recipeItem) => <div>
    <ArrowBackIosOutlined/>
    <h1>{recipeItem.recipeName}</h1>
    <p>{recipeItem.description}</p>
</div>

const steps = [
{    component: Component1,
    value: 1
},
{    component: Component2,
    value: 2
},
{    component: Component3,
    value: 3
}
]
  return (
    <Box sx={{ width: '100%' }}>
        {steps.map((stepOption) =>{
            const Component = stepOption.component
            return (selectedStep === stepOption.value) && <Component recipeItem={recipeItem}/>
        })}
    </Box>
  );
}