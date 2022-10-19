import { getWidgetData } from '../services/getWidgetData';
import * as apiHelpers from 'components/Connections/Browser/SidePanel/apiHelpers';
import * as reducer from 'components/Connections/Create/reducer';

describe('getWidgetData', () => {
  it('', async () => {
    jest.spyOn(reducer, 'fetchConnectors').mockReturnValueOnce(
      Promise.resolve([
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
          description:
            'Connection to access data in CloudSQL PostgreSQL Server databases using JDBC.',
          className: 'io.cdap.plugin.cloudsql.postgres.CloudSQLPostgreSQLConnector',
          artifact: {
            name: 'cloudsql-postgresql-plugin',
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
          name: 'Database',
          type: 'connector',
          category: 'Database',
          description: 'Connection to access data in relational databases using JDBC.',
          className: 'io.cdap.plugin.db.connector.DBConnector',
          artifact: {
            name: 'database-plugins',
            version: '2.10.0-SNAPSHOT',
            scope: 'SYSTEM',
          },
        },
        {
          name: 'BigQuery',
          type: 'connector',
          category: 'Google Cloud Platform',
          description: 'Connection to access data in BigQuery datasets and tables.',
          className: 'io.cdap.plugin.gcp.bigquery.connector.BigQueryConnector',
          artifact: {
            name: 'google-cloud',
            version: '0.21.0-SNAPSHOT',
            scope: 'SYSTEM',
          },
        },
        {
          name: 'GCS',
          type: 'connector',
          category: 'Google Cloud Platform',
          description: 'Connection to access data in Google Cloud Storage.',
          className: 'io.cdap.plugin.gcp.gcs.connector.GCSConnector',
          artifact: {
            name: 'google-cloud',
            version: '0.21.0-SNAPSHOT',
            scope: 'SYSTEM',
          },
        },
        {
          name: 'Spanner',
          type: 'connector',
          category: 'Google Cloud Platform',
          description: 'Connection to access data in Spanner databases and tables.',
          className: 'io.cdap.plugin.gcp.spanner.connector.SpannerConnector',
          artifact: {
            name: 'google-cloud',
            version: '0.21.0-SNAPSHOT',
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
        {
          name: 'SQL Server',
          type: 'connector',
          category: 'Database',
          description: 'Connection to access data in SQL Server databases using JDBC.',
          className: 'io.cdap.plugin.mssql.SqlServerConnector',
          artifact: {
            name: 'mssql-plugin',
            version: '1.9.0-SNAPSHOT',
            scope: 'SYSTEM',
          },
        },
        {
          name: 'MySQL',
          type: 'connector',
          category: 'Database',
          description: 'Connection to access data in Mysql databases using JDBC.',
          className: 'io.cdap.plugin.mysql.MysqlConnector',
          artifact: {
            name: 'mysql-plugin',
            version: '1.9.0-SNAPSHOT',
            scope: 'SYSTEM',
          },
        },
        {
          name: 'Oracle',
          type: 'connector',
          category: 'Database',
          description: 'Connection to access data in Oracle databases using JDBC.',
          className: 'io.cdap.plugin.oracle.OracleConnector',
          artifact: {
            name: 'oracle-plugin',
            version: '1.9.0-SNAPSHOT',
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
      ])
    );

    const data = new Map();
    data.set('PostgreSql', [
      {
        name: 'TESTING',
        connectionId: 'TESTING',
        connectionType: 'PostgreSQL',
        description: '',
        preConfigured: false,
        isDefault: false,
        createdTimeMillis: 1663766799085,
        updatedTimeMillis: 1663766799085,
        plugin: {
          category: 'Database',
          name: 'PostgreSQL',
          type: 'connector',
          properties: {
            host: 'jenkins.divami.com',
            port: '5432',
            jdbcPluginName: 'postgresql',
            database: 'exlaibias',
            user: 'postgres',
            password: 'divami',
            connectionArguments: '1=1',
          },
          artifact: {
            scope: 'SYSTEM',
            name: 'postgresql-plugin',
            version: '1.9.0-SNAPSHOT',
          },
        },
      },
    ]);
    data.set('File', {
      name: 'fjhgkhjl',
      connectionId: 'fjhgkhjl',
      connectionType: 'File',
      description: '',
      preConfigured: false,
      isDefault: false,
      createdTimeMillis: 1663766703232,
      updatedTimeMillis: 1663766703232,
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
    });

    jest
      .spyOn(apiHelpers as any, 'getCategorizedConnections')
      .mockReturnValueOnce(Promise.resolve(data));
    const response = {
      connectorProperties: {
        accessID: {
          name: 'accessID',
          description: 'Access ID of the Amazon S3 instance to connect to.',
          type: 'string',
          required: false,
          macroSupported: true,
          macroEscapingEnabled: false,
          children: [],
        },
        sessionToken: {
          name: 'sessionToken',
          description:
            'Session Token of the Amazon S3 instance to connect to, if this is a temporary credential',
          type: 'string',
          required: false,
          macroSupported: true,
          macroEscapingEnabled: false,
          children: [],
        },
        region: {
          name: 'region',
          description: 'Region to be used by the S3 Client.',
          type: 'string',
          required: false,
          macroSupported: true,
          macroEscapingEnabled: false,
          children: [],
        },
        accessKey: {
          name: 'accessKey',
          description: 'Access Key of the Amazon S3 instance to connect to.',
          type: 'string',
          required: false,
          macroSupported: true,
          macroEscapingEnabled: false,
          children: [],
        },
        authenticationMethod: {
          name: 'authenticationMethod',
          description: 'Authentication method to access S3. Defaults to Access Credentials.',
          type: 'string',
          required: false,
          macroSupported: true,
          macroEscapingEnabled: false,
          children: [],
        },
      },
      connectorWidgetJSON: {
        outputs: [],
        metadata: {
          'spec-version': '1.0',
        },
        'configuration-groups': [
          {
            label: 'Credentials',
            properties: [
              {
                'widget-type': 'radio-group',
                name: 'authenticationMethod',
                label: 'Authentication Method',
                'widget-attributes': {
                  layout: 'inline',
                  default: 'Access Credentials',
                  options: [
                    {
                      id: 'Access Credentials',
                      label: 'Access Credentials',
                    },
                    {
                      id: 'IAM',
                      label: 'IAM',
                    },
                  ],
                },
              },
              {
                'widget-type': 'textbox',
                name: 'accessID',
                label: 'Access ID',
                'widget-attributes': {
                  placeholder: 'Amazon Access ID',
                },
              },
              {
                'widget-type': 'password',
                name: 'accessKey',
                label: 'Access Key',
                'widget-attributes': {
                  placeholder: 'Amazon Access Key',
                },
              },
              {
                'widget-type': 'sessiontoken',
                name: 'sessionToken',
                label: 'Session Token',
                'widget-attributes': {
                  placeholder: 'Amazon temporary credential session token',
                },
              },
              {
                'widget-type': 'select',
                name: 'region',
                label: 'Region',
                'widget-attributes': {
                  values: [
                    {
                      label: 'US East (Ohio) - us-east-2',
                      value: 'us-east-2',
                    },
                  ],
                },
              },
            ],
          },
          {
            label: 'Sampling Properties',
            properties: [
              {
                'widget-type': 'plugin-list',
                name: 'format',
                label: 'Format',
                'widget-attributes': {
                  'plugin-type': 'validatingInputFormat',
                },
              },
              {
                'widget-type': 'textbox',
                name: 'delimiter',
                label: 'Delimiter',
                'widget-attributes': {
                  placeholder: "Delimiter if the format is 'delimited'",
                },
              },
              {
                'widget-type': 'toggle',
                name: 'skipHeader',
                label: 'Skip Header',
                'widget-attributes': {
                  default: 'false',
                  off: {
                    label: 'False',
                    value: 'false',
                  },
                  on: {
                    label: 'True',
                    value: 'true',
                  },
                },
              },
              {
                'widget-type': 'select',
                name: 'fileEncoding',
                label: 'File encoding',
                'widget-attributes': {
                  default: 'UTF-8',
                  values: [
                    {
                      label: 'UTF-8',
                      value: 'UTF-8',
                    },
                  ],
                },
              },
            ],
          },
        ],
        'display-name': 'S3',
        icon: {
          arguments: {
            data: 'data:image/png;base64,',
          },
          type: 'inline',
        },
        filters: [
          {
            condition: {
              expression: "authenticationMethod == 'Access Credentials'",
            },
            name: 'AuthByIAM',
            show: [
              {
                name: 'accessID',
              },
            ],
          },
        ],
      },
      connectorDoc: '#',
      connectorError: null,
    };

    jest.spyOn(reducer, 'fetchConnectionDetails').mockReturnValueOnce(Promise.resolve(response));
    const mockFn = jest.fn();
    await getWidgetData(mockFn);
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
