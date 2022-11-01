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

import ParseCSVComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseCSVComponent';
import ParseDateTimeComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseDateTimeComponent';
import ParseExcelComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseExcelComponent';
import ParseFixedLengthComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseFixedLengthComponent';
import ParseLogComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseLogComponent';
import ParseSimpleDateComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseSimpleDateComponent';
import ParseXMLToJSONComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/ParseXMLToJSONComponent';
import T from 'i18n-react';

export const MISSING_NULL = 'Missing/Null';
export const PLEASE_SELECT_THE_DATE_FORMAT = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.common.pleaseSelectTheDateFormat'
).toString()}`;
export const PARSE_AS_XML_TO_JSON = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.xmlToJSON.heading.parseXMLToJSON'
).toString()}`;
export const DEPTH = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.xmlToJSON.labels.depth'
).toString()}`;
export const DEPTH_PLACEHOLDER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.xmlToJSON.labels.depthPlaceholder'
).toString()}`;
export const PLEASE_SELECT_THE_LOGS_FORMAT = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.log.heading.selectLogsFormat'
).toString()}`;
export const PARSE_AS_FIXED_LENGTH = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.fixedLength.heading.parseAsFixedLength'
).toString()}`;
export const COLUMN_WIDTHS = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.fixedLength.labels.columnWidths'
).toString()}`;
export const PADDING = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.fixedLength.labels.padding'
).toString()}`;
export const COLUMN_WIDTHS_PLACEHOLDER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.fixedLength.labels.columnWidthsPlaceholder'
).toString()}`;
export const PADDING_PLACEHOLDER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.fixedLength.labels.optionalPaddingParameter'
).toString()}`;
export const CHOOSE_SHEET_IN_EXCEL = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.excel.heading.chooseSheetInExcel'
).toString()}`;
export const SHEET_NUMBER_PLACEHOLDER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.excel.heading.sheetNumberPlaceholder'
).toString()}`;
export const SHEET_NAME_PLACEHOLDER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.excel.heading.sheetNamePlaceholder'
).toString()}`;
export const SET_FIRST_ROW_AS_HEADER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.common.setFirstRowAsHeader'
).toString()}`;
export const PLEASE_SELECT_THE_DELIMITER = `${T.translate(
  'features.WranglerNewUI.Transformations.Parse.options.csv.heading.pleaseSelectTheDelimiter'
).toString()}`;
export const CUSTOM_DELIMITER = 'customDelimiter';
export const CUSTOM_FORMAT = 'customFormat';

export const DIRECTIVE_COMPONENTS = [
  {
    type: 'parseCSV',
    component: ParseCSVComponent,
  },
  {
    type: 'parseLog',
    component: ParseLogComponent,
  },
  {
    type: 'parseSimpleDate',
    component: ParseSimpleDateComponent,
  },
  {
    type: 'parseDateTime',
    component: ParseDateTimeComponent,
  },
  {
    type: 'parseFixedLength',
    component: ParseFixedLengthComponent,
  },
  {
    type: 'parseXML',
    component: ParseXMLToJSONComponent,
  },
  {
    type: 'parseJSON',
    component: ParseXMLToJSONComponent,
  },
  {
    type: 'parseExcel',
    component: ParseExcelComponent,
  },
];
