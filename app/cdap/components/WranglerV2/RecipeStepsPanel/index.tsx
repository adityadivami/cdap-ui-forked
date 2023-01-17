import InlayDrawerWidget from 'components/InlayDrawerWidget';
import React, { useEffect } from 'react';
import RecipeStepsTable, {
  IRecipeStepsColumns,
  IRecipeStepsRows,
} from 'components/WranglerV2/RecipeStepsTable/index';

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
