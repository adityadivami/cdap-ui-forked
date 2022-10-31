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

import DataPrepStore from 'components/DataPrep/store';
import {
  IExistingExplorationCardsData,
  IMassagedObject,
} from 'components/WrangleHome/Components/OngoingDataExplorations/types';
import {
  CONNECTION_NAME,
  CONNECTOR_TYPE,
  COUNT,
  DATA_QUALITY,
  ICON,
  ICON_WITH_TEXT,
  NULL_VALUES,
  PERCENTAGE_WITH_TEXT,
  RECIPE_STEPS,
  TEXT,
  WORKPSACE_NAME,
  WORKSPACE_ID,
} from 'components/WrangleHome/Components/OngoingDataExplorations/Constants';

export const getUpdatedExplorationCards = (
  existingExplorationCardsData: IExistingExplorationCardsData[]
) => {
  // Massaging the data to map the API response to the Ongoing Data Exploration List

  const massagedArray = [];

  const { dataprep } = DataPrepStore.getState();
  const { connectorsWithIcons } = dataprep;

  const getIconForConnector = (connectorName: string) => {
    const matchingConnector = connectorsWithIcons.find(
      (eachConnector) => eachConnector.name === connectorName
    );
    return matchingConnector.SVG;
  };

  if (
    existingExplorationCardsData &&
    Array.isArray(existingExplorationCardsData) &&
    existingExplorationCardsData.length
  ) {
    existingExplorationCardsData.forEach((eachItem) => {
      const childArray = [];

      Object.keys(eachItem).map((keys) => {
        const obj = {} as IMassagedObject;
        if (keys === CONNECTOR_TYPE) {
          obj.icon = getIconForConnector(eachItem[keys]);
          obj.label = eachItem[keys];
          obj.type = ICON;
        } else if (keys === CONNECTION_NAME) {
          obj.label = eachItem[keys];
          obj.type = ICON_WITH_TEXT;
        } else if (keys === WORKPSACE_NAME) {
          obj.label = eachItem[keys];
          obj.type = TEXT;
        } else if (keys === RECIPE_STEPS) {
          obj.label = `${eachItem[keys]} Recipe steps`;
          obj.type = TEXT;
        } else if (keys === DATA_QUALITY) {
          obj.label = Number(eachItem[keys]);
          obj.percentageSymbol = '%';
          obj.subText = NULL_VALUES;
          obj.type = PERCENTAGE_WITH_TEXT;
        } else if (keys === WORKSPACE_ID) {
          obj.workspaceId = eachItem[keys];
        } else if (keys === COUNT) {
          obj.count = eachItem[keys];
        }
        childArray.push(obj);
      });

      massagedArray.push(childArray);
    });
  }

  return massagedArray;
};
