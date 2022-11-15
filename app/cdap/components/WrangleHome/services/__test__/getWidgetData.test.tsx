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

import { getUpdatedConnectorCards } from 'components/WrangleHome/services/getUpdatedConnectorCards';
import * as reducers from 'components/Connections/Create/reducer';
import * as utils from 'components/Connections/Create/reducer';
import {
  fetchConnectorMock,
  fileMock2,
  googleCloudMock,
  dataBaseMock,
  awsMock,
  msgSystemsMock,
} from '../mock/mockData';

describe('Test function getWidgetData', () => {
  it('invokes getWidgetData function with data from API`s data', () => {
    jest.spyOn(reducers, 'fetchConnectors').mockReturnValue(Promise.resolve(fetchConnectorMock));
    const dummyReturnMap = new Map();
    dummyReturnMap.set('Messaging Systems', msgSystemsMock);
    dummyReturnMap.set('Amazon Web Services', awsMock);
    dummyReturnMap.set('Database', dataBaseMock);
    dummyReturnMap.set('Google Cloud Platform', googleCloudMock);
    dummyReturnMap.set('File', fileMock2);

    jest.spyOn(utils, 'getCategoriesToConnectorsMap').mockReturnValue(dummyReturnMap);

    getUpdatedConnectorCards([]);
    expect(getUpdatedConnectorCards).toBeDefined();
  });
});
