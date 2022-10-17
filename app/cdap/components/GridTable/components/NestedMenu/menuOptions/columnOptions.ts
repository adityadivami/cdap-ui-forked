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

export const COLUMN_OPTIONS = [
  {
    value: 'copyColumn',
    label: 'Copy column',
    supported_dataType: ['all'],
  },
  {
    value: 'delete',
    label: 'Delete column',
    supported_dataType: ['all'],
  },
  {
    value: 'keep',
    label: 'Keep column',
    supported_dataType: ['all'],
  },
  {
    value: 'rename-column',
    label: 'Rename',
    supported_dataType: ['all'],
  },
  {
    value: 'join-columns',
    label: 'Join two column',
    supported_dataType: ['all'],
  },
  {
    value: 'swap-columns',
    label: 'Swap two column names',
    supported_dataType: ['all'],
  },
];
