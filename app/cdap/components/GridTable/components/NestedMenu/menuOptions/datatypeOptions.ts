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

export const DATATYPE_OPTIONS = [
  {
    value: 'string',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.string'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'boolean',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.boolean'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'integer',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.integer'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'long',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.long'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'short',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.short'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'float',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.float'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'double',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.double'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'decimal',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.decimal'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'bytes',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.datatype.bytes'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
];
