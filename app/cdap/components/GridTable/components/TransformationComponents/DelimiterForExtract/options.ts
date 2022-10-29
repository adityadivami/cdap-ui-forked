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

export const DELIMITER_OPTION_EXPLODE_EXTRACT = [
  {
    value: ',',
    label: `${T.translate('features.DirectiveUIComponent.extract.extractDelimiterOptions.comma')}`,
  },
  {
    value: '\\t',
    label: `${T.translate('features.DirectiveUIComponent.extract.extractDelimiterOptions.tab')}`,
  },
  {
    value: '\\s+',
    label: `${T.translate(
      'features.DirectiveUIComponent.extract.extractDelimiterOptions.whitespace'
    )}`,
  },
  {
    value: '\\|',
    label: `${T.translate('features.DirectiveUIComponent.extract.extractDelimiterOptions.pipe')}`,
  },
  {
    value: 'customDelimiter',
    label: `${T.translate(
      'features.DirectiveUIComponent.extract.extractDelimiterOptions.customDelimiter'
    )}`,
  },
];
