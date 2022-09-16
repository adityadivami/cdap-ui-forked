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

export const DATATYPE_OPTIONS = [
  {
    value: 'string',
    label: 'string',
  },
  {
    value: 'boolean',
    label: 'boolean',
  },
  {
    value: 'integer',
    label: 'integer',
  },
  {
    value: 'long',
    label: 'long',
  },
  {
    value: 'short',
    label: 'short',
  },
  {
    value: 'float',
    label: 'float',
  },
  {
    value: 'double',
    label: 'double',
  },
  {
    value: 'decimal',
    label: 'decimal',
  },
  {
    value: 'bytes',
    label: 'bytes',
  },
];

export const MENU_OPTIONS = [
  {
    value: 'changeDatatype',
    label: 'Change data type',
    options: DATATYPE_OPTIONS,
  },
  {
    value: 'setQualifiler',
    label: 'Set qualifier',
  },
  {
    value: 'divider',
  },
  {
    value: 'text',
    label: 'Text',
    options: [
      { value: 'heading', label: 'Remove' },
      { value: 'letters', label: 'Letters' },
      { value: 'numbers', label: 'Numbers' },
      { value: 'specialCharacters', label: 'Special Characters' },
      { value: 'trim', label: 'White spaces' },
      { value: 'ltrim', label: 'Leading white spaces' },
      { value: 'rtrim', label: 'Trailing White spaces' },
      { value: 'divider' },
      { value: 'heading', label: 'Format' },
      { value: 'uppercase', label: 'UPPERCASE' },
      { value: 'lowercase', label: 'Lowercase' },
      { value: 'titlecase', label: 'Title Case' },
      { value: 'concatenate', label: 'Concatenate' },
    ],
  },
  {
    value: 'mask-data',
    label: 'Mask Data',
    options: [
      { value: 'last-4', label: 'Show last 4 characters only' },
      { value: 'last-2', label: 'Show last 2 characters only' },
      { value: 'numbers', label: 'Custom Selection' },
      { value: 'divider' },
      { value: 'shuffle', label: 'By Shuffling' },
    ],
  },
  {
    value: 'encode',
    label: 'Encode',
    options: [
      { value: 'encode-base64', label: 'Base64' },
      { value: 'encode-base32', label: 'Base32' },
      { value: 'encode-hex', label: 'Hex' },
      { value: 'encode-url', label: 'URL' },
    ],
  },
  {
    value: 'decode',
    label: 'Decode',
    options: [
      { value: 'decode-base64', label: 'Base64' },
      { value: 'decode-base32', label: 'Base32' },
      { value: 'decode-hex', label: 'Hex' },
      { value: 'decode-url', label: 'URL' },
    ],
  },
  {
    value: 'extract',
    label: 'Extract',
    options: [
      { value: 'using-patterns', label: 'Using Patterns' },
      { value: 'using-delimiters', label: 'Using Delimiters' },
      { value: 'using-positions', label: 'Using Positions' },
    ],
  },
  {
    value: 'set-character-encoding',
    label: 'Set character encoding',
    options: [
      { value: 'character-encoding-utf8', label: 'UTF-8' },
      { value: 'character-encoding-utf16', label: 'UTF-16' },
      { value: 'character-encoding-us-ascii', label: 'US-ASCII' },
      { value: 'character-encoding-iso-8859-1', label: 'ISO-8859-1' },
      { value: 'character-encoding-utf16-be', label: 'UTF-16BE' },
      { value: 'character-encoding-utf16-le', label: 'UTF-16LE' },
    ],
  },
  {
    value: 'copy-column',
    label: 'Copy column',
  },
  {
    value: 'custom-transform',
    label: 'Custom Transform',
  },
  {
    value: 'define-variable',
    label: 'Set Define Variable',
  },
  {
    value: 'hash',
    label: 'Hash',
  },
  {
    value: 'dateAndTime',
    label: 'Date and Time',
  },
  {
    value: 'findAndReplace',
    label: 'Find and Replace',
  },
  {
    value: 'filter',
    label: 'Filter',
  },
  {
    value: 'send-to-error',
    label: 'Send to Error',
  },
  {
    value: 'delete',
    label: 'Delete column',
  },
  {
    value: 'keep',
    label: 'Keep column',
  },
];
