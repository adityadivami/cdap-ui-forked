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
import { render, screen } from '@testing-library/react';
import WrangleCard from '../index';
import * as reducers from 'components/Connections/Create/reducer';
import * as apiHelpers from 'components/Connections/Browser/SidePanel/apiHelpers';
import { Route, Router, Switch } from 'react-router';
import * as widgetData from '../services/getWidgetData';
import history from 'services/history';
import { fileMock, postgresMock, fetchConnectorMock } from '../mock/WrangleCardMock';

test('It renders Wrangler-Card ', async () => {
  jest.mock('components/Connections/Create/reducer', () => {
    return Promise.resolve([
      {
        artifact: { name: 'words', scope: '', version: 'ten' },
        category: 'hello',
        classname: 'yolo',
        description: 'hello',
        name: 'HeMan',
        type: 'js',
      },
      {
        artifact: { name: 'words', scope: '', version: 'ten' },
        category: 'hello',
        classname: 'yolo',
        description: 'hello',
        name: 'BatMan',
        type: 'js',
      },
      {
        artifact: { name: 'words', scope: '', version: 'ten' },
        category: 'hello',
        classname: 'yolo',
        description: 'hello',
        name: 'SuperMan',
        type: 'js',
      },
    ]);
  });
  jest.spyOn(reducers, 'fetchConnectors').mockReturnValue(Promise.resolve(fetchConnectorMock));

  jest.spyOn(widgetData, 'getWidgetData').mockReturnValue(Promise.resolve());

  const dummyRes = new Map();
  dummyRes.set('PostgreSql', postgresMock);
  dummyRes.set('File', fileMock);

  jest.spyOn(apiHelpers, 'getCategorizedConnections').mockReturnValue(Promise.resolve(dummyRes));

  render(
    <Router history={history}>
      <Switch>
        <Route>
          <WrangleCard />
        </Route>
      </Switch>
    </Router>
  );

  const ele = screen.getByTestId(/wrangle-card-parent/i);

  // await screen.getByTestId('wrangle-card-parent0');
  expect(ele).toBeInTheDocument();
});
