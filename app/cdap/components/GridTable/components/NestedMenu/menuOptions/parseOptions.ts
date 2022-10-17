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

export const PARSE_OPTIONS = [
  {
    value: 'parseCSV',
    label: 'CSV',
    supported_dataType: ['all'],
  },
  {
    value: 'parseAvro',
    label: 'Avro',
    supported_dataType: ['all'],
  },
  {
    value: 'parseExcel',
    label: 'Excel',
    supported_dataType: ['all'],
  },
  {
    value: 'parseJSON',
    label: 'JSON',
    supported_dataType: ['all'],
  },
  {
    value: 'parseXML',
    label: 'XML to JSON',
    supported_dataType: ['all'],
  },
  {
    value: 'parseLog',
    label: 'Log',
    supported_dataType: ['all'],
  },
  {
    value: 'parseSimpleDate',
    label: 'Simple Date',
    supported_dataType: ['all'],
  },
  {
    value: 'parseDateTime',
    label: 'Datetime',
    supported_dataType: ['all'],
  },
  {
    value: 'parseFixedLength',
    label: 'Fixed Length',
    supported_dataType: ['all'],
  },
  {
    value: 'parseHL7',
    label: 'HL7',
    supported_dataType: ['all'],
  },
];
