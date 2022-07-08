import React, { useState, useEffect } from 'react';
import Table from 'components/shared/Table';
import TableHeader from 'components/shared/Table/TableHeader';
import TableBody from 'components/shared/Table/TableBody';
import TableCell from 'components/shared/Table/TableCell';
import TableRow from 'components/shared/Table/TableRow';
import ConnectionsTabs from '../ConnectionsTabs/index';
import { makeStyles } from '@material-ui/core';
import {
  fetchConnectors,
  fetchAllConnectorPluginProperties,
  getMapOfConnectorToPluginProperties,
} from '../../Connections/Create/reducer';
import { getCategorizedConnections } from '../../Connections/Browser/SidePanel/apiHelpers';

const useStyles = makeStyles(() => {
  return {
    mainContainer: {
      padding: '26px 30px 100px 26px',
    },
  };
});

interface IConnectorType2 {
  name: string;
  type: string;
  category: string;
  description: string;
  artifact: {
    name: string;
    version: string;
    scope: string;
  };
}

interface ConnectionTabSidePanel2 {
  categorizedConnections: Map<string, any[]>;
  connectorTypes: IConnectorType2[];
  mapOfConnectorPluginProperties: { [key: string]: any };
}

const DataTableComponent = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState('All Connections');
  const [tableData, setTableData] = useState([
    {
      ConnectionType: 'Oracle',
      DatasetName: 'nisl duis bibendum felis sed',
      FileFormat: 'Avro',
      Schema: 7,
      LastUpdated: '1:40 PM',
      ConnectionName: 'duis ac nibh fusce lacus purus aliquet',
      ConnectionStatus: '10:44 PM',
    },
    {
      ConnectionType: 'CloudSQLMySQL',
      DatasetName: 'non mauris morbi non lectus',
      FileFormat: 'CSV',
      Schema: 10,
      LastUpdated: '2:28 AM',
      ConnectionName: 'non mattis pulvinar nulla pede ullamcorper augue',
      ConnectionStatus: '9:37 PM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'blandit mi in porttitor pede',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '2:56 PM',
      ConnectionName: 'porta volutpat quam pede lobortis ligula sit',
      ConnectionStatus: '12:50 PM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'nec molestie sed justo pellentesque viverra pede',
      FileFormat: 'Avro',
      Schema: 1,
      LastUpdated: '5:27 AM',
      ConnectionName: 'quam pharetra magna ac consequat metus',
      ConnectionStatus: '4:55 PM',
    },
    {
      ConnectionType: 'Oracle',
      DatasetName: 'tellus nisi eu orci mauris lacinia',
      FileFormat: 'Table',
      Schema: 9,
      LastUpdated: '12:45 AM',
      ConnectionName: 'natoque penatibus et magnis dis parturient montes',
      ConnectionStatus: '3:39 AM',
    },
    {
      ConnectionType: 'GCS',
      DatasetName: 'volutpat convallis morbi odio odio elementum',
      FileFormat: 'Avro',
      Schema: 5,
      LastUpdated: '11:14 PM',
      ConnectionName: 'luctus cum sociis natoque penatibus',
      ConnectionStatus: '7:15 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'in hac habitasse platea dictumst maecenas ut',
      FileFormat: 'Table',
      Schema: 8,
      LastUpdated: '6:34 PM',
      ConnectionName: 'semper porta volutpat quam pede lobortis',
      ConnectionStatus: '9:46 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'adipiscing elit proin interdum mauris non ligula',
      FileFormat: 'Avro',
      Schema: 1,
      LastUpdated: '9:22 PM',
      ConnectionName: 'cras in purus eu magna vulputate',
      ConnectionStatus: '6:47 PM',
    },
    {
      ConnectionType: 'GCS',
      DatasetName: 'donec quis orci eget orci vehicula',
      FileFormat: 'CSV',
      Schema: 3,
      LastUpdated: '11:31 AM',
      ConnectionName: 'non mauris morbi non lectus aliquam',
      ConnectionStatus: '2:29 PM',
    },

    {
      ConnectionType: 'Oracle',
      DatasetName: 'quam nec dui luctus rutrum',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '5:19 PM',
      ConnectionName: 'dignissim vestibulum vestibulum ante ipsum primis',
      ConnectionStatus: '8:07 AM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'pellentesque quisque porta volutpat erat quisque',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '12:18 AM',
      ConnectionName: 'nunc proin at turpis a',
      ConnectionStatus: '5:35 PM',
    },

    {
      ConnectionType: 'Oracle',
      DatasetName: 'mollis molestie lorem quisque ut erat curabitur',
      FileFormat: 'Avro',
      Schema: 8,
      LastUpdated: '11:28 AM',
      ConnectionName: 'justo eu massa donec dapibus',
      ConnectionStatus: '10:55 AM',
    },
    {
      ConnectionType: 'MySQL',
      DatasetName: 'adipiscing elit proin interdum mauris non',
      FileFormat: 'CSV',
      Schema: 7,
      LastUpdated: '11:39 PM',
      ConnectionName: 'fermentum donec ut mauris eget massa tempor',
      ConnectionStatus: '9:18 AM',
    },
    {
      ConnectionType: 'Oracle',
      DatasetName: 'eget nunc donec quis orci eget orci',
      FileFormat: 'CSV',
      Schema: 6,
      LastUpdated: '12:17 AM',
      ConnectionName: 'mauris eget massa tempor convallis',
      ConnectionStatus: '9:54 AM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'eu nibh quisque id justo sit',
      FileFormat: 'Parquet',
      Schema: 6,
      LastUpdated: '1:06 AM',
      ConnectionName: 'mauris lacinia sapien quis libero',
      ConnectionStatus: '1:26 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'penatibus et magnis dis parturient montes nascetur',
      FileFormat: 'Avro',
      Schema: 7,
      LastUpdated: '2:17 PM',
      ConnectionName: 'a pede posuere nonummy integer',
      ConnectionStatus: '11:31 PM',
    },
  ]);
  const [data, setData] = useState([
    {
      ConnectionType: 'Oracle',
      DatasetName: 'nisl duis bibendum felis sed',
      FileFormat: 'Avro',
      Schema: 7,
      LastUpdated: '1:40 PM',
      ConnectionName: 'duis ac nibh fusce lacus purus aliquet',
      ConnectionStatus: '10:44 PM',
    },
    {
      ConnectionType: 'CloudSQLMySQL',
      DatasetName: 'non mauris morbi non lectus',
      FileFormat: 'CSV',
      Schema: 10,
      LastUpdated: '2:28 AM',
      ConnectionName: 'non mattis pulvinar nulla pede ullamcorper augue',
      ConnectionStatus: '9:37 PM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'blandit mi in porttitor pede',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '2:56 PM',
      ConnectionName: 'porta volutpat quam pede lobortis ligula sit',
      ConnectionStatus: '12:50 PM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'nec molestie sed justo pellentesque viverra pede',
      FileFormat: 'Avro',
      Schema: 1,
      LastUpdated: '5:27 AM',
      ConnectionName: 'quam pharetra magna ac consequat metus',
      ConnectionStatus: '4:55 PM',
    },
    {
      ConnectionType: 'Oracle',
      DatasetName: 'tellus nisi eu orci mauris lacinia',
      FileFormat: 'Table',
      Schema: 9,
      LastUpdated: '12:45 AM',
      ConnectionName: 'natoque penatibus et magnis dis parturient montes',
      ConnectionStatus: '3:39 AM',
    },
    {
      ConnectionType: 'GCS',
      DatasetName: 'volutpat convallis morbi odio odio elementum',
      FileFormat: 'Avro',
      Schema: 5,
      LastUpdated: '11:14 PM',
      ConnectionName: 'luctus cum sociis natoque penatibus',
      ConnectionStatus: '7:15 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'in hac habitasse platea dictumst maecenas ut',
      FileFormat: 'Table',
      Schema: 8,
      LastUpdated: '6:34 PM',
      ConnectionName: 'semper porta volutpat quam pede lobortis',
      ConnectionStatus: '9:46 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'adipiscing elit proin interdum mauris non ligula',
      FileFormat: 'Avro',
      Schema: 1,
      LastUpdated: '9:22 PM',
      ConnectionName: 'cras in purus eu magna vulputate',
      ConnectionStatus: '6:47 PM',
    },
    {
      ConnectionType: 'GCS',
      DatasetName: 'donec quis orci eget orci vehicula',
      FileFormat: 'CSV',
      Schema: 3,
      LastUpdated: '11:31 AM',
      ConnectionName: 'non mauris morbi non lectus aliquam',
      ConnectionStatus: '2:29 PM',
    },

    {
      ConnectionType: 'Oracle',
      DatasetName: 'quam nec dui luctus rutrum',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '5:19 PM',
      ConnectionName: 'dignissim vestibulum vestibulum ante ipsum primis',
      ConnectionStatus: '8:07 AM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'pellentesque quisque porta volutpat erat quisque',
      FileFormat: 'Avro',
      Schema: 2,
      LastUpdated: '12:18 AM',
      ConnectionName: 'nunc proin at turpis a',
      ConnectionStatus: '5:35 PM',
    },

    {
      ConnectionType: 'Oracle',
      DatasetName: 'mollis molestie lorem quisque ut erat curabitur',
      FileFormat: 'Avro',
      Schema: 8,
      LastUpdated: '11:28 AM',
      ConnectionName: 'justo eu massa donec dapibus',
      ConnectionStatus: '10:55 AM',
    },
    {
      ConnectionType: 'MySQL',
      DatasetName: 'adipiscing elit proin interdum mauris non',
      FileFormat: 'CSV',
      Schema: 7,
      LastUpdated: '11:39 PM',
      ConnectionName: 'fermentum donec ut mauris eget massa tempor',
      ConnectionStatus: '9:18 AM',
    },
    {
      ConnectionType: 'Oracle',
      DatasetName: 'eget nunc donec quis orci eget orci',
      FileFormat: 'CSV',
      Schema: 6,
      LastUpdated: '12:17 AM',
      ConnectionName: 'mauris eget massa tempor convallis',
      ConnectionStatus: '9:54 AM',
    },
    {
      ConnectionType: 'Kafka',
      DatasetName: 'eu nibh quisque id justo sit',
      FileFormat: 'Parquet',
      Schema: 6,
      LastUpdated: '1:06 AM',
      ConnectionName: 'mauris lacinia sapien quis libero',
      ConnectionStatus: '1:26 AM',
    },
    {
      ConnectionType: 'BigQuery',
      DatasetName: 'penatibus et magnis dis parturient montes nascetur',
      FileFormat: 'Avro',
      Schema: 7,
      LastUpdated: '2:17 PM',
      ConnectionName: 'a pede posuere nonummy integer',
      ConnectionStatus: '11:31 PM',
    },
  ]);

  const [state, setState] = useState<ConnectionTabSidePanel2>({
    categorizedConnections: new Map(),
    connectorTypes: [],
    mapOfConnectorPluginProperties: null,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);

    // if (newValue.connectionName === 'All Connections') {
    //   console.log('');
    // } else {
    //   const filteredTable = tableData.filter((rows) => {
    //     return rows.ConnectionType === newValue.connectionName;
    //   });

    //   console.log(filteredTable);
    //   setData(filteredTable);
    // }
  };

  const getCount = (connectionType) => {
    console.log(connectionType);

    if (connectionType === 'All Connections') {
      return data.length;
    } else {
      return data.filter((each) => each.ConnectionType === connectionType).length;
    }
  };

  const getConnectionTabData = async () => {
    let connectorTypes = await fetchConnectors();
    const categorizedConnections = await getCategorizedConnections();

    connectorTypes = connectorTypes.filter((conn) => {
      return [conn.name];
    });
    const allConnectorsPluginProperties = await fetchAllConnectorPluginProperties(connectorTypes);
    const mapOfConnectorPluginProperties = getMapOfConnectorToPluginProperties(
      allConnectorsPluginProperties
    );
    setState({
      categorizedConnections,
      connectorTypes,
      mapOfConnectorPluginProperties,
    });
  };

  useEffect(() => {
    getConnectionTabData();
  }, []);

  return (
    <div className={classes.mainContainer}>
      <React.Fragment>
        <div>
          <ConnectionsTabs
            connectorTypes={state.connectorTypes}
            categorizedConnections={state.categorizedConnections}
            handleChange={handleChange}
            value={value}
          />
        </div>

        {/* <Table columnTemplate="2fr 1fr 1fr 1fr 1fr 1fr">
          <TableHeader>
            <TableRow>
              <TableCell>Dataset name</TableCell>
              <TableCell>File format</TableCell>
              <TableCell>Schema</TableCell>
              <TableCell>Lastupdated</TableCell>
              <TableCell>Connection name</TableCell>
              <TableCell>Connection Type</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((conn) => {
              return (
                <TableRow onClick={() => handleClick(conn)}>
                  <TableCell>{conn.DatasetName}</TableCell>
                  <TableCell>{conn.FileFormat}</TableCell>
                  <TableCell>{conn.Schema} Columns </TableCell>
                  <TableCell>{conn.LastUpdated}</TableCell>
                  <TableCell>{conn.ConnectionName}</TableCell>
                  <TableCell>{conn.ConnectionType}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table> */}
      </React.Fragment>
    </div>
  );
};

export default DataTableComponent;
