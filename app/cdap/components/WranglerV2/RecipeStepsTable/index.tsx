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

import React, { useEffect, useState } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styled from 'styled-components';

import DataTable, { DataTableContainer } from 'components/WranglerV2/DataTable';

export const RecipeStepCellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RecipeStepsTableContainer = styled(DataTableContainer)`
  &&& {
    width: 460px;
  }
  .MuiTableCell-root:first-child {
    width: 64px;
  }
  .MuiTableCell-root:last-child {
    width: 396px;
  }
  .MuiTableCell-root:has(.MuiIconButton-root) {
    vertical-align: text-top;
  }
  .MuiTableBody-root {
    .MuiIconButton-root {
      display: none;
      padding: 0;
      margin-top: 4px;
      margin-right: 9px;
      align-self: flex-start;
    }
    .MuiTableRow-root:hover {
      .MuiIconButton-root {
        display: block;
      }

      &:has(.MuiIconButton-root) {
        .cell-content-div {
          width: 80%;
        }
      }
    }
  }
`;

export default function RecipeStepsTable({ recipeSteps }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const updatedSteps = recipeSteps.map((recipeStep: string, index: number) => ({
      serialNumber: String(index),
      recipeStep,
    }));

    setRows(updatedSteps);
  }, []);

  const getTableBodyCell = ({ value }) => () => (
    <Typography component="span" variant="body2">
      {value}
    </Typography>
  );

  const getTableHeaderCell = (label: string) => () => (
    <Typography component="span" variant="body1">
      {label}
    </Typography>
  );

  const handleDeleteIconClick = () => {
    // do nothing
  };

  const getRecipeStepCell = ({ value }) => () => {
    const prefix = value.split("'")[0];
    const suffix = value.substr(prefix.length);

    const BodyCell = getTableBodyCell({ value: suffix });
    return (
      <RecipeStepCellWrapper>
        <div className="cell-content-div">
          <Typography component="span" variant="body1">
            {prefix}
          </Typography>
          &nbsp;
          <BodyCell />
        </div>
        <IconButton onClick={handleDeleteIconClick}>
          <DeleteOutlineIcon />
        </IconButton>
      </RecipeStepCellWrapper>
    );
  };

  const columns = [
    {
      name: 'serialNumber',
      value: '#',
      getCellRenderer: getTableBodyCell,
    },
    {
      name: 'recipeStep',
      value: 'Recipe Steps',
      getCellRenderer: getRecipeStepCell,
    },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      TableContainer={RecipeStepsTableContainer}
      getTableHeaderCell={getTableHeaderCell}
    />
  );
}
