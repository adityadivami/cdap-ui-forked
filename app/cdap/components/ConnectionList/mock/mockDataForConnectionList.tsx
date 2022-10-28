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

export const connectionListDummyResPostGresSql = [
  {
    name: 'exl',
    connectionId: 'exl',
    connectionType: 'PostgreSQL',
    description: '',
    preConfigured: false,
    isDefault: false,
    createdTimeMillis: 1660107919860,
    updatedTimeMillis: 1660107919860,
    plugin: {
      category: 'Database',
      name: 'PostgreSQL',
      type: 'connector',
      properties: {
        host: 'jenkins',
        port: '5432',
        jdbcPluginName: 'postgresql',
        database: 'exlas',
        user: 'posts',
        password: 'dva',
        connectionArguments: '1=1',
      },
      artifact: {
        scope: 'SYSTEM',
        name: 'postgresql-plugin',
        version: '1.9.0-SNAPSHOT',
      },
    },
  },
];

export const connectionListDummyResFile = [
  {
    name: 'mkdedm',
    connectionId: 'mdeedkm',
    connectionType: 'File',
    description: 'medekk',
    preConfigured: false,
    isDefault: false,
    createdTimeMillis: 1660125276816,
    updatedTimeMillis: 1660125276816,
    plugin: {
      category: 'File',
      name: 'File',
      type: 'connector',
      properties: {},
      artifact: {
        scope: 'SYSTEM',
        name: 'core-plugins',
        version: '2.10.0-SNAPSHOT',
      },
    },
  },
];

export const mockResponseForFetchConnectors = [
  {
    name: 'S3',
    type: 'connector',
    category: 'Amazon Web Services',
    description: 'Connection to access data in Amazon S3.',
    className: 'io.cdap.plugin.aws.s3.connector.S3Connector',
    artifact: {
      name: 'amazon-s3-plugins',
      version: '1.18.0-SNAPSHOT',
      scope: 'SYSTEM',
    },
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
  },
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
  },
  {
    name: 'CloudSQLMySQL',
    type: 'connector',
    category: 'Database',
    description: 'Connection to access data in CloudSQL MySQL Server databases using JDBC.',
    className: 'io.cdap.plugin.cloudsql.mysql.CloudSQLMySQLConnector',
    artifact: {
      name: 'cloudsql-mysql-plugin',
      version: '1.9.0-SNAPSHOT',
      scope: 'SYSTEM',
    },
  },
  {
    name: 'CloudSQLPostgreSQL',
    type: 'connector',
    category: 'Database',
    description: 'Connection to access data in CloudSQL PostgreSQL Server databases using JDBC.',
    className: 'io.cdap.plugin.cloudsql.postgres.CloudSQLPostgreSQLConnector',
    artifact: {
      name: 'cloudsql-postgresql-plugin',
      version: '1.9.0-SNAPSHOT',
      scope: 'SYSTEM',
    },
  },
  {
    name: 'Kafka',
    type: 'connector',
    category: 'Messaging Systems',
    description: 'Connection to access data in Kafka topics.',
    className: 'io.cdap.plugin.connector.KafkaConnector',
    artifact: {
      name: 'kafka-plugins-client',
      version: '3.1.0-SNAPSHOT',
      scope: 'SYSTEM',
    },
  },
];

export const mockDataForExploreConnection = {
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
