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
import CreateRecipe from 'components/CreateRecipe';

describe('Test Create Recipe Component', () => {
  beforeEach(() => {
    render(
      <CreateRecipe openDrawer={true} setRecipeFormOpen={jest.fn()} setSnackbar={jest.fn()} />
    );
  });

  it('should render the component', () => {
    const parentElement = screen.getByTestId(/edit-recipe-drawer-widget-parent/i);
    expect(parentElement).toBeInTheDocument();
  });

  it('should trigger close function on close button click', () => {
    const closeButtonElement = screen.getByTestId(/drawer-widget-close-round-icon/i);
    fireEvent.click(closeButtonElement);
    expect(closeButtonElement).toBeInTheDocument();
  });

  it('should trigger the cancel widget button function ', () => {
    const cancelButtonElement = screen.getByTestId(/recipe-cancel-button/i);
    fireEvent.click(cancelButtonElement);
    expect(cancelButtonElement).toBeInTheDocument();
  });
});

