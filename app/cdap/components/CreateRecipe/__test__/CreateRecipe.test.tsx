// /*
//  *  Copyright © 2022 Cask Data, Inc.
//  *
//  *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
//  *  use this file except in compliance with the License. You may obtain a copy of
//  *  the License at
//  *
//  *  http://www.apache.org/licenses/LICENSE-2.0
//  *
//  *  Unless required by applicable law or agreed to in writing, software
//  *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
//  *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
//  *  License for the specific language governing permissions and limitations under
//  *  the License.
//  */

// import { fireEvent, render, screen } from '@testing-library/react';
// import DrawerWidget from 'components/common/DrawerWidget';
// import React from 'react';
// import { Route, Router, Switch } from 'react-router';
// import history from 'services/history';
// import RecipeForm from 'components/RecipeManagement/RecipeForm';
// import { IRecipeFormData } from 'components/RecipeManagement/types';
// import T from 'i18n-react';
// import CreateRecipe from 'components/CreateRecipe';
// import { ISnackbar } from 'components/Snackbar';
// import { getRecipeByName } from 'components/CreateRecipe/services';
// import MyDataPrepApi from 'api/dataprep';
// import { debounce } from 'lodash';
// import { subscribe } from 'graphql';


// const mockAPIResponse = {
//   recipeId: {
//     namespace: { name: 'default', generation: 0 },
//     recipeId: '362c5985-3388-4143-aeca-6ce29a5d3fdd',
//   },
//   recipeName: 'recipe',
//   description: 'desrtfg',
//   directives: ['uppercase: body1', 'titlecase: body2'],
//   createdTimeMillis: 1671693000105,
//   updatedTimeMillis: 1671693000105,
//   recipeStepsCount: 2,
// };

// describe('Test Create Recipe Component', () => {
//   // jest.mock('lodash/debounce');
//   jest.spyOn(MyDataPrepApi, 'getRecipeByName').mockReturnValue(() => {
//     return { subscribe: () => { return {"Helu":"he"}} }
//   })
//   // debounce.mockImplementation()
//   const mockOnRecipeNameChangeRecipe = jest.fn();
//   const mockOnFormSubmit = jest.fn();
//   const mockOnCancel = jest.fn();


//   const mockAPIErrorResponse = {
//     message: `recipe with name recipe does not exist`,
//   };
//   // const mock

//   beforeEach(() => {
//     render(<CreateRecipe setShowRecipeForm={jest.fn()} setSnackbar={jest.fn()} />);
//   });

//   it('should render Recipe Name Field and trigger the change event as expected', () => {
//     const RecipeNameElement = screen.getByTestId(/recipe-name-field/i);

//     // fireEvent.change(RecipeNameElement.firstChild.firstChild, { target: { value: 'recipe' } });
//     // expect(
//     //   RecipeNameElement.querySelector('#outlined-error-helper-text-helper-text') as HTMLElement
//     // ).toHaveTextContent(
//     //   T.translate('features.WranglerNewUI.RecipeForm.labels.sameNameErrorMessage').toString()
//     // );
//   });

//   it('should render Recipe Name Field and trigger the change event as expected', () => {
//     const RecipeNameElement = screen.getByTestId(/recipe-name-field/i);
//     fireEvent.change(RecipeNameElement.firstChild.firstChild, { target: { value: 'test-' } });
//     // expect(
//     //   RecipeNameElement.querySelector('#outlined-error-helper-text-helper-text') as HTMLElement
//     // ).toHaveTextContent(
//     //   T.translate('features.WranglerNewUI.RecipeForm.labels.validationErrorMessage').toString()
//     // );
//   });

//   //   it('should trigger onSave event in recipe', () => {
//   //     const saveButtonElement = screen.getByTestId(/recipe-save-button/i);
//   //     fireEvent.click(saveButtonElement);
//   //     expect(mockOnFormSubmit).toBeCalled();
//   //   });
// });
