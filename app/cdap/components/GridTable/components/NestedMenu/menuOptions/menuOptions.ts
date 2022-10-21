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

import { DATATYPE_OPTIONS } from './datatypeOptions';
import T from 'i18n-react';

export const MENU_OPTIONS = [
  {
    value: 'changeDatatype',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.changeDatatype'
    ),
    options: DATATYPE_OPTIONS,
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'set-character-encoding',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.setCharacterEncoding'
    ),
    options: [
      {
        value: 'character-encoding-utf8',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.UTF8'
        ),
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.UTF16'
        ),
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-us-ascii',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.USASCII'
        ),
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-iso-8859-1',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.ISO88591'
        ),
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16-be',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.UTF-16BE'
        ),
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16-le',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.UTF16LE'
        ),
        supported_dataType: ['byte'],
      },
    ],
    supported_dataType: ['byte'],
  },
  {
    value: 'text',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.format'
    ),
    options: [
      {
        value: 'uppercase',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.upperCase'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'lowercase',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.lowerCase'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'titlecase',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.titleCase'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'concatenate',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.concatenate'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'trim',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.whiteSpaces'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'ltrim',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.leadingWhiteSpaces'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'rtrim',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.trailingWhiteSpaces'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'dateTime',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.dateTime'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'dateTimeAsString',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.menu.dateTimeAsString'
        ),
        supported_dataType: ['string'],
      },
    ],
    supported_dataType: ['string'],
  },
  {
    value: 'customTransform',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.customTransform'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'filter',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.filter'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'findAndReplace',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.menu.findAndReplace'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
];
