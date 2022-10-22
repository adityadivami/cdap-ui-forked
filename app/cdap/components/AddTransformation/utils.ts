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
import { PARSE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/parseOptions';
import { DATATYPE_OPTIONS } from '../GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { IDirectiveComponentValues } from './types';
export const getDirective = (functionName: string, columnSelected: string, directiveComponentValues: IDirectiveComponentValues) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'parseHL7') {
    return `parse-as-hl7 :${columnSelected}`;
  } else if (functionName === 'parseAvro') {
    return `parse-as-avro-file :${columnSelected}`;
  } else if(PARSE_OPTIONS.some((item) => item.value === functionName)) {
    const value = parseDirective(functionName, columnSelected, directiveComponentValues.radioOption, directiveComponentValues.customInput, directiveComponentValues.firstRowAsHeader, directiveComponentValues.columnWidths,
      directiveComponentValues.optionPaddingParam)
    return value;
  } else {
    return null;
  }
};

export const parseDirective = (
  functionName,
  column,
  radioOption,
  inputValue,
  booleanValue,
  columnWidth?,
  optionPadding?
) => {
  let directive;
  if (functionName === 'parseCSV') {
    switch (radioOption) {
      case 'comma':
        directive = `parse-as-csv :${column} ',' ${booleanValue}`;
        break;
      case 'tab':
        directive = `parse-as-csv :${column} '\\t' ${booleanValue}`;
        break;
      case 'space':
        directive = `parse-as-csv :${column} ' ' ${booleanValue}`;
        break;
      case 'pipe':
        directive = `parse-as-csv :${column} '\\|' ${booleanValue}`;
        break;
      case 'capA':
        directive = `parse-as-csv :${column} '\\u0001' ${booleanValue}`;
        break;
      case 'capD':
        directive = `parse-as-csv :${column} '\\u0004' ${booleanValue}`;
        break;
      case 'customDelimiter':
        directive = `parse-as-csv :${column} '${inputValue}' ${booleanValue}`;
        break;
    }
    return directive;
  } else if (functionName === 'parseExcel') {
    return `parse-as-excel :${column} '${inputValue}' ${booleanValue}`;
  } else if (functionName === 'parseJSON') {
    return `parse-as-json :${column} ${inputValue}`;
  } else if (functionName === 'parseXML') {
    return `parse-xml-to-json :${column} ${inputValue}`;
  } else if (functionName === 'parseLog') {
    if (radioOption === 'custom') {
      return `parse-as-log :${column} '${inputValue}'`;
    } else {
      return `parse-as-log :${column} '${radioOption}'`;
    }
  } else if (functionName === 'parseSimpleDate') {
    if (radioOption === 'customFormat') {
      return `parse-as-simple-date  :${column} ${inputValue}`;
    } else {
      return `parse-as-simple-date  :${column} ${radioOption}`;
    }
  } else if (functionName === 'parseDateTime') {
    if (radioOption === 'customFormat') {
      return `parse-as-datetime  :${column} \"${inputValue}\"`;
    } else {
      return `parse-as-datetime  :${column} \"${radioOption}\"`;
    }
  } else if (functionName === 'parseFixedLength') {
    return `parse-as-fixed-length :${column} ${columnWidth} ${optionPadding}`;
  }
};
