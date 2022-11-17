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
    label: 'Set character encoding',
    options: [
      {
        value: 'character-encoding-utf8',
        label: 'UTF-8',
        supported_dataType: ['all'],
      },
      {
        value: 'character-encoding-utf16',
        label: 'UTF-16',
        supported_dataType: ['all'],
      },
      {
        value: 'character-encoding-us-ascii',
        label: 'US-ASCII',
        supported_dataType: ['all'],
      },
      {
        value: 'character-encoding-iso-8859-1',
        label: 'ISO-8859-1',
        supported_dataType: ['all'],
      },
      {
        value: 'character-encoding-utf16-be',
        label: 'UTF-16BE',
        supported_dataType: ['all'],
      },
      {
        value: 'character-encoding-utf16-le',
        label: 'UTF-16LE',
        supported_dataType: ['all'],
      },
    ],
    supported_dataType: ['all'],
  },
  // {
  //   value: 'divider',
  // },
  {
    value: 'text',
    label: 'Format',
    options: [
      {
        value: 'uppercase',
        label: 'UPPERCASE',
        supported_dataType: ['string'],
      },
      {
        value: 'lowercase',
        label: 'Lowercase',
        supported_dataType: ['string'],
      },
      {
        value: 'titlecase',
        label: 'Title Case',
        supported_dataType: ['string'],
      },
      {
        value: 'concatenate',
        label: 'Concatenate',
        supported_dataType: ['string'],
      },
      { value: 'trim', label: 'White spaces', supported_dataType: ['string'] },
      {
        value: 'ltrim',
        label: 'Leading white spaces',
        supported_dataType: ['string'],
      },
      {
        value: 'rtrim',
        label: 'Trailing White spaces',
        supported_dataType: ['string'],
      },
      { value: 'dateTime', label: 'Date time', supported_dataType: ['string'] },
      {
        value: 'dateTimeAsString',
        label: 'Date time as string',
        supported_dataType: ['string'],
      },
    ],
    supported_dataType: ['string'],
  },
  {
    value: 'customTransform',
    label: 'Custom Transform',
    supported_dataType: ['all'],
  },
  {
    value: 'filter',
    label: 'Filter',
    supported_dataType: ['all'],
  },
  {
    value: 'findAndReplace',
    label: 'Find and Replace',
    supported_dataType: ['all'],
  },
];
