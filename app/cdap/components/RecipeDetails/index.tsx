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

import React from 'react';
import styled from 'styled-components';
import { Container, Drawer } from '@material-ui/core';
import DrawerHeader from 'components/RecipeDetails/DrawerHeader';
import RecipeDetailContainer from 'components/RecipeDetails/DetailContainer';

interface INameSpace {
  name: string;
  generation: number;
}

interface IRecipeId {
  namespace: INameSpace;
  recipeId: string;
}

export interface IRecipeData {
  recipeId: IRecipeId;
  recipeName: string;
  description: string;
  directives: string[];
  createdTimeMillis: number;
  updatedTimeMillis: number;
  recipeStepsCount: number;
}

interface IRecipeDetailsProps {
  recipe: IRecipeData;
  onCloseDetail: () => void;
}

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    top: 46px;
    height: calc(100vh - 47px);
  }
`;

const DrawerContainer = styled(Container)`
  width: 460px;
  height: 100%;
  padding-left: 30px;
`;

export default function({ recipe, onCloseDetail }: IRecipeDetailsProps) {
  return (
    <StyledDrawer open={true} data-testid="select-column-panel" anchor="right">
      <DrawerContainer role="presentation" data-testid="select-column-drawer">
        <DrawerHeader onCloseDetail={onCloseDetail} />
        <RecipeDetailContainer recipe={recipe} />
      </DrawerContainer>
    </StyledDrawer>
  );
}
