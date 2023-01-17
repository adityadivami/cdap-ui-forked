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

import { action } from '@storybook/addon-actions';
import InlayDrawerWidget, { IMenuItem } from 'components/InlayDrawerWidget';
import RecipeStepsTable, {
  IRecipeStepsColumns,
  IRecipeStepsRows,
} from 'components/WranglerV2/RecipeStepsTable';
import React from 'react';

export default {
  title: 'InlayDrawerWidget',
  component: InlayDrawerWidget,
};

const open = true;

const handleDrawerCloseIconClick = () => action('clicked')('Drawer Closed');
const onSaveButtonClick = () => action('clicked')('Save Button Clicked');
const onApplyButtonClick = () => action('clicked')('Apply Button Clicked');
const onDownloadButtonClick = () => action('clicked')('Download Button Clicked');

const actionsOptions: IMenuItem[] = [
  {
    label: 'Save',
    value: 'save',
    clickHandler: onSaveButtonClick,
  },
  {
    label: 'Apply',
    value: 'apply',
    clickHandler: onApplyButtonClick,
  },
  {
    label: 'Download',
    value: 'download',
    clickHandler: onDownloadButtonClick,
  },
];

export function Default(args) {
  if (args.open) {
    return <InlayDrawerWidget {...args} />;
  }
  return <></>;
}

Default.args = {
  actionsOptions,
  headingText: 'Header Text',
  onClose: handleDrawerCloseIconClick,
  open,
  position: 'left',
  showDivider: true,
  disableActionsButton: true,
};

// Recipe Steps Panel with Recipe Steps Table
const handleDeleteIconClick = (row: IRecipeStepsRows) =>
  action('clicked')(`Delete Icon Button Clicked with id = ${row.id}`);

const dataGridColumns: IRecipeStepsColumns[] = [
  {
    field: 'srn',
    headerName: '#',
    sortable: false,
    width: 71,
  },
  {
    field: 'step',
    headerName: 'Recipe Steps',
    sortable: false,
    width: 396,
  },
];

const dataGridRows: IRecipeStepsRows[] = [
  {
    id: 1,
    step: "Parse Column 'Body' with delimiter 'comma' and set 'first row as header' ",
    srn: '01',
  },
  { id: 2, step: "Delete Column 'body'", srn: '02' },
];

export function RecipeStepsPanel(args) {
  const { columns, rows, onDeleteIconClick, ...rest } = args;

  if (args.open) {
    return (
      <InlayDrawerWidget {...rest}>
        <RecipeStepsTable columns={columns} rows={rows} handleDeleteIconClick={onDeleteIconClick} />
      </InlayDrawerWidget>
    );
  }
  return <></>;
}

RecipeStepsPanel.args = {
  actionsOptions: [],
  columns: dataGridColumns,
  headingText: 'Recipe Steps',
  open,
  onClose: handleDrawerCloseIconClick,
  onDeleteIconClick: handleDeleteIconClick,
  position: 'right',
  rows: dataGridRows,
};
