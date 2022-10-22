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
import { IDirectiveComponentValues } from './types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: IDirectiveComponentValues
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'uppercase') {
    return `uppercase :${columnSelected}`;
  } else if (functionName === 'lowercase') {
    return `lowercase :${columnSelected}`;
  } else if (functionName === 'titlecase') {
    return `titlecase :${columnSelected}`;
  } else if (functionName === 'ltrim') {
    return `ltrim :${columnSelected}`;
  } else if (functionName === 'rtrim') {
    return `rtrim :${columnSelected}`;
  } else if (functionName === 'trim') {
    return `trim :${columnSelected}`;
  } else if (functionName === 'concatenate') {
    if (directiveComponentValues.copyToNewColumn) {
      const value =
        directiveComponentValues.radioOption === 'END'
          ? `${columnSelected} + '${directiveComponentValues.customInput}'`
          : `'${directiveComponentValues.customInput}' + ${columnSelected}`;
      return `set-column :${directiveComponentValues.copyColumnName} ${value}`;
    } else {
      const value =
        directiveComponentValues.radioOption === 'END'
          ? `${columnSelected} + '${directiveComponentValues.customInput}'`
          : `'${directiveComponentValues.customInput}' + ${columnSelected}`;
      return `set-column :${columnSelected} ${value}`;
    }
  } else if (functionName == 'dateTime') {
    return `format-date :${columnSelected} ${
      directiveComponentValues.radioOption === 'customFormat'
        ? directiveComponentValues.customInput
        : directiveComponentValues.radioOption
    }`;
  } else if (functionName == 'dateTimeAsString') {
    return `format-datetime :${columnSelected} ${
      directiveComponentValues.radioOption === 'customFormat'
        ? directiveComponentValues.customInput
        : directiveComponentValues.radioOption
    }`;
  } else {
    return null;
  }
};
