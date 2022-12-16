/*
 * Copyright © 2022 Cask Data, Inc.
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

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import RecipeHeaderActionTemplate from 'components/RecipeSteps/RecipeHeaderActionTemplate/index';
import history from 'services/history';

describe('It should test the RecipeHeaderActionTemplate Component', () => {
  it('renders RecipeHeaderActionTemplate component and triggers handleDownload', () => {
    jest.mock('js-file-download', () => {
      return {
        __esModule: true,
        default: jest.fn(console.trace),
      };
    });
    global.URL.createObjectURL = jest.fn();

    render(
      <Router history={history}>
        <Switch>
          <Route>
            <RecipeHeaderActionTemplate nextStep={jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );
    const recipeHeaderActionParent = screen.getByTestId(/header-action-template-parent/i);
    expect(recipeHeaderActionParent).toBeInTheDocument();
    const downloadComponent = screen.getByTestId(/header-action-download-icon/i);
    fireEvent.click(downloadComponent);
    expect(downloadComponent).toBeInTheDocument();
  });

  it('renders RecipeHeaderActionTemplate component and triggers nextStep()', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route>
            <RecipeHeaderActionTemplate nextStep={jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );
    const headerActionImportIcon = screen.getByTestId(/header-action-import-icon/i);
    fireEvent.click(headerActionImportIcon);
  });
});
