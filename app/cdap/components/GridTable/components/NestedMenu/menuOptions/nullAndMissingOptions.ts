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
