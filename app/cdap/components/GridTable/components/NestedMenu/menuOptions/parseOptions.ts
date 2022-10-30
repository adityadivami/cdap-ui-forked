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

import { IDirectiveComponentValues } from 'components/AddTransformation/types';
import { PARSE_CSV_OPTIONS } from '../../DirectiveComponents/options';

export const PARSE_OPTIONS = [
  {
    value: 'parseCSV',
    label: 'CSV',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `parse-as-csv :${selectedColumn} '${
        directiveComponentValues.radioOption === 'customDelimiter'
          ? directiveComponentValues.customInput
          : PARSE_CSV_OPTIONS.find(
              (eachOption) => eachOption.value === directiveComponentValues.radioOption
            )?.directiveExpression
      }' ${directiveComponentValues.firstRowAsHeader}`;
    },
  },
  {
    value: 'parseAvro',
    label: 'Avro',
    supported_dataType: ['all'],
    directive: (selectedColumn: string) => `parse-as-avro-file :${selectedColumn}`,
  },
  {
    value: 'parseExcel',
    label: 'Excel',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) =>
      `parse-as-excel :${selectedColumn} '${directiveComponentValues.sheetValue}' ${directiveComponentValues.firstRowAsHeader}`,
  },
  {
    value: 'parseJSON',
    label: 'JSON',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) =>
      `parse-as-json :${selectedColumn} ${directiveComponentValues.depth}`,
  },
  {
    value: 'parseXML',
    label: 'XML to JSON',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) =>
      `parse-xml-to-json :${selectedColumn} ${directiveComponentValues.depth}`,
  },
  {
    value: 'parseLog',
    label: 'Log',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `parse-as-log :${selectedColumn} '${
        directiveComponentValues.radioOption === 'custom'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption
      }'`;
    },
  },
  {
    value: 'parseSimpleDate',
    label: 'Simple Date',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `parse-as-simple-date  :${selectedColumn} ${
        directiveComponentValues.radioOption === 'customFormat'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption
      }`;
    },
  },
  {
    value: 'parseDateTime',
    label: 'Datetime',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) => {
      return `parse-as-datetime  :${selectedColumn} \"${
        directiveComponentValues.radioOption === 'customFormat'
          ? directiveComponentValues.customInput
          : directiveComponentValues.radioOption
      }\"`;
    },
  },
  {
    value: 'parseFixedLength',
    label: 'Fixed Length',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, directiveComponentValues: IDirectiveComponentValues) =>
      `parse-as-fixed-length :${selectedColumn} ${directiveComponentValues.columnWidths} ${directiveComponentValues.optionPaddingParam}`,
  },
  {
    value: 'parseHL7',
    label: 'HL7',
    supported_dataType: ['all'],
    directive: (selectedColumn: string) => `parse-as-hl7 :${selectedColumn}`,
  },
];
