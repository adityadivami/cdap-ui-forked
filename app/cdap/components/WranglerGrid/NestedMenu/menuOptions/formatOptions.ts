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

import { ITransformationComponentValues } from 'components/WranglerGrid/AddTransformationPanel/types';
import { IMenuItem } from 'components/WranglerGrid/NestedMenu/MenuItemComponent';
import T from 'i18n-react';

export const FORMAT_OPTIONS: IMenuItem[] = [
  {
    value: 'uppercase',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.uppercase'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `uppercase :${selectedColumn}`,
  },
  {
    value: 'lowercase',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.lowercase'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `lowercase :${selectedColumn}`,
  },
  {
    value: 'titlecase',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.titlecase'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `titlecase :${selectedColumn}`,
  },
  {
    value: 'concatenate',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.concatenate'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (
      selectedColumn: string,
      transformationComponentValues: ITransformationComponentValues
    ) => {
      if (transformationComponentValues.copyToNewColumn) {
        const value =
          transformationComponentValues.radioOption === 'END'
            ? `${selectedColumn} + '${transformationComponentValues.customInput}'`
            : `'${transformationComponentValues.customInput}' + ${selectedColumn}`;
        return `set-column :${transformationComponentValues.copyColumnName} ${value}`;
      } else {
        const value =
          transformationComponentValues.radioOption === 'END'
            ? `${selectedColumn} + '${transformationComponentValues.customInput}'`
            : `'${transformationComponentValues.customInput}' + ${selectedColumn}`;
        return `set-column :${selectedColumn} ${value}`;
      }
    },
  },
  {
    value: 'trim',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.trim'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `trim :${selectedColumn}`,
  },
  {
    value: 'ltrim',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.ltrim'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `ltrim :${selectedColumn}`,
  },
  {
    value: 'rtrim',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.rtrim'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (selectedColumn: string) => `rtrim :${selectedColumn}`,
  },
  {
    value: 'dateTime',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.dateTime'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (
      selectedColumn: string,
      transformationComponentValues: ITransformationComponentValues
    ) => {
      return `format-date :${selectedColumn} ${
        transformationComponentValues.radioOption === 'customFormat'
          ? transformationComponentValues.customInput
          : transformationComponentValues.radioOption
      }`;
    },
  },
  {
    value: 'dateTimeAsString',
    label: `${T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.format.dateTimeAsString'
    ).toString()}`,
    supportedDataType: ['string'],
    directive: (
      selectedColumn: string,
      transformationComponentValues: ITransformationComponentValues
    ) => {
      return `format-datetime :${selectedColumn} ${
        transformationComponentValues.radioOption === 'customFormat'
          ? transformationComponentValues.customInput
          : transformationComponentValues.radioOption
      }`;
    },
  },
];
