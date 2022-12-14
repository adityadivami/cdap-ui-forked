/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import T from 'i18n-react';
import CommonRecipeForm from 'components/CreateEditRecipeForm/index';

describe('Test Common Recipe Component', () => {
  const mockIsNameErrorFunction = jest.fn();
  const mockCancel = jest.fn();

  beforeEach(() => {
    render(
      <CommonRecipeForm
        recipeData={{ recipeName: 'Abhilash', description: 'Batman', directives: [] }}
        onRecipeDataSave={jest.fn()}
        onCancel={mockCancel}
        isNameError={false}
        setIsNameError={mockIsNameErrorFunction}
      />
    );
  });

  it('should render component', () => {
    const parentElement = screen.getByTestId(/recipe-form-parent/i);
    expect(parentElement).toBeInTheDocument();
  });

  it('should render Recipe Name Label', () => {
    const RecipeNameLabelElement = screen.getByTestId(/recipe-name-label/i);
    expect(RecipeNameLabelElement).toBeInTheDocument();
    expect(RecipeNameLabelElement).toHaveTextContent(
      `${T.translate('features.WranglerNewUI.RecipeForm.labels.name')}`
    );
  });

  it('should render Recipe Description Label', () => {
    const RecipeDescriptionLabelElement = screen.getByTestId(/recipe-description-label/i);
    expect(RecipeDescriptionLabelElement).toBeInTheDocument();
    expect(RecipeDescriptionLabelElement).toHaveTextContent(
      `${T.translate('features.WranglerNewUI.RecipeForm.labels.description')}`
    );
  });

  it('should render Recipe Name Field and trigger the change event as expected', () => {
    const RecipeNameElement = screen.getByTestId(/recipe-name-field/i);
    fireEvent.change(RecipeNameElement.firstChild.firstChild, { target: { value: 'test' } });
    expect(RecipeNameElement).toBeInTheDocument();
  });

  it('should render Recipe Description Field', () => {
    const RecipeDescriptionElement = screen.getByTestId(/recipe-description-field/i);
    fireEvent.change(RecipeDescriptionElement, { target: { value: 'test' } });
    expect(RecipeDescriptionElement).toHaveValue('test');
  });

  it('should trigger onCancel event in recipe', () => {
    const cancelButtonElement = screen.getByTestId(/common-recipe-cancel-button/i);
    fireEvent.click(cancelButtonElement);
    expect(mockCancel).toBeCalled();
  });

  it('should trigger onSave event in common recipe', () => {
    const saveButtonElement = screen.getByTestId(/common-recipe-save-button/i);
    fireEvent.click(saveButtonElement);
    expect(saveButtonElement).toBeInTheDocument();
  });

  it('should render Recipe component with isNameError as true', () => {
    render(
      <CommonRecipeForm
        recipeData={{ recipeName: 'Abhilash', description: 'Batman', directives: [] }}
        onRecipeDataSave={jest.fn()}
        onCancel={jest.fn()}
        isNameError={true}
        setIsNameError={mockIsNameErrorFunction}
      />
    );
    const parentElement = screen.getAllByTestId(/recipe-form-parent/i);
    expect(parentElement[0]).toBeInTheDocument();
  });
});

