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

import { IMenuOption, ITransformationValues } from 'components/AddTransformation/types';
import { PARSE_CSV_OPTIONS } from 'components/GridTable/components/DirectiveComponents/options';

export const PARSE_OPTIONS: IMenuOption[] = [
  {
    value: 'parseCSV',
    label: 'CSV',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) => {
      return `parse-as-csv :${selectedColumn} '${
        transformationValues.radioOption === 'customDelimiter'
          ? transformationValues.customInput
          : PARSE_CSV_OPTIONS.find(
              (eachOption) => eachOption.value === transformationValues.radioOption
            )?.directiveExpression
      }' ${transformationValues.firstRowAsHeader}`;
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
    directive: (selectedColumn: string, transformationValues: ITransformationValues) =>
      `parse-as-excel :${selectedColumn} '${transformationValues.sheetValue}' ${transformationValues.firstRowAsHeader}`,
  },
  {
    value: 'parseJSON',
    label: 'JSON',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) =>
      `parse-as-json :${selectedColumn} ${transformationValues.depth}`,
  },
  {
    value: 'parseXML',
    label: 'XML to JSON',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) =>
      `parse-xml-to-json :${selectedColumn} ${transformationValues.depth}`,
  },
  {
    value: 'parseLog',
    label: 'Log',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) => {
      return `parse-as-log :${selectedColumn} '${
        transformationValues.radioOption === 'custom'
          ? transformationValues.customInput
          : transformationValues.radioOption
      }'`;
    },
  },
  {
    value: 'parseSimpleDate',
    label: 'Simple Date',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) => {
      return `parse-as-simple-date  :${selectedColumn} ${
        transformationValues.radioOption === 'customFormat'
          ? transformationValues.customInput
          : transformationValues.radioOption
      }`;
    },
  },
  {
    value: 'parseDateTime',
    label: 'Datetime',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) => {
      return `parse-as-datetime  :${selectedColumn} \"${
        transformationValues.radioOption === 'customFormat'
          ? transformationValues.customInput
          : transformationValues.radioOption
      }\"`;
    },
  },
  {
    value: 'parseFixedLength',
    label: 'Fixed Length',
    supported_dataType: ['all'],
    directive: (selectedColumn: string, transformationValues: ITransformationValues) =>
      `parse-as-fixed-length :${selectedColumn} ${transformationValues.columnWidths} ${transformationValues.optionPaddingParam}`,
  },
  {
    value: 'parseHL7',
    label: 'HL7',
    supported_dataType: ['all'],
    directive: (selectedColumn: string) => `parse-as-hl7 :${selectedColumn}`,
  },
];
