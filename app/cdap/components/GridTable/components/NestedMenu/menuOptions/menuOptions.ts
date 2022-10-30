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
import { TOOLBAR_ICONS_LABEL_PREFIX } from 'components/GridTable/components/NestedMenu/menuOptions/constants';
import { TOOLBAR_ICONS_LABEL_ALL_PREFIX } from 'components/GridTable/components/TransformationToolbar/constants';
import T from 'i18n-react';

export const MENU_OPTIONS = [
  {
    value: 'changeDatatype',
    label: T.translate(`${TOOLBAR_ICONS_LABEL_PREFIX}.menu.changeDatatype`).toString(),
    options: DATATYPE_OPTIONS,
    supported_dataType: ['all'],
  },
  {
    value: 'set-character-encoding',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.setCharacterEncoding'
    ).toString()}`,
    options: [
      {
        value: 'character-encoding-utf8',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.utf8'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-8'`,
      },
      {
        value: 'character-encoding-utf16',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.utf16'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16'`,
      },
      {
        value: 'character-encoding-us-ascii',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.usascii'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'us-ascii'`,
      },
      {
        value: 'character-encoding-iso-8859-1',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.iso88591'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'iso-8859-1'`,
      },
      {
        value: 'character-encoding-utf16-be',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.utf16be'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16be'`,
      },
      {
        value: 'character-encoding-utf16-le',
        label: `${T.translate(
          'features.WranglerNewUI.Transformations.menuOptions.characterEncoding.utf16le'
        ).toString()}`,
        supported_dataType: ['byte'],
        directive: (selectedColumn: string) => `set-charset :${selectedColumn} 'utf-16le'`,
      },
    ],
    supported_dataType: ['byte'],
  },
];
