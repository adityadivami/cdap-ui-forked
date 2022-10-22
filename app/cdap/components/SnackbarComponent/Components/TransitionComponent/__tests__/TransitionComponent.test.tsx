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
import { fireEvent, render, screen } from '@testing-library/react';
import TransitionComponent from '../index';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory({
  basename: '/',
});

describe('Test Transition Component', () => {
  const handleClose = jest.fn();

  it('Should have rendered the component correctly', () => {
    const handleClose = jest.fn();
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <TransitionComponent close={handleClose} />
          </Route>
        </Switch>
      </Router>
    );
    expect(container.getByTestId(/transition-component-parent/i)).toBeInTheDocument();
  });

  it('Should trigger onClick ', () => {
    const handleClose = jest.fn();
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <TransitionComponent close={handleClose} />
          </Route>
        </Switch>
      </Router>
    );

    const closeBtn = container.getByTestId(/snackbar-close-button/i);
    fireEvent.click(closeBtn);
    expect(closeBtn).toBeInTheDocument();
  });
});
