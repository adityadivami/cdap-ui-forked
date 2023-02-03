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
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import DataTable, { DataTableContainer } from '.';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DataTable',
  component: DataTable,
} as ComponentMeta<typeof DataTable>;

interface IColumns {
  name: string;
  headerText?: JSX.Element;
}

const getTableBodyCellLabel = (label: string) => (
  <Typography component="span" variant="body2">
    {label}
  </Typography>
);

const getTableHeadCellLabel = (label: string) => (
  <Typography component="span" variant="body1">
    {label}
  </Typography>
);

const handleDeleteIconClick = () => action('clicked')('Delete Icon Clicked');

const getRecipeStepCellRenderer = (transformationName: string, directive: string) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="cell-content-div">
        <Typography component="span" variant="body1">
          {transformationName}
        </Typography>
        &nbsp;
        {getTableBodyCellLabel(directive)}
      </div>
      <div>
        <IconButton onClick={handleDeleteIconClick}>
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

const columns: IColumns[] = [
  {
    name: 'serialNumber',
    headerText: getTableHeadCellLabel('#'),
  },
  {
    name: 'recipeStep',
    headerText: getTableHeadCellLabel('Recipe Steps'),
  },
];

const rows = [
  {
    serialNumber: getTableBodyCellLabel('01'),
    recipeStep: getRecipeStepCellRenderer(
      'Parse Column',
      "'body_01' with delimiter 'comma' and set 'first row as header'"
    ),
  },
  {
    serialNumber: getTableBodyCellLabel('02'),
    recipeStep: getRecipeStepCellRenderer('Delete Column', "'body_01'"),
  },
];

const RecipeStepsTableContainer = styled(DataTableContainer)`
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

const mockRecipe = [
  'a-column',
  'b-column',
  'c-column',
  'd-column',
  'e-column',
  'f-column',
  'g-column',
  'h-column',
  'i-column',
  'j-column',
  'j-column',
];

const Template: ComponentStory<typeof DataTable> = (args) => <DataTable {...args} />;

export const RecipeStepsPanel = Template.bind({});

RecipeStepsPanel.args = {
  rows,
  columns,
  TableContainer: RecipeStepsTableContainer,
};
