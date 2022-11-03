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
  fetchAllConnectorPluginProperties,
  fetchConnectionDetails,
  fetchConnectors,
  getMapOfConnectorToPluginProperties,
  getSelectedConnectorDisplayName,
} from 'components/Connections/Create/reducer';
import WidgetSVG from 'components/WrangleHome/Components/WidgetSVG';
import { getCategoriesToConnectorsMap } from 'components/WrangleHome/Components/WidgetSVG/utils';
import { AddConnectionIcon } from 'components/WrangleHome/Components/WrangleCard/iconStore/AddConnectionIcon';
import { ImportDataIcon } from 'components/WrangleHome/Components/WrangleCard/iconStore/ImportDataIcon';
import { importDatasetIcon } from 'components/WrangleHome/Components/WrangleCard/iconStore/importDataset';
import {
  IConnector,
  IConnectorDetailPayload,
} from 'components/WrangleHome/Components/WrangleCard/types';
import React from 'react';
import { IConnectorTypes } from 'components/WrangleHome/Components/WidgetSVG/types';
import DataPrepStore from 'components/DataPrep/store';

export const getUpdatedConnectorCards = async (connectorsInStore) => {
  console.log(connectorsInStore, 'connectorsWithIconsconnectorsWithIcons');
  const connectorDataWithSvgArray = connectorsInStore;

  const connectorTypes: IConnectorTypes[] = await fetchConnectors();

  const staticCardModel = {
    name: 'Imported Datasets',
    type: 'default',
    category: 'default',
    description: 'All Connections from the List',
    artifact: {
      name: 'allConnections',
      version: 'local',
      scope: 'local',
    },

    SVG: importDatasetIcon,
  };

  connectorDataWithSvgArray.unshift({
    ...staticCardModel,
    name: 'Import Data',
    SVG: ImportDataIcon,
    link: 'home',
  });
  connectorDataWithSvgArray.unshift({
    ...staticCardModel,
    name: 'Add Connection',
    SVG: AddConnectionIcon,
    link: 'connections/create',
  });

  const connectorsPluginProperties = await fetchAllConnectorPluginProperties(connectorTypes);

  const mapOfConnectorPluginProperties = getMapOfConnectorToPluginProperties(
    connectorsPluginProperties
  );

  connectorTypes?.forEach((eachConnectorType) => {
    const displayName = getSelectedConnectorDisplayName(
      eachConnectorType,
      mapOfConnectorPluginProperties
    );
    const index = connectorDataWithSvgArray.findIndex(
      (eachConnectorDataWithSvgArray) =>
        eachConnectorDataWithSvgArray.name === eachConnectorType.name
    );

    if (index >= 0) {
      connectorDataWithSvgArray[index].displayName = displayName;
    }
  });

  return {
    connectorTypes: connectorDataWithSvgArray,
  };
};
