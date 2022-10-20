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

export const NULL_MISSING_OPTIONS = [
  {
    value: 'heading',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.remove'
    ),
  },
  {
    value: 'remove-null-missing',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.missingAndNull'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'remove-missing',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.onlyMissing'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'remove-null',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.onlyNull'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'divider',
  },
  {
    value: 'heading',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.replace'
    ),
  },
  {
    value: 'replace-null-missing',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.missingAndNull'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'replace-missing',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.onlyMissing'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
  {
    value: 'replace-null',
    label: T.translate(
      'features.WranglerNewUI.GridPage.transformations.options.labels.nullMissing.onlyNull'
    ),
    supported_dataType: [T.translate('features.WranglerNewUI.GridPage.toolbarIcons.labels.all')],
  },
];
