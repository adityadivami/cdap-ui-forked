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

import { PARSE_OPTIONS } from './parseOptions';

export const FRAGMENT_OPTIONS = [
  {
    value: 'parse',
    label: 'Parse',
    options: PARSE_OPTIONS,
    supported_dataType: ['all'],
  },
  {
    value: 'extract',
    label: 'Extract',
    options: [
      {
        value: 'using-patterns',
        label: 'Using Patterns',
        supported_dataType: ['string'],
      },
      {
        value: 'using-delimiters',
        label: 'Using Delimiters',
        supported_dataType: ['all'],
      },
      {
        value: 'using-positions',
        label: 'Using Positions',
        supported_dataType: ['all'],
      },
    ],
    supported_dataType: ['all'],
  },
  {
    value: 'explode',
    label: 'Explode',
    options: [
      {
        value: 'delimited-text',
        label: 'Delimited Text',
        supported_dataType: ['all'],
      },
      {
        value: 'array-flattening',
        label: 'Array By Flattening',
        supported_dataType: ['all'],
      },
      {
        value: 'record-flattening',
        label: 'Record By Flattening',
        supported_dataType: ['all'],
      },
    ],
    supported_dataType: ['all'],
  },
];
