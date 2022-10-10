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

export const OPTION_WITH_NO_INPUT = [
  'delete',
  'keep',
  'lowercase',
  'uppercase',
  'titlecase',
  'ltrim',
  'rtrim',
  'trim',
  'last-4',
  'last-2',
  'shuffle',
  'encode-base64',
  'encode-base32',
  'encode-hex',
  'encode-url',
  'decode-base64',
  'decode-base32',
  'decode-hex',
  'decode-url',
  'array-flattening',
  'record-flattening',
  'character-encoding-utf8',
  'character-encoding-utf16',
  'character-encoding-us-ascii',
  'character-encoding-iso-8859-1',
  'character-encoding-utf16-be',
  'character-encoding-utf16-le',
  'parseHL7',
  'parseAvro',
  'string',
  'boolean',
  'integer',
  'long',
  'short',
  'float',
  'double',
  'decimal',
  'bytes',
];

export const OPTION_WITH_TWO_INPUT = [
  'delimited-text',
  'using-patterns',
  'using-delimiters',
  'copyColumn',
  'findAndReplace',
  'concatenate',
  'filter',
  'customTransform',
  'define-variable',
  'parseCSV',
  'parseExcel',
  'parseJSON',
  'parseXML',
  'parseLog',
  'parseSimpleDate',
  'parseDateTime',
  'parseFixedLength',
  'hash',
  'send-to-error',
  'set-counter',
  'dateTime',
  'dateTimeAsString',
  'fillNullOrEmpty',
];
