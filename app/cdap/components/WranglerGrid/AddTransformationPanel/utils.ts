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
import { ITransformationComponentValues } from 'components/WranglerGrid/AddTransformationPanel/types';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';

export const getDirective = (
  functionName: string,
  selectedColumnName: string,
  transformationComponentValues: ITransformationComponentValues,
  selectedColumns: IHeaderNamesList[]
) => {
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${selectedColumnName} ${functionName}`;
  } else if (functionName === 'delimited-text') {
    return transformationComponentValues.radioOption === 'customDelimiter'
      ? `split-to-rows :${selectedColumnName} ${transformationComponentValues.customInput}`
      : `split-to-rows :${selectedColumnName} ${transformationComponentValues.radioOption}`;
  } else if (functionName === 'array-flattening') {
    const transformationSyntax = getDirectiveForKeepOrDrop('flatten', selectedColumns);
    return transformationSyntax;
  } else if (functionName === 'record-flattening') {
    const transformationSyntax = getDirectiveForKeepOrDrop('flatten-record', selectedColumns);
    return transformationSyntax;
  } else {
    return null;
  }
};

const getDirectiveForKeepOrDrop = (functionName: string, columnList: IHeaderNamesList[]) => {
  let initialValue = `${functionName} :`;
  columnList.forEach((item, index) => {
    if (index > 0) {
      initialValue += `,:${item.label}`;
    } else {
      initialValue += `${item.label}`;
    }
  });
  return initialValue;
};
