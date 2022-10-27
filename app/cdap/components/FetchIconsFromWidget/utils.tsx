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

import { getCategorizedConnections } from 'components/Connections/Browser/SidePanel/apiHelpers';
import {
  fetchConnectionDetails,
  fetchConnectors,
  getCategoriesToConnectorsMap,
} from 'components/Connections/Create/reducer';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import React from 'react';
import WidgetSVG from './Widget';

export const getWidgetData = async () => {
  const connectorTypes = await fetchConnectors();
  const categorizedConnections = await getCategorizedConnections();
  const connectorTypeWithConnections = [];
  categorizedConnections?.forEach((itemEach, key) => {
    connectorTypeWithConnections.push(key);
  });
  const connectorDataArray = [];
  const connectorDataWithSvgArray = [];
  const allConnectorsPluginProperties = getCategoriesToConnectorsMap(connectorTypes);
  const connectionPayloadArray = [];
  allConnectorsPluginProperties?.forEach((connectorsArray) => {
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

  connectorDataArray.map((connectorType) => {
    let connectorTypeHasWidget = false;
    /**
     * Getting widget icons for connector types
     */
    connectorWidgetJson.map((item) => {
      if (item['display-name'] && item['display-name'].includes(connectorType.name)) {
        connectorDataWithSvgArray.push({
          ...connectorType,
          SVG: <WidgetSVG dataSrc={item?.icon?.arguments?.data} />,
        });
        connectorTypeHasWidget = true;
      }
    });
    /**
     * Retaining the connector types which are not part of widget api
     */
    if (!connectorTypeHasWidget) {
      connectorDataWithSvgArray.push({
        ...connectorType,
        SVG: <WidgetSVG dataSrc={undefined} />,
      });
    }
  });

  DataPrepStore.dispatch({
    type: DataPrepActions.setConnectorIcons,
    payload: {
      data: connectorDataWithSvgArray,
    },
  });
};
