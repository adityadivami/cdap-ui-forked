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
import { DATATYPE_OPTIONS } from '../GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { CALCULATE_OPTIONS } from '../GridTable/components/NestedMenu/menuOptions/calculateOptions';
import { ITransformationComponentValues } from './types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (CALCULATE_OPTIONS.some((item) => item.value === functionName)) {
    const option = CALCULATE_OPTIONS.filter((el) => el.value === functionName);
    if (option.length) {
      const value = option[0]?.directive(
        columnSelected,
        directiveComponentValues.customInput,
        directiveComponentValues.copyColumnName,
        directiveComponentValues.copyToNewColumn
      );
      return value;
    }
  } else {
    return null;
  }
};
