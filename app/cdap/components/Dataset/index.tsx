import * as React from 'react';
import ConnectionsTabs from './ConnectionTabs';
import { exploreConnection } from 'components/Connections/Browser/GenericBrowser/apiHelpers';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectors } from 'components/Connections/Create/reducer';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Box, styled } from '@material-ui/core';

import { Idata } from './interfaces/interface';
import { ConnectionTabSidePanel } from './interfaces/interface';
import AllConnectionsIcon from './SVGs/AllConnectionsIcon';
import GCSIcon from './SVGs/GCSIcon';
import DataTable from '../DatasetListTable/DataTable';
import { forEach } from 'vega-lite/build/src/encoding';

const SelectDatasetWrapper = styled(Box)({
  display: 'flex',
});

const DatasetWrapper: React.FC = () => {
  const [state, setState] = useState<ConnectionTabSidePanel>({
    connectorTypes: [],
  });
  const loc = useLocation();
  const [data, setData] = React.useState<any>([]);
  const [value, setValue] = useState('All Connections');
  const queryParams = new URLSearchParams(loc.search);
  const pathFromUrl = queryParams.get('path') || '/';
  const [connectionsList, setConnectionsList] = useState([]);
  const listOfEntities = [];

  React.useEffect(() => {
    getConnectionsTabData();
  }, []);
  const getConnectionsTabData = async () => {
    let connectorTypes = await fetchConnectors();
    let allConnectionsTotalLength = 0;

    const categorizedConnections = await getCategorizedConnections();
    connectorTypes = connectorTypes.filter((conn) => {
      return [conn.name];
    });
    connectorTypes = connectorTypes.map((connectorType) => {
      const connections = categorizedConnections.get(connectorType.name) || [];
      allConnectionsTotalLength = allConnectionsTotalLength + connections.length;

      return {
        ...connectorType,
        count: connections.length,
        SVG: <GCSIcon />,
      };
    });

    connectorTypes.unshift({
      name: 'All Connections',
      type: 'default',
      category: 'default',
      description: 'All Connections from the List',
      artifact: {
        name: 'allConnections',
        version: 'local',
        scope: 'local',
      },
      count: allConnectionsTotalLength,
      SVG: <AllConnectionsIcon />,
    });

    setState({
      connectorTypes,
    });
  };

  const selectedTabValueHandler = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setData([]);
    newValue !== 'All Connections' && getCategorizedConnectionsforSelectedTab(newValue);
  };

  const getCategorizedConnectionsforSelectedTab = async (selectedValue: string) => {
    const categorizedConnections = await getCategorizedConnections();
    const connections = categorizedConnections.get(selectedValue) || [];
    setConnectionsList(connections);
    fetchEntities(connections);
  };

  const fetchEntities = async (connections, url = pathFromUrl) => {
    const connectionsUpdated = connections.map((eachConnection) => {
      return exploreConnection({
        connectionid: eachConnection.connectionId,
        path: url,
      });
    });

    try {
      await Promise.all([await connectionsUpdated]).then((values) => {
        values.map((value) => {
          value.map((each) =>
            each.then((response) => {
              setData((prev: any) => ([...prev, response.entities] as any).flat());
            })
          );
        });
      });
    } catch (e) {}
  };
  React.useEffect(() => {
    // console.log(data, 'this is data');
  }, [data]);

  const fetchInsideEntities = async (connectionid, url = pathFromUrl) => {
    const x = await exploreConnection({
      connectionid,
      path: url,
    })
      .then((response) => response)
      .then((response1) => {
        response1.entities.map((each) => {
          if (each.canBrowse === false && each.canSample === true) {
            listOfEntities.push(each);
          } else {
            fetchInsideEntities(connectionid, each.path);
          }
        });
      });
  };

  connectionsList.map((eachConnection) => {
    const flat = 0;
    const x = fetchInsideEntities(eachConnection.connectionId);
  });

  React.useEffect(() => {
    console.log(listOfEntities, 'Entities List');
  }, [listOfEntities]);

  // console.log(datasetsList, 'Datasets List');
  return (
    <SelectDatasetWrapper>
      <ConnectionsTabs
        connectorTypes={state.connectorTypes}
        handleChange={selectedTabValueHandler}
        value={value}
      />
      <DataTable datasetList={data} />
    </SelectDatasetWrapper>
  );
};

export default DatasetWrapper;
