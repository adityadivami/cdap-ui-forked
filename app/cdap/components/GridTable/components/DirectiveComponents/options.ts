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

import { IParseOptions } from './ParseComponents/types';

export const PARSE_CSV_OPTIONS: IParseOptions[] = [
  {
    value: 'comma',
    label: 'Comma',
    directiveExpression: ',',
  },
  {
    value: 'tab',
    label: 'Tab',
    directiveExpression: '\\t',
  },
  {
    value: 'space',
    label: 'Space',
    directiveExpression: ' ',
  },
  {
    value: 'pipe',
    label: 'Pipe',
    directiveExpression: '\\|',
  },
  {
    value: 'capA',
    label: '^A',
    directiveExpression: '\\u0001',
  },
  {
    value: 'capD',
    label: '^D',
    directiveExpression: '\\u0004',
  },
  {
    value: 'customDelimiter',
    label: 'Custom delimiter',
  },
];

export const PARSE_LOG_OPTIONS: IParseOptions[] = [
  {
    value: 'common',
    label: 'Common',
  },
  {
    value: 'combined',
    label: 'Combined',
  },
  {
    value: 'combinedio',
    label: 'Combinedio',
  },
  {
    value: 'referer',
    label: 'Referer',
  },
  {
    value: 'agent',
    label: 'Agent',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
];

export const PARSE_SIMPLE_DATE_OPTIONS: IParseOptions[] = [
  {
    label: 'MM/dd/yyyy',
    value: 'MM/dd/yyyy',
  },
  {
    label: 'dd/MM/yyyy',
    value: 'dd/MM/yyyy',
  },
  {
    label: 'MM-dd-yyyy',
    value: 'MM-dd-yyyy',
  },
  {
    label: 'MM-dd-yy',
    value: 'MM-dd-yy',
  },
  {
    label: 'yyyy-MM-dd',
    value: 'yyyy-MM-dd',
  },
  {
    label: 'yyyy-MM-dd HH:mm:ss',
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: "MM-dd-yyyy 'at' HH:mm:ss z",
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: 'dd/MM/yy HH:mm:ss',
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: 'MM.dd.yyyy HH:mm:ss.SSS',
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: 'EEE, d MMM yyyy HH:mm:ss',
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: "EEE, MMM d, ''yy",
    value: "EEE, MMM d, ''yy",
  },
  {
    label: 'h:mm a',
    value: 'h:mm a',
  },
  {
    label: 'H:mm a, z',
    value: 'H:mm a, z',
  },
  {
    label: 'Custom Format',
    value: 'customFormat',
  },
];

export const PARSE_DATE_TIME_OPTIONS: IParseOptions[] = [
  {
    label: 'yyyy-MM-dd HH:mm:ss',
    value: 'yyyy-MM-dd HH:mm:ss',
  },
  {
    label: "MM-dd-yyyy 'at' HH:mm:ss with timezone",
    value: "MM-dd-yyyy 'at' HH:mm:ss z",
  },
  {
    label: 'dd/MM/yy HH:mm:ss',
    value: 'dd/MM/yy HH:mm:ss',
  },
  {
    label: "yyyy,MM.dd'T'HH:mm:ss.SSS with RFC timezone",
    value: "yyyy,MM.dd'T'HH:mm:ss.SSSZ",
  },
  {
    label: 'MM.dd.yyyy HH:mm:ss.SSS',
    value: 'MM.dd.yyyy HH:mm:ss.SSS',
  },
  {
    label: 'EEE, d MMM yyyy HH:mm:ss',
    value: 'EEE, d MMM yyyy HH:mm:ss',
  },
  {
    label: 'Custom Format',
    value: 'customFormat',
  },
];

export const PARSE_EXCEL_OPTIONS: IParseOptions[] = [
  {
    label: 'Sheet Number',
    value: 'sheetNumber',
  },
  {
    label: 'Sheet Name',
    value: 'sheetName',
  },
];
