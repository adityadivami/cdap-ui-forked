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

import { render } from '@testing-library/react';
import * as apiHelpers from 'components/Connections/Browser/SidePanel/apiHelpers';
import * as reducer from 'components/Connections/Create/reducer';
import { createBrowserHistory as createHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import ConnectionList from '..';
import {
  connectionListDummyResPostGresSql,
  mockResponseForFetchConnectors,
} from '../mock/mockDataForConnectionList';
import * as apiHelpersForExploreConnection from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';

const history = createHistory({
  basename: '/',
});

describe('It Should test Connection List Component', () => {
  it('Should render Connection List Component', () => {
    const container = render(
      <Router history={history}>
        <Switch>
          <Route>
            <ConnectionList />
          </Route>
        </Switch>
      </Router>
    );
    expect(container).toBeDefined();
  });

  const dummyRes = new Map();
  dummyRes.set('PostgreSql', connectionListDummyResPostGresSql);
  // dummyRes.set('File', connectionListDummyResFile);
  jest.spyOn(apiHelpers, 'getCategorizedConnections').mockReturnValue(Promise.resolve(dummyRes));

  jest
    .spyOn(reducer, 'fetchConnectors')
    .mockReturnValue(Promise.resolve(mockResponseForFetchConnectors));

  const mockDataForExploreConnection = {
    totalCount: 3,
    sampleProperties: [],
    entities: [
      {
        name: 'information_schema',
        path: '/information_schema',
        type: 'schema',
        canSample: false,
        canBrowse: true,
        properties: {},
      },
      {
        name: 'pg_catalog',
        path: '/pg_catalog',
        type: 'schema',
        canSample: false,
        canBrowse: true,
        properties: {},
      },
      {
        name: 'public',
        path: '/public',
        type: 'schema',
        canSample: false,
        canBrowse: true,
        properties: {},
      },
    ],
    propertyHeaders: [],
  };

  jest.spyOn(apiHelpersForExploreConnection, 'exploreConnection').mockImplementation(() => {
    return Promise.resolve(mockDataForExploreConnection);
  });
});
