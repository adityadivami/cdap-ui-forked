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
    value: 'mask-data',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.security.maskData'
    ),
    options: [
      {
        value: 'last-4',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.last4'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'last-2',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.last2'
        ),
        supported_dataType: ['string'],
      },
      {
        value: 'numbers',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.customSelection'
        ),
        supported_dataType: ['string'],
      },
      { value: 'divider' },
      {
        value: 'shuffle',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.shuffle'
        ),
        supported_dataType: ['string'],
      },
    ],
    supported_dataType: ['string'],
  },
  {
    value: 'encode',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.security.encode'
    ),
    options: [
      {
        value: 'encode-base64',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.encodeBase64'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'encode-base32',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.encodeBase32'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'encode-hex',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.encodeHex'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'encode-url',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.encodeUrl'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
    ],
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'decode',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.security.decode'
    ),
    options: [
      {
        value: 'decode-base64',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.decodeBase64'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'decode-base32',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.decodeBase32'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'decode-hex',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.decodeHex'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
      {
        value: 'decode-url',
        label: T.translate(
          'features.WranglerNewUI.GridPage.transformations.options.labels.security.decodeUrl'
        ),
        supported_dataType: [
          T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all'),
        ],
      },
    ],
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'hash',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.security.hash'
    ),
    supported_dataType: ['string'],
  },
];
