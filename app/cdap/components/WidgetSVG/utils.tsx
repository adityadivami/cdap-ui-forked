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

import {
  fetchConnectionDetails,
  fetchConnectors,
  getCategoriesToConnectorsMap,
} from 'components/Connections/Create/reducer';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import {
  IConnectorArray,
  IConnectorDetailPayloadArray,
  IConnectorTypes,
} from 'components/WidgetSVG/types';
import WidgetSVG from 'components/WidgetSVG';
import { importDatasetIcon } from 'components/WrangleHome/Components/WrangleCard/iconStore/ImportDatasetIcon';
import React from 'react';

export const getWidgetData = async () => {
  const connectorTypes: IConnectorArray[] = await fetchConnectors();
  const connectorDataArray: IConnectorTypes[] = [];
  const connectorDataWithSvgArray: IConnectorArray[] = [];
  const allConnectorsPluginProperties: Map<
    string,
    IConnectorDetailPayloadArray[]
  > = getCategoriesToConnectorsMap(connectorTypes);
  const connectionPayloadArray: IConnectorDetailPayloadArray[] = [];
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
  const connectorWidgetJson =
    Array.isArray(connectionDetailsData) &&
    connectionDetailsData.length &&
    connectionDetailsData.map(({ connectorWidgetJSON }) => connectorWidgetJSON);

  connectorDataArray.map((connectorType) => {
    let connectorTypeHasWidget: boolean = false;
    /**
     * Getting widget icons for connector types
     */
    Array.isArray(connectorWidgetJson) &&
      connectorWidgetJson.length &&
      connectorWidgetJson.map((eachConnector) => {
        if (
          eachConnector['display-name'] &&
          eachConnector['display-name'].includes(connectorType.name)
        ) {
          connectorDataWithSvgArray.push({
            ...connectorType,
            SVG: (
              <WidgetSVG
                dataSrc={eachConnector?.icon?.arguments?.data}
                label={connectorType.name}
              />
            ),
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
        SVG: <WidgetSVG dataSrc={undefined} label={connectorType.name} />,
      });
    }
  });

  connectorDataWithSvgArray.push({
    name: 'Imported Dataset',
    SVG: importDatasetIcon,
  });

  DataPrepStore.dispatch({
    type: DataPrepActions.setConnectorIcons,
    payload: {
      data: connectorDataWithSvgArray,
    },
  });
};
