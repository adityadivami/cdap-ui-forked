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
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import SelectColumnsList from '..';

const history = createHistory({
  basename: '/',
});

describe('It should test the SelectColumnsList Component', () => {
  it('should render the SelectColumnsList Component with selectedColumnsCount<10', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <SelectColumnsList
              selectedColumnsCount={20}
              columnData={[
                { label: 'hello', type: 'a' },
                { label: 'world', type: 'a' },
              ]}
              setSelectedColumns={() => jest.fn()}
              dataQuality={[
                { label: 'hello', value: 5 },
                { label: 'world', value: 1 },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined;
  });
  it('should render the SelectColumnsList Component with selectedColumnsCount<10', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <SelectColumnsList
              selectedColumnsCount={2}
              columnData={[
                { label: 'hello', type: 'a' },
                { label: 'world', type: 'a' },
              ]}
              setSelectedColumns={() => jest.fn()}
              dataQuality={[
                { label: 'hello', value: 5 },
                { label: 'world', value: 5 },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined;
  });
  it('should render the SelectColumnsList Component with selectedColumnsCount is 0', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <SelectColumnsList
              selectedColumnsCount={0}
              columnData={[
                { label: 'hello', type: 'a' },
                { label: 'world', type: 'a' },
              ]}
              setSelectedColumns={() => jest.fn()}
              dataQuality={[
                { label: 'hello', value: 5 },
                { label: 'world', value: 5 },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined;
  });

  it('should render the SelectColumnsList Component with some input value along with label and null', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <SelectColumnsList
              selectedColumnsCount={10}
              columnData={[
                { label: 'hello', type: 'a' },
                { label: 'world', type: 'a' },
              ]}
              setSelectedColumns={() => jest.fn()}
              dataQuality={[
                { label: 'hello', value: 5 },
                { label: 'world', value: 5 },
              ]}
            />
          </Route>
        </Switch>
      </Router>
    );

    const inputEle = screen.getByTestId(/select-column-list-input/i);
    fireEvent.change(inputEle, { target: { value: '123' } });
    fireEvent.change(inputEle, { target: { value: 'hello' } });
    fireEvent.change(inputEle, { target: { value: null } });

    const radio = screen.getAllByTestId(/select-column-list-radio/i);
    fireEvent.click(radio[0]);

    const ele = screen.getByTestId(/select-column-list-box/i);
    fireEvent.click(ele);
    expect(container).toBeDefined;
  });
});
