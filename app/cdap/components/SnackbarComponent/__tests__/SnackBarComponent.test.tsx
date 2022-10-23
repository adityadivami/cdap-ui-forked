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

import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';
import PositionedSnackbar from '..';
import TransitionComponent from '../Components/TransitionComponent';

const history = createHistory({
  basename: '/',
});

describe('It should test the Snackbar Component', () => {
  it('renders Snackbar Component', () => {
    const handleCloseError = jest.fn();
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <PositionedSnackbar handleCloseError={handleCloseError} />
          </Route>
        </Switch>
      </Router>
    );
    const ele = container.getByTestId(/parent-snackbar-component/i);
    const button = screen.getByTestId(/snackbar-close-button/i);
    fireEvent.click(button);
    expect(ele).toBeDefined();
  });
});
