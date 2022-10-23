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
import { IDirectiveComponentValues, IHeaderNamesList } from './types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponents: IDirectiveComponentValues,
  selectedColumns: IHeaderNamesList[]
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName == 'delete') {
    return prepareDirectiveForMultipleDelete(selectedColumns);
  } else if (functionName == 'keep') {
    return prepareDirectiveForMultipleKeep(selectedColumns);
  } else if (functionName == 'copyColumn') {
    return `copy :${columnSelected} :${directiveComponents.copyColumnName} true`;
  } else {
    return null;
  }
};

export const prepareDirectiveForMultipleDelete = (columnList: IHeaderNamesList[]) => {
  let initial_value = 'drop :';
  columnList.forEach((item, index) => {
    if (index > 0) {
      initial_value += `,:${item.label}`;
    } else {
      initial_value += `${item.label}`;
    }
  });
  return initial_value;
};

export const prepareDirectiveForMultipleKeep = (columnList: IHeaderNamesList[]) => {
  let initial_value = 'keep :';
  columnList.forEach((item, index) => {
    if (index > 0) {
      initial_value += `,:${item.label}`;
    } else {
      initial_value += `${item.label}`;
    }
  });
  return initial_value;
};
