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

const PREFIX =
  'features.WranglerNewUI.GridPage.transformationUI.defineVariable.defineVariableOptions';
import T from 'i18n-react';

export const DEFINE_VARIABLE_OPTIONS = [
  {
    label: T.translate(`${PREFIX}.valueIs`).toString(),
    value: 'TEXTEXACTLY',
  },
  {
    label: T.translate(`${PREFIX}.valuevalueStartsWith`).toString(),
    value: 'TEXTSTARTSWITH',
  },
  {
    label: T.translate(`${PREFIX}.valueEndsWith`).toString(),
    value: 'TEXTENDSWITH',
  },
  {
    label: T.translate(`${PREFIX}.valueContainsRegex`).toString(),
    value: 'TEXTREGEX',
  },
  {
    label: T.translate(`${PREFIX}.customCondition`).toString(),
    value: 'CUSTOMCONDITION',
  },
];

export const FILTER_PLACEHOLDER = {
  EMPTY: '',
  TEXTEXACTLY: 'Enter value',
  TEXTCONTAINS: 'Enter contained value',
  TEXTSTARTSWITH: 'Enter prefix',
  TEXTENDSWITH: 'Enter suffix',
  TEXTREGEX: 'Enter regex',
  CUSTOMCONDITION: 'E.g. < 30 || gender == "Male"',
};
