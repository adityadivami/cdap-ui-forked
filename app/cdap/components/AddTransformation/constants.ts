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

import { IMultipleSelectedFunctionDetail } from 'components/AddTransformation/types';
export const multipleColumnSelected: IMultipleSelectedFunctionDetail[] = [
  {
    value: 'join-columns',
    isMoreThanTwo: false,
  },
  {
    value: 'swap-columns',
    isMoreThanTwo: false,
  },
  {
    value: 'delete',
    isMoreThanTwo: true,
  },
  {
    value: 'array-flattening',
    isMoreThanTwo: true,
  },
  {
    value: 'record-flattening',
    isMoreThanTwo: true,
  },
  {
    value: 'keep',
    isMoreThanTwo: true,
  },
  {
    value: 'boolean',
    isMoreThanTwo: true,
  },
  {
    value: 'string',
    isMoreThanTwo: false,
  },
];

export const SELECT_COLUMN_LIST_PREFIX = 'features.WranglerNewUI.GridPage.selectColumnListPanel';
export const ADD_TRANSFORMATION_PREFIX = 'features.WranglerNewUI.GridPage.addTransformationPanel';
