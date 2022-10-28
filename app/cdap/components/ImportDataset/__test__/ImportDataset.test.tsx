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

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import DastaSet from 'components/ImportDataset/index';
import history from 'services/history';

describe('It should test DrawerWidget Component', () => {
  it('Should test whether DrawerWidget Component is rendered', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <DastaSet
              handleClosePanel={() => {
                jest.fn();
              }}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });
  it('Should drop a file and trigger onDropHandler', async () => {
    render(
      <DastaSet
        handleClosePanel={() => {
          jest.fn();
        }}
      />
    );
    window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url');
    const inputEl = screen.getByTestId('file-drop-zone');
    const file = new File(['file'], 'ping.json', {
      type: 'application/json',
    });
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);
    expect(await screen.findByText('ping.json')).toBeInTheDocument();
  });
});
