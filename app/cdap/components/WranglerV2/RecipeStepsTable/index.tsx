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
import grey from '@material-ui/core/colors/grey';
import { DataGrid, GridRowData } from '@material-ui/data-grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import React from 'react';
import styled from 'styled-components';

interface IRecipeStepsColumns {
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

export const dataGridColumns: IRecipeStepsColumns[] = [
  {
    field: 'srn',
    headerName: '#',
    width: 71,
    sortable: false,
  },
  {
    field: 'step',
    headerName: 'Recipe Steps',
    width: 396,
    sortable: false,
  },
];

export const dataGridRows: IRecipeStepsRows[] = [
  {
    id: 1,
    srn: '01',
    step: "Parse Column 'Body' with delimiter 'comma' and set 'first row as header' ",
  },
  { id: 2, srn: '02', step: "Delete Column 'body'" },
];

const StyledDataGrid = styled(DataGrid)`
  &&& {
    .MuiDataGrid-columnHeader {
      padding-left: 16px;
    }

    .MuiDataGrid-cell {
      padding-left: 10px;
      padding-right: 16px;
    }

    .MuiDataGrid-columnHeaderWrapper {
      justify-content: space-evenly;
      background-color: ${grey[100]};
    }

    .MuiDataGrid-columnSeparator {
      display: none;
    }

    .MuiDataGrid-row:hover {
      background-color: ${grey[300]};

      .MuiTypography-root {
        width: 328px;
      }
      .MuiButtonBase-root {
        display: block;
      }
    }

    .MuiTypography-body1 {
      white-space: break-spaces;
    }

    .MuiIconButton-root {
      padding: 0px;
      align-self: flex-start;
    }
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;

  .MuiButtonBase-root {
    display: none;
  }
`;

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
