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
import { fetchConnectors } from 'components/Connections/Create/reducer';
import { attachStaticCards } from 'components/WrangleHome/services/attachStaticCards';
import { getConnectorTypesDisplayNames } from 'components/WrangleHome/services/getConnectorTypesDisplayNames';

export const getUpdatedConnectorCards = async (storeConnectors) => {
  const connectorTypes = await fetchConnectors();
  const categorizedConnections = await getCategorizedConnections();

  const getIconForConnector = (connectorName: string) => {
    const matchingConnector = storeConnectors.find(
      (eachConnector) => eachConnector.name === connectorName
    );
    return matchingConnector.SVG;
  };

  const connectorTypeWithConnections = [];
  categorizedConnections?.forEach((value, key) => {
    let mostUpdatedTimeStamp = value[0].updatedTimeMillis;
    value.forEach((e) => {
      if (mostUpdatedTimeStamp < e.updatedTimeMillis) {
        mostUpdatedTimeStamp = e.updatedTimeMillis;
      }
    });
    connectorTypeWithConnections.push({ name: key, time: mostUpdatedTimeStamp });
  });

  const sortedConections = [...connectorTypeWithConnections].sort((a, b) => b.time - a.time);

  let connectorDataWithSvgArray = sortedConections.map((eachConnector) => {
    return {
      ...eachConnector,
      SVG: getIconForConnector(eachConnector.name),
    };
  });

  connectorDataWithSvgArray = attachStaticCards(connectorDataWithSvgArray);
  getConnectorTypesDisplayNames(connectorTypes, connectorDataWithSvgArray).then((response) => {
    if (response) {
      connectorDataWithSvgArray = response;
    }
  });

  return {
    connectorTypes: connectorDataWithSvgArray,
  };
};
