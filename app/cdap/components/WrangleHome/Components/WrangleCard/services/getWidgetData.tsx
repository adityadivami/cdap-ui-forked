import React from 'react';
import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import { fetchConnectionDetails, fetchConnectors } from 'components/Connections/Create/reducer';
import { getCategoriesToConnectorsMap } from '../Components/WidgetData/utils';
import { IConnectorArray, IConnectorDetailPayloadArray } from '../types';
import WidgetSVG from '../Components/WidgetData';
import { ImportDatasetIcon } from '../iconStore/ImportDatasetIcon';

export const getWidgetData = async (cbUpdateState) => {
  const connectorTypes = await fetchConnectors();
  const categorizedConnections = await getCategorizedConnections();
  const connectorTypeWithConnections = [];
  categorizedConnections.forEach((itemEach, key) => {
    connectorTypeWithConnections.push(key);
  });
  const connectorDataArray = [];
  let connectorDataWithSvgArray: IConnectorArray[] = [];
  const allConnectorsPluginProperties = getCategoriesToConnectorsMap(connectorTypes);
  const connectionPayloadArray: IConnectorDetailPayloadArray[] = [];
  allConnectorsPluginProperties.forEach((connectorsArray) => {
    if (connectorsArray.length) {
      connectorsArray.map((item) => {
        connectionPayloadArray.push(item);
      });
    }
  });
  const connectionDetailsData = await Promise.all(
    connectionPayloadArray.map(async (item, index) => {
      const selectedConnector = {
        artifact: item.artifact,
        category: item.category,
        name: item.name,
        type: item.type,
      };
      connectorDataArray.push(selectedConnector);
      return new Promise((resolve, reject) => {
        const response = fetchConnectionDetails(selectedConnector);
        if (response) {
          resolve(response);
        }
      });
    })
  );
  const connectorWidgetJson = connectionDetailsData.map(
    ({ connectorWidgetJSON }) => connectorWidgetJSON
  );
  connectorWidgetJson.map((item) => {
    connectorDataArray.map((connectorType) => {
      if (item['display-name'] && item['display-name'].includes(connectorType.name)) {
        connectorDataWithSvgArray.push({
          ...connectorType,
          SVG: <WidgetSVG dataSrc={item?.icon?.arguments?.data} />,
        });
      }
    });
  });

  connectorDataWithSvgArray = connectorDataWithSvgArray.filter((obj) =>
    connectorTypeWithConnections.find((item) => item == obj.name)
  );

  connectorDataWithSvgArray = [
    ...new Map(connectorDataWithSvgArray.map((item) => [item.name, item])).values(),
  ];

  connectorDataWithSvgArray.unshift({
    name: 'Imported Datasets',
    type: 'default',
    category: 'default',
    description: 'All Connections from the List',
    artifact: {
      name: 'allConnections',
      version: 'local',
      scope: 'local',
    },

    SVG: ImportDatasetIcon,
  });
  cbUpdateState({
    connectorTypes: connectorDataWithSvgArray,
  });
};
