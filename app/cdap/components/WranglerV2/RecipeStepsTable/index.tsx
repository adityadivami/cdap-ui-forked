/*
 * Copyright © 2023 Cask Data, Inc.
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

import { IconButton, Typography } from '@material-ui/core';
import { GridRowData } from '@material-ui/data-grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { StyledDataGrid, Wrapper } from 'components/WranglerV2/RecipeStepsTable/styles';
import React from 'react';

export interface IRecipeStepsColumns {
  field: string;
  headerName: string;
  width: number;
  sortable: boolean;
  renderCell?: (params: GridRowData) => JSX.Element;
}

export interface IRecipeStepsRows {
  id: number;
  srn: string;
  step: string;
}

interface RecipeStepsTableProps {
  columns: IRecipeStepsColumns[];
  rows: IRecipeStepsRows[];
  handleDeleteIconClick: (row: IRecipeStepsRows) => void;
}

export default function RecipeStepsTable({
  rows,
  columns,
  handleDeleteIconClick,
}: RecipeStepsTableProps) {
  const CustomRenderCell = (params: GridRowData) => (
    <Wrapper>
      <Typography component="div" variant="body1">
        {params.value}
      </Typography>
      <IconButton onClick={(event) => handleDeleteIconClick(params.row)}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Wrapper>
  );

  // 1 is the index of the cell in RecipeStepsTable that needs custom render component
  columns[1].renderCell = CustomRenderCell;

  return (
    <StyledDataGrid
      autoHeight
      columns={columns}
      disableColumnMenu
      headerHeight={48}
      hideFooter
      rows={rows}
    />
  );
}
