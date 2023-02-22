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

import { IconButton, TableContainer, Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styled, { StyledComponent } from 'styled-components';
import { useSelector } from 'react-redux';

import DataTable, { DataTableContainer, IColumn, IRow } from 'components/WranglerV2/DataTable';
import { execute } from 'components/DataPrep/store/DataPrepActionCreator';

interface IRecipeStepsColumnCellProps {
  BodyCell: () => JSX.Element;
  prefix: string;
  handleClick: () => void;
}

interface IRecipeStepsTableProps {
  recipeSteps: string[];
  Container: StyledComponent<typeof TableContainer, {}>;
}

export const RecipeStepCellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RecipeStepsTableContainer: StyledComponent<typeof TableContainer, {}> = styled(
  DataTableContainer
)`
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

      .MuiSvgIcon-root {
        color: ${grey[600]};
        transform: scale(1.325);
      }
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

export const getTableBodyCell = ({ value }: { value: string }) => () => (
  <Typography component="span" variant="body2">
    {value}
  </Typography>
);

export const getTableHeaderCell = (label: string) => () => (
  <Typography component="span" variant="body1">
    {label}
  </Typography>
);

const RecipeStepsColumnCell = ({ BodyCell, prefix, handleClick }: IRecipeStepsColumnCellProps) => (
  <RecipeStepCellWrapper>
    <div className="cell-content-div">
      <Typography component="span" variant="body1">
        {prefix}
      </Typography>
      &nbsp;
      <BodyCell />
    </div>
    <IconButton onClick={handleClick}>
      <DeleteOutlineIcon fontSize="medium" />
    </IconButton>
  </RecipeStepCellWrapper>
);

const deleteDirective = (state, index) => {
  const directives = state.directives;

  const newDirectives = directives.slice(0, index);

  execute(newDirectives, true).subscribe(
    () => {},
    (err) => {
      // Should not ever come to this.. this is only if backend
      // fails somehow
      console.log('Error deleting directives', err);
    }
  );
};

export default function RecipeStepsTable({ recipeSteps, Container }: IRecipeStepsTableProps) {
  const dataprep = useSelector((state) => state.dataprep);
  const { directives } = dataprep;

  const rows: IRow[] = recipeSteps.map((recipeStep: string, index: number) => ({
    serialNumber: String(index + 1).padStart(2, '0'),
    recipeStep,
  }));

  const handleDeleteIconClick = (row: IRow) => {
    const matchingIndex = directives.findIndex((directive) => row.recipeStep === directive);
    deleteDirective(dataprep, matchingIndex);
  };

  const getRecipeStepCell = ({ value, row }: { value: string; row: IRow }) => () => {
    const prefix = value.split(' ')[0];
    const suffix = value.substr(prefix.length);
    const BodyCell = getTableBodyCell({ value: suffix });

    return (
      <RecipeStepsColumnCell
        BodyCell={BodyCell}
        prefix={prefix}
        handleClick={() => handleDeleteIconClick(row)}
      />
    );
  };

  const columns: IColumn[] = [
    {
      name: 'serialNumber',
      value: '#',
      getCellRenderer: getTableBodyCell,
    },
    {
      name: 'recipeStep',
      value: 'Recipe steps',
      getCellRenderer: getRecipeStepCell,
    },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      Container={Container}
      getTableHeaderCell={getTableHeaderCell}
    />
  );
}
