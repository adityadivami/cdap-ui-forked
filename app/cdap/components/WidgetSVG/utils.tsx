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
import WidgetSVG from 'components/WidgetSVG';
import {
  IConnectorTypesWithSVG,
  IConnectorDetailsPayload,
  IConnectorTypes,
} from 'components/WidgetSVG/types';
import { ImportDatasetIcon } from 'components/WrangleHome/Components/WrangleCard/iconStore/ImportDataset';
import React from 'react';

export const getWidgetData = async () => {
  const connectorTypes: IConnectorTypesWithSVG[] = await fetchConnectors();
  const connectorsTypesData: IConnectorTypes[] = [];
  const IConnectionWithConnectorType: IConnectorTypesWithSVG[] = [];
  const allConnectorsPluginProperties: Map<
    string,
    IConnectorDetailsPayload[]
  > = getCategoriesToConnectorsMap(connectorTypes);
  const connectorsPluginProperties: IConnectorDetailsPayload[] = [];
  allConnectorsPluginProperties?.forEach((eachProperty) => {
    if (eachProperty.length) {
      eachProperty.forEach((eachPropertyItem) => {
        connectorsPluginProperties.push(eachPropertyItem);
      });
    }
  });

  const connectionDetailsData = await Promise.all(
    connectorsPluginProperties.map(async (eachConnection) => {
      const selectedConnector = {
        artifact: eachConnection.artifact,
        category: eachConnection.category,
        name: eachConnection.name,
        type: eachConnection.type,
      };
      connectorsTypesData.push(selectedConnector);
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

  connectorsTypesData.map((connectorType) => {
    let connectorTypeHasWidget: boolean = false;

    // Getting widget icons for connector types

    Array.isArray(connectorWidgetJson) &&
      connectorWidgetJson.length &&
      connectorWidgetJson.map((eachConnector) => {
        if (
          eachConnector['display-name'] &&
          eachConnector['display-name'].includes(connectorType.name)
        ) {
          IConnectionWithConnectorType.push({
            ...connectorType,
            SVG: (
              <WidgetSVG
                imageSource={eachConnector?.icon?.arguments?.data}
                label={connectorType.name}
              />
            ),
          });
          connectorTypeHasWidget = true;
        }
      });

    // Retaining the connector types which are not part of widget api

    if (!connectorTypeHasWidget) {
      IConnectionWithConnectorType.push({
        ...connectorType,
        SVG: <WidgetSVG label={connectorType.name} />,
      });
    }
  });

  IConnectionWithConnectorType.push({
    name: 'Imported Dataset',
    SVG: ImportDatasetIcon,
  });

  DataPrepStore.dispatch({
    type: DataPrepActions.setConnectorIcons,
    payload: {
      data: IConnectionWithConnectorType,
    },
  });
};
