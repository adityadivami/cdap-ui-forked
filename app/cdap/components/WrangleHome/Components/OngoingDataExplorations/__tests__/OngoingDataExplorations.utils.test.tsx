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

import { mockOldData } from '../mock/mockOldData';
import { getUpdatedExplorationCards } from '../utils';

describe('Test the Utility Functions', () => {
  it('Should test the result for empty array', () => {
    const result = getUpdatedExplorationCards([]);
    expect(result).toEqual([]);
  });

  it('Should have returned the expected result for the provided mock data', () => {
    const result = getUpdatedExplorationCards(mockOldData);
    expect(result).toEqual([[{"label": "postgres1", "type": "iconWithText"}, {"label": "sql_implementation_info", "type": "text"}, {"label": "0 features.WranglerNewUI.OnGoingDataExplorations.labels.recipeSteps", "type": "text"}, {"label": 63.32000000000001, "percentageSymbol": "%", "subText": "features.WranglerNewUI.OnGoingDataExplorations.labels.nullValues", "type": "percentageWithText"}, {"workspaceId": "0cbc0f7b-c554-4bbb-ad3a-74fe147dfe3b"}, {"icon": undefined, "label": "", "type": "icon"}, {"count": 1}]]);
  });
});
