/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

export const OPTIONS_MAP = [
  {
    label: 'value is empty',
    value: 'EMPTY',
  },
  {
    label: 'value is',
    value: 'TEXTEXACTLY',
  },
  {
    label: 'value contains',
    value: 'TEXTCONTAINS',
  },
  {
    label: 'value starts with',
    value: 'TEXTSTARTSWITH',
  },
  {
    label: 'value ends with',
    value: 'TEXTENDSWITH',
  },
  {
    label: 'value contains regex',
    value: 'TEXTREGEX',
  },
  {
    label: 'custom condition',
    value: 'CUSTOMCONDITION',
  },
];

export const DIRECTIVES_MAP = {
  KEEP: {
    EMPTY: 'filter-rows-on condition-false',
    TEXTEXACTLY: 'filter-rows-on regex-not-match',
    TEXTCONTAINS: 'filter-rows-on regex-not-match',
    TEXTSTARTSWITH: 'filter-rows-on condition-false',
    TEXTENDSWITH: 'filter-rows-on condition-false',
    TEXTREGEX: 'filter-rows-on regex-not-match',
    CUSTOMCONDITION: 'filter-rows-on condition-false',
  },
  REMOVE: {
    EMPTY: 'filter-rows-on condition-true',
    TEXTEXACTLY: 'filter-rows-on regex-match',
    TEXTCONTAINS: 'filter-rows-on regex-match',
    TEXTSTARTSWITH: 'filter-rows-on condition-true',
    TEXTENDSWITH: 'filter-rows-on condition-true',
    TEXTREGEX: 'filter-rows-on regex-match',
    CUSTOMCONDITION: 'filter-rows-on condition-true',
  },
};
