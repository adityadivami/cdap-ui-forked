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
