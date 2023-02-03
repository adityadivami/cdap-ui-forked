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
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipeStepsTable, {
  IRecipeStepsColumns,
  IRecipeStepsRows,
} from 'components/WranglerV2/RecipeStepsTable';

export default {
  title: 'RecipeStepsTable',
  component: RecipeStepsTable,
} as ComponentMeta<typeof RecipeStepsTable>;

// Recipe Steps Panel with Recipe Steps Table
const handleDeleteIconClick = (row: IRecipeStepsRows) =>
  action('clicked')(`Delete Icon Button Clicked with id = ${row.id}`);

const dataGridColumns: IRecipeStepsColumns[] = [
  {
    field: 'serialNumber',
    headerName: '#',
    sortable: false,
    width: 71,
    showDeleteButton: false,
  },
  {
    field: 'step',
    headerName: 'Recipe Steps',
    sortable: false,
    width: 389,
    showDeleteButton: true,
  },
];

const dataGridRows: IRecipeStepsRows[] = [
  {
    id: 1,
    step: "Parse Column 'Body' with delimiter 'comma' and set 'first row as header'",
    serialNumber: '01',
  },
  { id: 2, step: "Delete Column 'body'", serialNumber: '02' },
];

const Template: ComponentStory<typeof RecipeStepsTable> = (args) => <RecipeStepsTable {...args} />;

export const RecipeStepsPanel = Template.bind({});

RecipeStepsPanel.args = {
  columns: dataGridColumns,
  onDeleteIconClick: handleDeleteIconClick,
  rows: dataGridRows,
};
