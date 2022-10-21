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
import T from 'i18n-react';

export const FRAGMENT_OPTIONS = [
  {
    value: 'parse',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.parse'
    ),
    options: PARSE_OPTIONS,
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'extract',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.extract'
    ),
    options: [
      {
        value: 'using-patterns',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.usingPatterns'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'using-delimiters',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.usingDelimiters'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'using-positions',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.usingPositions'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
    ],
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'explode',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.explode'
    ),
    options: [
      {
        value: 'delimited-text',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.delimitedText'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'array-flattening',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.arrayByFlattening'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'record-flattening',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.fragment.recordByFlattening'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
    ],
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
];
