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
  directiveComponentValues: IDirectiveComponentValues,
  selectedColumns: IHeaderNamesList[]
) => {
  if (DATATYPE_OPTIONS.some((item) => item.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (functionName === 'array-flattening' || functionName === 'record-flattening') {
    return explodeByFlattening(selectedColumns, functionName);
  } else if (functionName === 'delimited-text' || functionName === 'using-delimiters') {
    return `split-to-rows :${columnSelected} ${
      directiveComponentValues.radioOption === 'customDelimiter'
        ? directiveComponentValues.customInput
        : directiveComponentValues.radioOption
    }`;
  } else {
    return null;
  }
};

const explodeByFlattening = (columnsList: IHeaderNamesList[], type: string) => {
  if (columnsList.length) {
    const column = columnsList.map(({ label }) => `:${label}`).join(',');
    let directive;
    if (type === 'array-flattening') {
      directive = `flatten ${column}`;
    } else {
      directive = `flatten-record ${column}`;
    }
    return directive;
  }
};
