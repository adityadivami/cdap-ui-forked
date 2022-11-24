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

import T from 'i18n-react';

export const PARSE_OPTIONS = [
  {
    value: 'parseCSV',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseCSV'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseAvro',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseAvro'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseExcel',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseExcel'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseJSON',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseJSON'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseXML',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseXML'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseLog',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseLog'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseSimpleDate',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseSimpleDate'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseDateTime',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseDateTime'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseFixedLength',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseFixedLength'
    ).toString(),
    supportedDataType: ['all'],
  },
  {
    value: 'parseHL7',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseHL7'
    ).toString(),
    supportedDataType: ['all'],
  },
];
