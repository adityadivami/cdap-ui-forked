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

import { GCSIcon } from 'components/ConnectionList/IconStore/CGSIcon';
import React from 'react';

export const mockTabsTestData = {
  data: [
    {
      name: 'File',
      type: 'connector',
      category: 'File',
      description: 'Connection to browse and sample data from the local file system.',
      className: 'io.cdap.plugin.batch.connector.FileConnector',
      artifact: {
        name: 'core-plugins',
        version: '2.10.0-SNAPSHOT',
        scope: 'SYSTEM',
      },
      count: 1,
      icon: <GCSIcon />,
    },
    {
      name: 'PostgreSQL',
      type: 'connector',
      category: 'Database',
      description: 'Connection to access data in PostgreSQL databases using JDBC.',
      className: 'io.cdap.plugin.postgres.PostgresConnector',
      artifact: {
        name: 'postgresql-plugin',
        version: '1.9.0-SNAPSHOT',
        scope: 'SYSTEM',
      },
      count: 1,
      icon: <GCSIcon />,
    },
  ],
  showTabs: true,
  selectedTab: 'S3',
  isSearching: false,
};
