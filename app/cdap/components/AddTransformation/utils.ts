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

import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { SEND_TO_ERROR_OPTIONS } from 'components/GridTable/components/TransformationComponents/SendToError/options';
import { ITransformationComponentValues } from 'components/AddTransformation/types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'send-to-error') {
    const option = SEND_TO_ERROR_OPTIONS?.filter(
      (eachOption) => eachOption?.value === directiveComponentValues?.filterOptionSelected
    );
    if (option?.length) {
      const value = option[0].directive(
        'send-to-error',
        columnSelected,
        directiveComponentValues.ignoreCase,
        directiveComponentValues.filterOptionValue,
        directiveComponentValues.filterOptionSelected
      );
      return value;
    }
  } else {
    return null;
  }
};
