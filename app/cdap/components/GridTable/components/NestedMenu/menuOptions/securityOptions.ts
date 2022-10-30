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
import T from 'i18n-react';

export const SECURITY_OPTIONS = [
  {
    value: 'encode',
    label: `${T.translate('features.WranglerNewSecurityOptions.encode').toString()}`,
    options: [
      {
        value: 'encode-base64',
        label: `${T.translate('features.WranglerNewSecurityOptions.base64').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `encode base64 :${columnSelected}`,
      },
      {
        value: 'encode-base32',
        label: `${T.translate('features.WranglerNewSecurityOptions.base32').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `encode base32 :${columnSelected}`,
      },
      {
        value: 'encode-hex',
        label: `${T.translate('features.WranglerNewSecurityOptions.hex').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `encode hex :${columnSelected}`,
      },
      {
        value: 'encode-url',
        label: `${T.translate('features.WranglerNewSecurityOptions.url').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `url-encode :${columnSelected}`,
      },
    ],
    supported_dataType: ['all'],
  },
  {
    value: 'decode',
    label: `${T.translate('features.WranglerNewSecurityOptions.decode').toString()}`,
    options: [
      {
        value: 'decode-base64',
        label: `${T.translate('features.WranglerNewSecurityOptions.base64').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `decode base64 :${columnSelected}`,
      },
      {
        value: 'decode-base32',
        label: `${T.translate('features.WranglerNewSecurityOptions.base32').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `decode base32 :${columnSelected}`,
      },
      {
        value: 'decode-hex',
        label: `${T.translate('features.WranglerNewSecurityOptions.hex').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `decode hex :${columnSelected}`,
      },
      {
        value: 'decode-url',
        label: `${T.translate('features.WranglerNewSecurityOptions.url').toString()}`,
        supported_dataType: ['all'],
        directive: (columnSelected: string) => `url-decode :${columnSelected}`,
      },
    ],
    supported_dataType: ['all'],
  },
];
