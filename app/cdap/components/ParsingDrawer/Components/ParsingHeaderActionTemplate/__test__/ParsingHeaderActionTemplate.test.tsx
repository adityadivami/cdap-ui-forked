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

import React from 'react';
import { Switch, Router, Route } from 'react-router';
import { createBrowserHistory as createHistory } from 'history';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ParsingHeaderActionTemplate from '..';

const history = createHistory({
  basename: '/',
});

describe('It Should Test the ParsingHeaderActionTemplate Component', () => {
  it('Should test whether ParsingHeaderActionTemplate Component is rendered or not', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingHeaderActionTemplate
              handleSchemaUpload={() => jest.fn()}
              setErrorOnTransformation={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });

  it('Should test whether ParsingHeaderActionTemplate Component is rendered or not', async () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingHeaderActionTemplate
              handleSchemaUpload={() => jest.fn()}
              setErrorOnTransformation={() => jest.fn()}
            />
          </Route>
        </Switch>
      </Router>
    );

    const fileContents = 'file contents';
    const file = new Blob([fileContents], { type: 'text/plain' });
    const ele = screen.getByTestId(/parsing-header-action-template-input/i);

    await waitFor(() =>
      fireEvent.change(ele, {
        target: { files: [file] },
      })
    );
  });
});
