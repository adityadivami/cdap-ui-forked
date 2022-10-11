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

export const MISSING_NULL = 'Missing/Null';
export const CONTAIN_LETTER_NUMBER_LEADING_TRAILING_SPACES =
  'Contains letters, numbers, leading and trailing spaces';
export const CONTAIN_LETTER_NUMBER = 'Contains Letter and Number';
export const CONTAIN_LETTER_LEADING_TRAILING = 'Contains Letter, leading and trailing spaces';
export const CONTAIN_LETTER_LEADING = 'Contains Letter and leading spaces';
export const CONTAIN_LETTER_TRAILING = 'Contains Letter and trailing spaces';
export const CONTAIN_LETTER_ONLY = 'Contains Letter';
export const CONTAIN_NUMBER_ONLY = 'Contains Number';

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
  'remove-null-missing',
  'remove-null',
  'remove-missing',
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
  'ADD',
  'SUBTRACT',
  'MULTIPLY',
  'DIVIDE',
  'MOD',
  'POWEROF',
  'DECIMALADD',
  'DECIMALSUBTRACT',
  'DECIMALMULTIPLY',
  'DECIMALDIVIDEQ',
  'DECIMALDIVIDER',
  'LOG',
  'NATURALLOG',
  'ABSVALUE',
  'CEIL',
  'FLOOR',
  'SIN',
  'COS',
  'TAN',
  'ARCCOS',
  'ARCSIN',
  'ARCTAN',
  'ROUND',
  'RANDOM',
  'CHARCOUNT',
  'PRECISION',
  'SCALE',
  'UNSCALED',
  'DECIMALLEFT',
  'DECIMALRIGHT',
  'DECIMALABSVALUE',
  'DECIMALPOWEROF',
  'DECIMALSQUARE',
  'DECIMALCUBE',
  'NEGATE',
  'STRIPZERO',
  'SIGN',
  'SQUARE',
  'SQUARE_ROOT',
  'CUBE',
  'CUBE_ROOT',
  'custom-selection',
  'using-positions',
  'join-columns',
  'swap-columns',
  'replace-null-missing',
  'rename-column',
];
