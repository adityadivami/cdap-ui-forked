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

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { createBrowserHistory as createHistory } from 'history';
import { Route, Router, Switch } from 'react-router';
import * as ApiHelpers from 'components/Connections/Browser/GenericBrowser/apiHelpers';

import ParsingDrawer from '..';
import { async } from 'q';

const history = createHistory({
  basename: '/',
});

describe('It Should Test the Parsing Drawer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render the Parsing Drawer Parent Component', () => {
    jest.spyOn(ApiHelpers, 'createWorkspace').mockReturnValue(
      Promise.resolve({
        entity: {
          name: 'sql_feature',
          path: '/information_schema/sql_features',
          type: 'system table',
          canSample: true,
          canBrowse: false,
          properties: {},
        },
        connection: 'exl',
        properties: {},
      })
    );
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingDrawer setLoading={() => jest.fn()} updateDataTranformation={() => jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );

    expect(container).toBeDefined();
  });

  it('Should test the handleApply Button ', () => {
    const screen = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ParsingDrawer setLoading={() => jest.fn()} updateDataTranformation={() => jest.fn()} />
          </Route>
        </Switch>
      </Router>
    );
    const handleApplyBtn = screen.getByTestId('parsing-apply-button');
    fireEvent.click(handleApplyBtn);
    expect(handleApplyBtn).toBeInTheDocument();
  });
  // it('Should test the handleFormatChange Button ', () => {
  //   jest.spyOn(ApiHelpers, 'createWorkspace').mockReturnValue(
  //     Promise.resolve({
  //       entity: {
  //         name: 'sql_feature',
  //         path: '/information_schema/sql_features',
  //         type: 'system table',
  //         canSample: true,
  //         canBrowse: false,
  //         properties: {},
  //       },
  //       connection: 'exl',
  //       properties: {},
  //     })
  //   );
  //   render(
  //     <Router history={history}>
  //       <Switch>
  //         <Route>
  //           <ParsingDrawer setLoading={() => jest.fn()} updateDataTranformation={() => jest.fn()} />
  //         </Route>
  //       </Switch>
  //     </Router>
  //   );
  //   // const menu = getAllByRole('button');
  //   // fireEvent.mouseDown(menu[0]);
  //   // const option2 = getAllByTestId('input-select-1')[0];
  //   // fireEvent.click(option2);

  //   // fireEvent.mouseDown(menu[1]);
  //   // const option3 = getAllByTestId('input-select-1')[1];
  //   // fireEvent.click(option3);

  //   // const returnedPromises = Promise.resolve({});

  //   // const checkbox1 = getByTestId('parsing-checkbox-Enable quoted values');
  //   // fireEvent.click(checkbox1);

  //   // const checkbox2 = getByTestId('parsing-checkbox-Use first row as header');
  //   // fireEvent.click(checkbox2);
  // });
});
