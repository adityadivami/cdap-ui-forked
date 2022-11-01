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
import { IDirectiveComponentValues, IMenuOption } from 'components/AddTransformation/types';
import { DATATYPE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/datatypeOptions';
import { FORMAT_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/formatOptions';

export const getDirective = (
  functionName: string,
  selectedColumn: string,
  directiveComponentValues: IDirectiveComponentValues
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${selectedColumn} ${functionName}`;
  } else if (FORMAT_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    const option: IMenuOption = FORMAT_OPTIONS.find(
      (eachOption) => eachOption.value === functionName
    );
    return option.directive(selectedColumn, directiveComponentValues);
  } else {
    return null;
  }
};
