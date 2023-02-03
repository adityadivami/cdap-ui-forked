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
import DataTable from '.';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
        <IconButton>
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
  ,
  {
    serialNumber: getTableBodyCellLabel('02'),
    recipeStep: getRecipeStepCellRenderer('Delete Column', "'body_01'"),
  },
];

const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable rows={rows} columns={columns} />
);

export const RecipeStepsPanel = Template.bind({});

RecipeStepsPanel.args = {};
