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

import { DATATYPE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/datatypeOptions';
import { CALCULATE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/calculateOptions';
import { ITransformationComponentValues } from 'components/WranglerGrid/AddTransformationPanel/types';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';

export const getDirective = (
  functionName: string,
  selectedColumnName: string,
  transformationComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${selectedColumnName} ${functionName}`;
  } else if (CALCULATE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    const calculateOption = CALCULATE_OPTIONS.filter(
      (eachOption) => eachOption.value === functionName
    );
    if (calculateOption.length) {
      const value = calculateOption[0]?.directive(
        selectedColumnName,
        transformationComponentValues?.customInput,
        transformationComponentValues?.copyColumnName,
        transformationComponentValues?.copyToNewColumn
      );
      return value;
    }
  } else {
    return null;
  }
};

export const applyButtonEnabled = (
  functionName: string,
  transformationComponentValues: ITransformationComponentValues,
  selectedColumns: IHeaderNamesList[]
) => {
  if (CALCULATE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    const calculateOption = CALCULATE_OPTIONS.filter(
      (eachOption) => eachOption.value === functionName
    );
    if (calculateOption[0]?.inputRequired && transformationComponentValues.customInput === '') {
      return true;
    } else if (
      transformationComponentValues.copyToNewColumn &&
      transformationComponentValues.copyColumnName === ''
    ) {
      return true;
    } else if (selectedColumns.length === 0) {
      return true;
    } else {
      return false;
    }
  } else if (selectedColumns.length === 0) {
    return true;
  } else {
    return false;
  }
};
