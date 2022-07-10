import React, { useState, useEffect } from 'react';
import ConnectionsTabs from './ConnectionTabs';
import {
  fetchConnectors,
  fetchAllConnectorPluginProperties,
  getMapOfConnectorToPluginProperties,
} from '../../Connections/Create/reducer';
import { getCategorizedConnections } from '../../Connections/Browser/SidePanel/apiHelpers';
import GCSIcon from './SVGs/GCSIcon';
import AllConnectionsIcon from './SVGs/AllConnectionsIcon';

interface IConnectorTypes {
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

interface ConnectionTabSidePanel {
  connectorTypes: IConnectorTypes[];
  mapOfConnectorPluginProperties: { [key: string]: any };
}

const ConnectionTabsCaller = () => {
  const [value, setValue] = React.useState('All Connections');
  const [state, setState] = useState<ConnectionTabSidePanel>({
    connectorTypes: [],
    mapOfConnectorPluginProperties: null,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
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

    let allConnectionsTotalLength = 0;

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
      mapOfConnectorPluginProperties,
    });
  };

  useEffect(() => {
    getConnectionTabData();
  }, []);

  return (
    <ConnectionsTabs
      connectorTypes={state.connectorTypes}
      handleChange={handleChange}
      value={value}
    />
  );
};

export default ConnectionTabsCaller;
