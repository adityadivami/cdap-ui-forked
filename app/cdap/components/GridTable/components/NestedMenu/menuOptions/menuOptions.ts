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

import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import T from 'i18n-react';

export const MENU_OPTIONS = [
  {
    value: 'changeDatatype',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.changeDatatype'
    ).toString(),
    options: DATATYPE_OPTIONS,
    supported_dataType: [
      T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all').toString(),
    ],
  },
  {
    value: 'customTransform',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.customTransform'
    ).toString(),
    options: [],
    supported_dataType: [
      T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all').toString(),
    ],
  },
];
