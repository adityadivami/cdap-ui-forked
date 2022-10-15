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
import Calculate from '../../DirectiveComponents/Calculate';
import { NUMBER_TYPES, NATIVE_NUMBER_TYPES } from 'services/global-constants';

export const DATATYPE_OPTIONS = [
  {
    value: 'string',
    label: 'string',
    supported_dataType: ['all'],
  },
  {
    value: 'boolean',
    label: 'boolean',
    supported_dataType: ['all'],
  },
  {
    value: 'integer',
    label: 'integer',
    supported_dataType: ['all'],
  },
  {
    value: 'long',
    label: 'long',
    supported_dataType: ['all'],
  },
  {
    value: 'short',
    label: 'short',
    supported_dataType: ['all'],
  },
  {
    value: 'float',
    label: 'float',
    supported_dataType: ['all'],
  },
  {
    value: 'double',
    label: 'double',
    supported_dataType: ['all'],
  },
  {
    value: 'decimal',
    label: 'decimal',
    supported_dataType: ['all'],
  },
  {
    value: 'bytes',
    label: 'bytes',
    supported_dataType: ['all'],
  },
];

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

export const CALCULATE_OPTIONS = [
  {
    label: 'Character count',
    value: 'CHARCOUNT',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['string'],
  },
  {
    label: 'Add',
    value: 'ADD',
    sign: '+',
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Subtract',
    value: 'SUBTRACT',
    sign: '-',
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Multiply',
    value: 'MULTIPLY',
    sign: 'x',
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Divide',
    value: 'DIVIDE',
    sign: '/',
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Modulo',
    value: 'MOD',
    sign: '%',
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Power of',
    value: 'POWEROF',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Square',
    value: 'SQUARE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Square root',
    value: 'SQUARE_ROOT',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Cube',
    value: 'CUBE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Cube root',
    value: 'CUBE_ROOT',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'log',
    value: 'LOG',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Natural log',
    value: 'NATURALLOG',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Absolute value',
    value: 'ABSVALUE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Ceil',
    value: 'CEIL',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Floor',
    value: 'FLOOR',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Sin',
    value: 'SIN',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Cos',
    value: 'COS',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Tan',
    value: 'TAN',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'ARCSIN',
    value: 'ARCSIN',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'ARCCOS',
    value: 'ARCCOS',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'ARCTAN',
    value: 'ARCTAN',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Round',
    value: 'ROUND',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Random',
    value: 'RANDOM',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: NATIVE_NUMBER_TYPES,
  },
  {
    label: 'Decimal Add',
    value: 'DECIMALADD',
    sign: '+',
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal Subtract',
    value: 'DECIMALSUBTRACT',
    sign: '-',
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal Multiply',
    value: 'DECIMALMULTIPLY',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal Divide',
    value: 'DECIMALDIVIDEQ',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal Divider',
    value: 'DECIMALDIVIDER',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Precision',
    value: 'PRECISION',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Scale',
    value: 'SCALE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Unscaled',
    value: 'UNSCALED',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal left',
    value: 'DECIMALLEFT',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal right',
    value: 'DECIMALRIGHT',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal power of',
    value: 'DECIMALPOWEROF',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal absolute value',
    value: 'DECIMALABSVALUE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal square',
    value: 'DECIMALSQUARE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Decimal cube',
    value: 'DECIMALCUBE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Negate',
    value: 'NEGATE',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Strip zero',
    value: 'STRIPZERO',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
  {
    label: 'Sign',
    value: 'SIGN',
    sign: null,
    inputRequired: false,
    component: Calculate,
    supported_dataType: ['bigdecimal'],
  },
];

export const MENU_OPTIONS = [
  // {
  //   value: 'parse',
  //   label: 'Parse',
  //   options: PARSE_OPTIONS,
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'divider',
  // },
  {
    value: 'changeDatatype',
    label: 'Change data type',
    options: DATATYPE_OPTIONS,
    supported_dataType: ['all'],
  },
  {
    value: 'set-character-encoding',
    label: 'Set character encoding',
    options: [
      {
        value: 'character-encoding-utf8',
        label: 'UTF-8',
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16',
        label: 'UTF-16',
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-us-ascii',
        label: 'US-ASCII',
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-iso-8859-1',
        label: 'ISO-8859-1',
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16-be',
        label: 'UTF-16BE',
        supported_dataType: ['byte'],
      },
      {
        value: 'character-encoding-utf16-le',
        label: 'UTF-16LE',
        supported_dataType: ['byte'],
      },
    ],
    supported_dataType: ['byte'],
  },
  // {
  //   value: 'divider',
  // },
  {
    value: 'text',
    label: 'Format',
    options: [
      {
        value: 'uppercase',
        label: 'UPPERCASE',
        supported_dataType: ['string'],
      },
      {
        value: 'lowercase',
        label: 'Lowercase',
        supported_dataType: ['string'],
      },
      {
        value: 'titlecase',
        label: 'Title Case',
        supported_dataType: ['string'],
      },
      {
        value: 'concatenate',
        label: 'Concatenate',
        supported_dataType: ['string'],
      },
      { value: 'trim', label: 'White spaces', supported_dataType: ['string'] },
      {
        value: 'ltrim',
        label: 'Leading white spaces',
        supported_dataType: ['string'],
      },
      {
        value: 'rtrim',
        label: 'Trailing White spaces',
        supported_dataType: ['string'],
      },
      { value: 'dateTime', label: 'Date time', supported_dataType: ['string'] },
      {
        value: 'dateTimeAsString',
        label: 'Date time as string',
        supported_dataType: ['string'],
      },
    ],
    supported_dataType: ['string'],
  },
  // {
  //   value: 'calculate',
  //   label: 'Calculate',
  //   options: CALCULATE_OPTIONS,
  //   supported_dataType: NUMBER_TYPES.concat(['string']),
  // },
  {
    value: 'customTransform',
    label: 'Custom Transform',
    supported_dataType: ['all'],
  },
  // {
  //   value: 'divider',
  // },
  {
    value: 'filter',
    label: 'Filter',
    supported_dataType: ['all'],
  },
  // {
  //   value: 'send-to-error',
  //   label: 'Send to error',
  //   supported_dataType: ['all'],
  // },
  {
    value: 'findAndReplace',
    label: 'Find and Replace',
    supported_dataType: ['all'],
  },
  // {
  //   value: 'fillNullOrEmpty',
  //   label: 'Fill null or empty',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'divider',
  // },
  // {
  //   value: 'copyColumn',
  //   label: 'Copy column',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'delete',
  //   label: 'Delete column',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'keep',
  //   label: 'Keep column',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'divider',
  // },
  // {
  //   value: 'extract',
  //   label: 'Extract',
  //   options: [
  //     { value: 'using-patterns', label: 'Using Patterns', supported_dataType: ['string'] },
  //     { value: 'using-delimiters', label: 'Using Delimiters', supported_dataType: ['all'] },
  //     { value: 'using-positions', label: 'Using Positions', supported_dataType: ['all'] },
  //   ],
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'explode',
  //   label: 'Explode',
  //   options: [
  //     { value: 'delimited-text', label: 'Delimited Text', supported_dataType: ['all'] },
  //     { value: 'array-flattening', label: 'Array By Flattening', supported_dataType: ['all'] },
  //     { value: 'record-flattening', label: 'Record By Flattening', supported_dataType: ['all'] },
  //   ],
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'define-variable',
  //   label: 'Define variable',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'set-counter',
  //   label: 'Set counter',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'divider',
  // },
  // {
  //   value: 'join-columns',
  //   label: 'Join columns',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'swap-columns',
  //   label: 'Swap columns',
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'divider',
  // },
  // {
  //   value: 'mask-data',
  //   label: 'Mask Data',
  //   options: [
  //     { value: 'last-4', label: 'Show last 4 characters only', supported_dataType: ['string'] },
  //     { value: 'last-2', label: 'Show last 2 characters only', supported_dataType: ['string'] },
  //     { value: 'custom-selection', label: 'Custom Selection', supported_dataType: ['string'] },
  //     { value: 'divider' },
  //     { value: 'shuffle', label: 'By Shuffling', supported_dataType: ['string'] },
  //   ],
  //   supported_dataType: ['string'],
  // },
  // {
  //   value: 'encode',
  //   label: 'Encode',
  //   options: [
  //     { value: 'encode-base64', label: 'Base64', supported_dataType: ['all'] },
  //     { value: 'encode-base32', label: 'Base32', supported_dataType: ['all'] },
  //     { value: 'encode-hex', label: 'Hex', supported_dataType: ['all'] },
  //     { value: 'encode-url', label: 'URL', supported_dataType: ['all'] },
  //   ],
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'decode',
  //   label: 'Decode',
  //   options: [
  //     { value: 'decode-base64', label: 'Base64', supported_dataType: ['all'] },
  //     { value: 'decode-base32', label: 'Base32', supported_dataType: ['all'] },
  //     { value: 'decode-hex', label: 'Hex', supported_dataType: ['all'] },
  //     { value: 'decode-url', label: 'URL', supported_dataType: ['all'] },
  //   ],
  //   supported_dataType: ['all'],
  // },
  // {
  //   value: 'hash',
  //   label: 'Hash',
  //   supported_dataType: ['string'],
  // },
];

export const NULL_MISSING_OPTIONS = [
  {
    value: 'heading',
    label: 'Remove',
  },
  {
    value: 'remove-null-missing',
    label: 'Missing and null',
    supported_dataType: ['all'],
  },
  {
    value: 'remove-missing',
    label: 'Only missing',
    supported_dataType: ['all'],
  },
  {
    value: 'remove-null',
    label: 'Only null',
    supported_dataType: ['all'],
  },
  {
    value: 'divider',
  },
  {
    value: 'heading',
    label: 'Replace',
  },
  {
    value: 'replace-null-missing',
    label: 'Missing and null',
    supported_dataType: ['all'],
  },
  {
    value: 'replace-missing',
    label: 'Only missing',
    supported_dataType: ['all'],
  },
  {
    value: 'replace-null',
    label: 'Only null',
    supported_dataType: ['all'],
  },
];

export const INVALID_ICON_OPTIONS = [
  {
    value: 'remove-invalid',
    label: 'Remove invalid',
    supported_dataType: ['all'],
  },
  {
    value: 'replace-invalid',
    label: 'Replace invalid',
    supported_dataType: ['all'],
  },
];

export const COLUMN_OPTIONS = [
  {
    value: 'copyColumn',
    label: 'Copy column',
    supported_dataType: ['all'],
  },
  {
    value: 'delete',
    label: 'Delete column',
    supported_dataType: ['all'],
  },
  {
    value: 'keep',
    label: 'Keep column',
    supported_dataType: ['all'],
  },
  {
    value: 'rename-column',
    label: 'Rename',
    supported_dataType: ['all'],
  },
  {
    value: 'join-columns',
    label: 'Join two column',
    supported_dataType: ['all'],
  },
  {
    value: 'swap-columns',
    label: 'Swap two column names',
    supported_dataType: ['all'],
  },
];

export const FRAGMENT_OPTIONS = [
  {
    value: 'parse',
    label: 'Parse',
    options: PARSE_OPTIONS,
    supported_dataType: ['all'],
  },
  {
    value: 'extract',
    label: 'Extract',
    options: [
      {
        value: 'using-patterns',
        label: 'Using Patterns',
        supported_dataType: ['string'],
      },
      {
        value: 'using-delimiters',
        label: 'Using Delimiters',
        supported_dataType: ['all'],
      },
      {
        value: 'using-positions',
        label: 'Using Positions',
        supported_dataType: ['all'],
      },
    ],
    supported_dataType: ['all'],
  },
  {
    value: 'explode',
    label: 'Explode',
    options: [
      {
        value: 'delimited-text',
        label: 'Delimited Text',
        supported_dataType: ['all'],
      },
      {
        value: 'array-flattening',
        label: 'Array By Flattening',
        supported_dataType: ['all'],
      },
      {
        value: 'record-flattening',
        label: 'Record By Flattening',
        supported_dataType: ['all'],
      },
    ],
    supported_dataType: ['all'],
  },
];

export const MATH_OPTIONS = [
  {
    value: 'algebra',
    label: 'Algebra',
    options: [
      {
        label: 'Add',
        value: 'ADD',
        sign: '+',
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Subtract',
        value: 'SUBTRACT',
        sign: '-',
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Multiply',
        value: 'MULTIPLY',
        sign: 'x',
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Divide',
        value: 'DIVIDE',
        sign: '/',
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Modulo',
        value: 'MOD',
        sign: '%',
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Power of',
        value: 'POWEROF',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Square',
        value: 'SQUARE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Square root',
        value: 'SQUARE_ROOT',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Cube',
        value: 'CUBE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Cube root',
        value: 'CUBE_ROOT',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'log',
        value: 'LOG',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Natural log',
        value: 'NATURALLOG',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Absolute value',
        value: 'ABSVALUE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Ceil',
        value: 'CEIL',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Floor',
        value: 'FLOOR',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'trigonometry',
    label: 'Trigonometry',
    options: [
      {
        label: 'Sin',
        value: 'SIN',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Cos',
        value: 'COS',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'Tan',
        value: 'TAN',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'ARCSIN',
        value: 'ARCSIN',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'ARCCOS',
        value: 'ARCCOS',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
      {
        label: 'ARCTAN',
        value: 'ARCTAN',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'random',
    label: 'Random',
    options: [
      {
        label: 'Random',
        value: 'RANDOM',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: NATIVE_NUMBER_TYPES,
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
  {
    value: 'decimal',
    label: 'DECIMAL',
    options: [
      {
        label: 'Decimal Add',
        value: 'DECIMALADD',
        sign: '+',
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal Subtract',
        value: 'DECIMALSUBTRACT',
        sign: '-',
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal Multiply',
        value: 'DECIMALMULTIPLY',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal Divide',
        value: 'DECIMALDIVIDEQ',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal Divider',
        value: 'DECIMALDIVIDER',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Precision',
        value: 'PRECISION',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Scale',
        value: 'SCALE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Unscaled',
        value: 'UNSCALED',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal left',
        value: 'DECIMALLEFT',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal right',
        value: 'DECIMALRIGHT',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal power of',
        value: 'DECIMALPOWEROF',
        sign: null,
        inputRequired: true,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal absolute value',
        value: 'DECIMALABSVALUE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal square',
        value: 'DECIMALSQUARE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Decimal cube',
        value: 'DECIMALCUBE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Negate',
        value: 'NEGATE',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Strip zero',
        value: 'STRIPZERO',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
      {
        label: 'Sign',
        value: 'SIGN',
        sign: null,
        inputRequired: false,
        component: Calculate,
        supported_dataType: ['bigdecimal'],
      },
    ],
    supported_dataType: NUMBER_TYPES,
  },
];

export const SECURITY_OPTIONS = [
  {
    value: 'mask-data',
    label: 'Mask Data',
    options: [
      {
        value: 'last-4',
        label: 'Show last 4 characters only',
        supported_dataType: ['string'],
      },
      {
        value: 'last-2',
        label: 'Show last 2 characters only',
        supported_dataType: ['string'],
      },
      {
        value: 'numbers',
        label: 'Custom Selection',
        supported_dataType: ['string'],
      },
      { value: 'divider' },
      {
        value: 'shuffle',
        label: 'By Shuffling',
        supported_dataType: ['string'],
      },
    ],
    supported_dataType: ['string'],
  },
  {
    value: 'encode',
    label: 'Encode',
    options: [
      { value: 'encode-base64', label: 'Base64', supported_dataType: ['all'] },
      { value: 'encode-base32', label: 'Base32', supported_dataType: ['all'] },
      { value: 'encode-hex', label: 'Hex', supported_dataType: ['all'] },
      { value: 'encode-url', label: 'URL', supported_dataType: ['all'] },
    ],
    supported_dataType: ['all'],
  },
  {
    value: 'decode',
    label: 'Decode',
    options: [
      { value: 'decode-base64', label: 'Base64', supported_dataType: ['all'] },
      { value: 'decode-base32', label: 'Base32', supported_dataType: ['all'] },
      { value: 'decode-hex', label: 'Hex', supported_dataType: ['all'] },
      { value: 'decode-url', label: 'URL', supported_dataType: ['all'] },
    ],
    supported_dataType: ['all'],
  },
  {
    value: 'hash',
    label: 'Hash',
    supported_dataType: ['string'],
  },
];

export const OTHER_OPTIONS = [
  {
    value: 'define-variable',
    label: 'Define variable',
    supported_dataType: ['all'],
  },
  {
    value: 'set-counter',
    label: 'Set counter',
    supported_dataType: ['all'],
  },
  {
    value: 'send-to-error',
    label: 'Send to error',
    supported_dataType: ['all'],
  },
  {
    value: 'customTransform',
    label: 'Custom Transform',
    supported_dataType: ['all'],
  },
  {
    label: 'Character count',
    value: 'CHARCOUNT',
    sign: null,
    inputRequired: true,
    component: Calculate,
    supported_dataType: ['string'],
  },
];

export const KEBAB_GRID_PAGE_OPTION = [
  {
    label: 'Ingest Data',
    value: 'ingest-data',
    supported_dataType: ['all'],
  },
  {
    label: 'View Schema',
    value: 'view-schema',
    supported_dataType: ['all'],
  },
];
