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

import { IDirectiveComponentValues, IMenuOption } from 'components/AddTransformation/types';
import T from 'i18n-react';

export const FORMAT_OPTIONS: IMenuOption[] = [
  {
    value: 'uppercase',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.uppercase'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `uppercase :${selectedColumn}`,
  },
  {
    value: 'lowercase',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.lowercase'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `lowercase :${selectedColumn}`,
  },
  {
    value: 'titlecase',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.titlecase'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `titlecase :${selectedColumn}`,
  },
  {
    value: 'concatenate',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.concatenate.heading'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      if (directiveComponentValues.copyToNewColumn) {
        const value =
          directiveComponentValues.radioOption === 'END'
            ? `${selectedColumn} + '${directiveComponentValues.customInput}'`
            : `'${directiveComponentValues.customInput}' + ${selectedColumn}`;
        return `set-column :${directiveComponentValues.copyColumnName} ${value}`;
      } else {
        const value =
          directiveComponentValues.radioOption === 'END'
            ? `${selectedColumn} + '${directiveComponentValues.customInput}'`
            : `'${directiveComponentValues.customInput}' + ${selectedColumn}`;
        return `set-column :${selectedColumn} ${value}`;
      }
    },
  },
  {
    value: 'trim',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.trim'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `trim :${selectedColumn}`,
  },
  {
    value: 'ltrim',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.ltrim'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `ltrim :${selectedColumn}`,
  },
  {
    value: 'rtrim',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.rtrim'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string) => `rtrim :${selectedColumn}`,
  },
  {
    value: 'dateTime',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.dateTime'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `format-date :${selectedColumn} ${
        directiveComponentValues.radioOption === 'customFormat'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption
      }`;
    },
  },
  {
    value: 'dateTimeAsString',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.format.options.dateTimeAsString'
    ).toString()}`,
    supported_dataType: ['string'], // TODO: As supported_dataType is used in multiple places, we should change it to supportedDataType(camelcase) in transformation toolbox feature
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `format-datetime :${selectedColumn} ${
        directiveComponentValues.radioOption === 'customFormat'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption
      }`;
    },
  },
];
