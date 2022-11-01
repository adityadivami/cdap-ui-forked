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

import { IParseOptions } from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import T from 'i18n-react';

export const PARSE_CSV_OPTIONS: IParseOptions[] = [
  {
    value: 'comma',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.comma'
    ).toString()}`,
    directiveExpression: ',',
  },
  {
    value: 'tab',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.tab'
    ).toString()}`,
    directiveExpression: '\\t',
  },
  {
    value: 'space',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.space'
    ).toString()}`,
    directiveExpression: ' ',
  },
  {
    value: 'pipe',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.pipe'
    ).toString()}`,
    directiveExpression: '\\|',
  },
  {
    value: 'capA',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.capA'
    ).toString()}`,
    directiveExpression: '\\u0001',
  },
  {
    value: 'capD',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.capD'
    ).toString()}`,
    directiveExpression: '\\u0004',
  },
  {
    value: 'customDelimiter',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.csv.options.customDelimiter'
    ).toString()}`,
  },
];

export const PARSE_LOG_OPTIONS: IParseOptions[] = [
  {
    value: 'common',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.common'
    ).toString()}`,
  },
  {
    value: 'combined',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.combined'
    ).toString()}`,
  },
  {
    value: 'combinedio',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.combinedio'
    ).toString()}`,
  },
  {
    value: 'referer',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.referer'
    ).toString()}`,
  },
  {
    value: 'agent',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.agent'
    ).toString()}`,
  },
  {
    value: 'custom',
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.log.options.custom'
    ).toString()}`,
  },
];

export const PARSE_SIMPLE_DATE_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.MMddyyyy'
    ).toString()}`,
    value: 'MM/dd/yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.ddMMyyyy'
    ).toString()}`,
    value: 'dd/MM/yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.MMddyyyyFormat'
    ).toString()}`,
    value: 'MM-dd-yyyy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.MMddyy'
    ).toString()}`,
    value: 'MM-dd-yy',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.yyyyMMdd'
    ).toString()}`,
    value: 'yyyy-MM-dd',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.yyyyMMddHHmmss'
    ).toString()}`,
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.MMddyyyyatHHmmssz'
    ).toString()}`,
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.ddMMyyHHmmss'
    ).toString()}`,
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.yyyyMMddTHHmmssSSSWithRFCTimezone'
    ).toString()}`,
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.MMddyyyyHHmmssSSS'
    ).toString()}`,
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.EEEdMMMyyyyHHmmss'
    ).toString()}`,
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.EEEMMMdyy'
    ).toString()}`,
    value: "EEE, MMM d, ''yy",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.hmma'
    ).toString()}`,
    value: 'h:mm a',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.simpleDate.options.Hmmaz'
    ).toString()}`,
    value: 'H:mm a, z',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.customFormat'
    ).toString()}`,
    value: 'customFormat',
  },
];

export const PARSE_DATE_TIME_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.yyyyMMddHHmmss'
    ).toString()}`,
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.dateTime.options.MMddyyyyAtHHmmssWithTimezone'
    ).toString()}`,
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.ddMMyyHHmmss'
    ).toString()}`,
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.yyyyMMddTHHmmssSSSWithRFCTimezone'
    ).toString()}`,
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.MMddyyyyHHmmssSSS'
    ).toString()}`,
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.EEEdMMMyyyyHHmmss'
    ).toString()}`,
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.common.customFormat'
    ).toString()}`,
    value: 'customFormat',
  },
];

export const PARSE_EXCEL_OPTIONS: IParseOptions[] = [
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.excel.options.sheetNumber'
    ).toString()}`,
    value: 'sheetNumber',
  },
  {
    label: `${T.translate(
      'features.WranglerNewUI.Transformations.Parse.options.excel.options.sheetName'
    ).toString()}`,
    value: 'sheetName',
  },
];
