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

export const OTHER_OPTIONS = [
  {
    value: 'define-variable',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.other.defineVariable'
    ),
    supported_dataType: ['all'],
  },
  {
    value: 'set-counter',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.other.setCounter'
    ),
    supported_dataType: ['all'],
  },
  {
    value: 'send-to-error',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.other.sendToError'
    ),
    supported_dataType: ['all'],
  },
  {
    value: 'customTransform',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.other.customTransform'
    ),
    supported_dataType: ['all'],
  },
  {
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.other.characterCount'
    ),
    value: 'CHARCOUNT',
    sign: null,
    inputRequired: true,
    component: 'Calculate',
    supported_dataType: ['string'],
  },
];
