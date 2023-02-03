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

import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { GridRowData } from '@material-ui/data-grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {
  GridContainer,
  StyledDataGrid,
  Wrapper,
} from 'components/WranglerV2/RecipeStepsTable/styles';

export interface IRecipeStepsColumns {
  field: string;
  headerName: string;
  width: number;
  sortable: boolean;
  renderCell?: (params: GridRowData) => JSX.Element;
  showDeleteButton: boolean;
}

export interface IRecipeStepsRows {
  id: number;
  serialNumber: string;
  step: string;
}

interface RecipeStepsTableProps {
  columns: IRecipeStepsColumns[];
  rows: IRecipeStepsRows[];
  onDeleteIconClick: (row: IRecipeStepsRows) => void;
}

export default function RecipeStepsTable({
  rows,
  columns,
  onDeleteIconClick,
}: RecipeStepsTableProps) {
  const CustomRenderCell = (params: GridRowData) => (
    <Wrapper>
      <Typography component="div" variant="body1">
        {params.value}
      </Typography>
      {params.colDef.showDeleteButton && (
        <IconButton onClick={(event) => onDeleteIconClick(params.row)}>
          <DeleteOutlinedIcon />
        </IconButton>
      )}
    </Wrapper>
  );

  columns.forEach((column) => (column.renderCell = CustomRenderCell));

  return (
    <GridContainer>
      <StyledDataGrid columns={columns} disableColumnMenu hideFooter rows={rows} />
    </GridContainer>
  );
}
