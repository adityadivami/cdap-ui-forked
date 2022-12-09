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

import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import MyDataPrepApi from 'api/dataprep';
import { getCurrentNamespace } from 'services/NamespaceStore';

interface IRecipeId {
  namespace: {
    name: string;
    generation: number;
  };
  recipeId: string;
}

export interface IRecipeItem {
  recipeId: IRecipeId;
  recipeName: string;
  description: string;
  directives: string[];
  createdTimeMillis: number;
  updatedTimeMillis: number;
  recipeStepsCount: number;
}

interface ISavedRecipeListProps {
  onRecipeClick: (recipeId: string) => void;
}

const RecipeNameBox = styled(Box)`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: ${grey[700]};
  padding: 10px;
  border-bottom: 1px solid ${grey[300]};
  cursor: pointer;
`;

export default function({ onRecipeClick }: ISavedRecipeListProps) {
  const [recipeList, setRecipeList] = useState([]);
  const params = {
    context: getCurrentNamespace(),
  };
  const getAllRecipeList = () => {
    MyDataPrepApi.getRecipeList(params).subscribe((res) => {
      setRecipeList(res.values);
    });
  };

  useEffect(() => {
    getAllRecipeList();
  }, []);

  const recipeItemClicked = (recipeItem: IRecipeItem) => {
    onRecipeClick(recipeItem.recipeId.recipeId);
  };

  return (
    <>
      {recipeList.map((recipeItem: IRecipeItem, recipeIndex) => {
        return (
          <RecipeNameBox
            data-testid={`recipe-box-${recipeIndex}`}
            onClick={() => recipeItemClicked(recipeItem)}
          >
            {recipeItem.recipeName}
          </RecipeNameBox>
        );
      })}
    </>
  );
}
