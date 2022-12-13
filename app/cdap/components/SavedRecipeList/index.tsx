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

import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import T from 'i18n-react';
import MyDataPrepApi from 'api/dataprep';
import { getCurrentNamespace } from 'services/NamespaceStore';
import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { dateFormatting } from 'components/SavedRecipeList/utils';
import { grey } from '@material-ui/core/colors';

const Wrapper = styled(Box)`
`;

const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 25% 15% 40% 20%;
  align-items: center;
  padding: 20px 10px;
`;

const GridHeadWrapper = styled(GridWrapper)`
  padding: 10px;
`;

const HeadDivider = styled(Box)`
width: 100%;
opacity: 0.6;
border-bottom: 1px solid ${grey[700]};
`;

const CellDivider = styled(Box)`
width: 100%;
border-bottom: 1px solid ${grey[300]};
`;

const GridHead = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

const GridCellText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

const PREFIX = 'features.WranglerNewUI.SavedRecipeList';

export default function ({ setLoading }) {
  const { dataprep } = DataPrepStore.getState();
  const { recipeList } = dataprep;

  useEffect(() => {
    const params = {
      context: getCurrentNamespace(),
    };
    getRecipeList(params)
  }, []);

  const getRecipeList = (params) => {
    setLoading(true)
    MyDataPrepApi.getRecipeList(params).subscribe((res) => {
      DataPrepStore.dispatch({
        type: DataPrepActions.setRecipeList,
        payload: res.values,
      });
      setLoading(false)
    });
  }

  return (
    <Wrapper data-testid="saved-recipe-list-wrapper">
      <GridHeadWrapper>
        <GridHead component="body1" data-testid="recipe-name-head">{T.translate(`${PREFIX}.recipeName`)}</GridHead>
        <GridHead component="body1" data-testid="recipe-steps-head">{T.translate(`${PREFIX}.steps`)}</GridHead>
        <GridHead component="body1" data-testid="recipe-description-head">{T.translate(`${PREFIX}.description`)}</GridHead>
        <GridHead component="body1" data-testid="recipe-last-updated-head">{T.translate(`${PREFIX}.lastUpdated`)}</GridHead>
      </GridHeadWrapper>
      <HeadDivider/>
      {recipeList.reverse().slice(0, 2).map((recipeItem, recipeIndex) => (<>
        <GridWrapper key={recipeItem.recipeId}>
          <GridCellText component="body1" data-testid={`recipe-name-${recipeIndex}`}>{recipeItem.recipeName}</GridCellText>
          <GridCellText component="body1" data-testid={`recipe-count-${recipeIndex}`}>{recipeItem.recipeStepsCount}</GridCellText>
          <GridCellText component="body1" data-testid={`recipe-description-${recipeIndex}`}>{recipeItem.description}</GridCellText>
          <GridCellText component="body1" data-testid={`recipe-date-${recipeIndex}`}>{dateFormatting(recipeItem.updatedTimeMillis)}</GridCellText>
        </GridWrapper>
        {(recipeIndex !== recipeItem.length - 1) && <CellDivider/>}
        </>
      ))}
    </Wrapper>
  );
}
