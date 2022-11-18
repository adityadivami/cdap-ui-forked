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
import GridTable from '..';
import { render } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import history from 'services/history';
import MyDataPrepApi from 'api/dataprep';
import rxjs from 'rxjs/operators';
import { mockForFlatMap, mockForGetWorkspace } from '../mock/mockDataForGrid';

describe('Testing Grid Table Component', () => {
  jest.spyOn(rxjs, 'flatMap' as any).mockImplementation((callback: any) => {
    callback(mockForFlatMap);
  });

  it('Should check if the component is rendered', () => {
    jest.spyOn(MyDataPrepApi, 'getWorkspace').mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (callback) => {
              callback(mockForGetWorkspace);
            },
          };
        },
      };
    });

    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <GridTable />
          </Route>
        </Switch>
      </Router>
    );
    expect(render).toBeDefined();
    const gridTable = screen.getByTestId('grid-table');
    expect(screen.getByTestId('grid-table')).toBeInTheDocument();
  });

  it('Should check if the component is rendered and mock MyDataPrepApi', () => {
    jest.spyOn(MyDataPrepApi, 'getWorkspace').mockImplementation(() => {
      return {
        pipe: () => {
          return {
            subscribe: (callback) => {
              callback([]);
            },
          };
        },
      };
    });
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <GridTable />
          </Route>
        </Switch>
      </Router>
    );
    expect(render).toBeDefined();
    const gridTable = screen.getByTestId('grid-table');
    expect(screen.getByTestId('grid-table')).toBeInTheDocument();
  });
});
