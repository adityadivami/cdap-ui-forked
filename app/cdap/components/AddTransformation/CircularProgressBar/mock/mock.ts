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
import { IStatistics } from 'components/GridTable/types';
export const statistics = {
  feature_id: {
    general: {
      'non-null': 100,
    },
  },
  is_supported: {
    general: {
      'non-null': 100,
    },
    types: {
      Text: 100,
      Boolean: 100,
    },
  },
  comments: {
    general: {
      'non-null': 100,
      empty: 96.36871,
    },
    types: {
      Text: 2.6536312,
    },
  },
  feature_name: {
    general: {
      'non-null': 100,
    },
    types: {
      Text: 71.36871,
    },
  },
  sub_feature_id: {
    general: {
      'non-null': 100,
      empty: 73.463684,
    },
    types: {
      Integer: 26.536312,
    },
  },
  is_verified_by: {
    general: {
      null: 100,
    },
  },
  sub_feature_name: {
    general: {
      'non-null': 100,
      empty: 73.463684,
    },
    types: {
      Integer: 0.2793296,
      Text: 20.111732,
    },
  },
} as IStatistics;

export const columnList = [
  {
    name: 'feature_id',
    label: 'feature_id',
    type: ['String'],
  },
  {
    name: 'feature_name',
    label: 'feature_name',
    type: ['String'],
  },
  {
    name: 'sub_feature_id',
    label: 'sub_feature_id',
    type: ['String'],
  },
  {
    name: 'sub_feature_name',
    label: 'sub_feature_name',
    type: ['String'],
  },
  {
    name: 'is_supported',
    label: 'is_supported',
    type: ['String'],
  },
  {
    name: 'is_verified_by',
    label: 'is_verified_by',
    type: [null],
  },
  {
    name: 'comments',
    label: 'comments',
    type: ['String'],
  },
];
