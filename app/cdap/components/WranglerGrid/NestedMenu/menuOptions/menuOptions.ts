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

import { DATATYPE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/datatypeOptions';
import { TOOLBAR_ICONS_LABEL_ALL_PREFIX } from 'components/WranglerGrid/TransformationToolbar/constants';
import T from 'i18n-react';
import { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';

export const PREFIX = 'features.WranglerNewUI.GridPage.transformations.options.labels';

export const MENU_OPTIONS: IMenuItem[] = [
  {
    value: 'changeDatatype',
    label: T.translate(`${PREFIX}.menu.changeDatatype`).toString(),
    options: DATATYPE_OPTIONS,
    supportedDataType: [TOOLBAR_ICONS_LABEL_ALL_PREFIX],
  },
  {
    value: 'set-character-encoding',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.setCharacterEncoding'
    ).toString(),
    options: [
      {
        value: 'character-encoding-utf8',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.UTF8'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-8'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
      {
        value: 'character-encoding-utf16',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.UTF16'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
      {
        value: 'character-encoding-us-ascii',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.USASCII'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'us-ascii'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
      {
        value: 'character-encoding-iso-8859-1',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.ISO88591'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'iso-8859-1'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
      {
        value: 'character-encoding-utf16-be',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.UTF16BE'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16be'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
      {
        value: 'character-encoding-utf16-le',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.setCharacterEncodingOptions.UTF16LE'
        ).toString(),
        supportedDataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16le'`,
        infoLink:
          'https://cdap.atlassian.net/wiki/spaces/DOCS/pages/382107924/Set+Charset+directive',
      },
    ],
    supportedDataType: ['byte'],
  },
];
