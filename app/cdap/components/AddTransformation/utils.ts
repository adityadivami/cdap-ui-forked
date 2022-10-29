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
  } else if (functionName === 'define-variable') {
    const directive = prepareDirectiveForDefineVariable(
      directiveComponentValues.variableName,
      directiveComponentValues.customInput,
      directiveComponentValues.selectedColumnForDefineVariable,
      directiveComponentValues.filterCondition,
      columnSelected
    );
    return directive;
  } else {
    return null;
  }
};

export const prepareDirectiveForDefineVariable = (
  variableValue: string,
  customInput: string,
  selectedColumnForDefineVariable: string,
  selectedAction: string,
  columnSelected: string
) => {
  const condition = 'set-variable';
  const column = columnSelected;
  const textValue = customInput;
  const variableName = variableValue;
  const selectedColumn = selectedColumnForDefineVariable;
  let directive;
  const selectedCondition = selectedAction;
  if (!textValue || !variableName) {
    return;
  }

  switch (selectedCondition) {
    case 'TEXTSTARTSWITH':
      directive = `${condition} ${variableName} ${column} =^ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTENDSWITH':
      directive = `${condition} ${variableName} ${column} =$ "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTEXACTLY':
      directive = `${condition} ${variableName} ${column} == "${textValue}" ? ${selectedColumn} : ${variableName}`;
      break;
    case 'TEXTREGEX':
      directive = `${condition} ${variableName} ${column} =~ ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
    case 'CUSTOMCONDITION':
      directive = `${condition} ${variableName} ${textValue} ? ${selectedColumn} : ${variableName}`;
      break;
  }
  return directive;
};
