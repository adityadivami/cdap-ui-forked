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
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseAvro',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseAvro'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseExcel',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseExcel'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseJSON',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseJSON'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseXML',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseXML'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseLog',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseLog'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseSimpleDate',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseSimpleDate'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseDateTime',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseDateTime'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseFixedLength',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseFixedLength'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'parseHL7',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.parse.parseHL7'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
];
