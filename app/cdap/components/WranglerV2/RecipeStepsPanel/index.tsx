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

import InlayDrawerWidget from 'components/InlayDrawerWidget';
import RecipeStepsTable, {
  IRecipeStepsColumns,
  IRecipeStepsRows,
} from 'components/WranglerV2/RecipeStepsTable/index';
import React from 'react';

const recipeStepsTableRows: IRecipeStepsColumns[] = [
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
    width: 387,
  },
];

const getDoubleDigitString = (value: number) =>
  value.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

const getRecipeStepsRows = (directives: string[]) =>
  directives.map((eachDirective, directiveIndex) => ({
    id: directiveIndex + 1,
    srn: getDoubleDigitString(directiveIndex + 1),
    step: eachDirective,
  }));

export default function RecipeStepsPanel({ onRecipeStepsPanelClose, directives }) {
  const handleDeleteIconClick = (row: IRecipeStepsRows) =>
    console.log('clicked on delete icon', row);

  return (
    <InlayDrawerWidget
      actionsOptions={[]}
      headingText="Recipe Steps"
      onClose={onRecipeStepsPanelClose}
      position="right"
    >
      <RecipeStepsTable
        columns={recipeStepsTableRows}
        rows={getRecipeStepsRows(directives)}
        handleDeleteIconClick={handleDeleteIconClick}
      />
    </InlayDrawerWidget>
  );
}
