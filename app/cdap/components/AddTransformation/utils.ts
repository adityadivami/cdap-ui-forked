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
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';
import { ITransformationComponentValues } from 'components/AddTransformation/types';
export const getDirective = (
  functionName: string,
  columnSelected: string,
  directiveComponentValues: ITransformationComponentValues
) => {
  if (DATATYPE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    return `set-type :${columnSelected} ${functionName}`;
  } else if (CALCULATE_OPTIONS.some((eachOption) => eachOption.value === functionName)) {
    const calculateOption = CALCULATE_OPTIONS.filter(
      (eachOption) => eachOption.value === functionName
    );
    if (calculateOption.length) {
      const value = calculateOption[0]?.directive(
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

export const prepareDirectiveForCalculate = (
  functionName: string,
  selectedColumn: string,
  copyToNew: boolean,
  newColumnName: string,
  inputDigit: string | number
) => {
  let directive: string = '';
  switch (functionName) {
    case 'ADD':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} + ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} + ${inputDigit}`;
      break;
    case 'SUBTRACT':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} - ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} - ${inputDigit}`;
      break;
    case 'MULTIPLY':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} * ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} * ${inputDigit}`;
      break;
    case 'DIVIDE':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} / ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} / ${inputDigit}`;
      break;
    case 'MOD':
      directive = copyToNew
        ? `set-column :${newColumnName} ${selectedColumn} % ${inputDigit}`
        : `set-column :${selectedColumn} ${selectedColumn} % ${inputDigit}`;
      break;
    case 'POWEROF':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, ${inputDigit})`;
      break;
    case 'SQUARE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, 2)`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, 2)`;
      break;
    case 'SQUARE_ROOT':
      directive = copyToNew
        ? `set-column :${newColumnName} math:sqrt(${selectedColumn})`
        : `set-column :${selectedColumn} math:sqrt(${selectedColumn})`;
      break;
    case 'CUBE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:pow(${selectedColumn}, 3)`
        : `set-column :${selectedColumn} math:pow(${selectedColumn}, 3)`;
      break;
    case 'CUBE_ROOT':
      directive = copyToNew
        ? `set-column :${newColumnName} math:cbrt(${selectedColumn})`
        : `set-column :${selectedColumn} math:cbrt(${selectedColumn})`;
      break;
    case 'DECIMALADD':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:add(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:add(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALSUBTRACT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:subtract(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:subtract(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALMULTIPLY':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:multiply(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:multiply(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALDIVIDEQ':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:divideq(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:divideq(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALDIVIDER':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:divider(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:divider(${selectedColumn}, ${inputDigit})`;
      break;
    case 'LOG':
      directive = copyToNew
        ? `set-column :${newColumnName} math:log10(${selectedColumn})`
        : `set-column :${selectedColumn} math:log10(${selectedColumn})`;
      break;
    case 'NATURALLOG':
      directive = copyToNew
        ? `set-column :${newColumnName} math:log(${selectedColumn})`
        : `set-column :${selectedColumn} math:log(${selectedColumn})`;
      break;
    case 'ABSVALUE':
      directive = copyToNew
        ? `set-column :${newColumnName} math:abs(${selectedColumn})`
        : `set-column :${selectedColumn} math:abs(${selectedColumn})`;
      break;
    case 'CEIL':
      directive = copyToNew
        ? `set-column :${newColumnName} math:ceil(${selectedColumn})`
        : `set-column :${selectedColumn} math:ceil(${selectedColumn})`;
      break;
    case 'FLOOR':
      directive = copyToNew
        ? `set-column :${newColumnName} math:floor(${selectedColumn})`
        : `set-column :${selectedColumn} math:floor(${selectedColumn})`;
      break;
    case 'SIN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:sin(${selectedColumn})`
        : `set-column :${selectedColumn} math:sin(${selectedColumn})`;
      break;
    case 'COS':
      directive = copyToNew
        ? `set-column :${newColumnName} math:cos(${selectedColumn})`
        : `set-column :${selectedColumn} math:cos(${selectedColumn})`;
      break;
    case 'TAN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:tan(${selectedColumn})`
        : `set-column :${selectedColumn} math:tan(${selectedColumn})`;
      break;

    case 'ARCSIN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:asin(${selectedColumn})`
        : `set-column :${selectedColumn} math:asin(${selectedColumn})`;
      break;
    case 'ARCCOS':
      directive = copyToNew
        ? `set-column :${newColumnName} math:acos(${selectedColumn})`
        : `set-column :${selectedColumn} math:acos(${selectedColumn})`;
      break;
    case 'ARCTAN':
      directive = copyToNew
        ? `set-column :${newColumnName} math:atan(${selectedColumn})`
        : `set-column :${selectedColumn} math:atan(${selectedColumn})`;
      break;

    case 'ROUND':
      directive = copyToNew
        ? `set-column :${newColumnName} math:round(${selectedColumn})`
        : `set-column :${selectedColumn} math:round(${selectedColumn})`;
      break;
    case 'RANDOM':
      directive = copyToNew
        ? `set-column :${newColumnName} math:random()`
        : `set-column :${selectedColumn} math:random()`;
      break;

    case 'CHARCOUNT':
      directive = `set-column :${newColumnName} string:length(${selectedColumn})`;
      break;

    case 'PRECISION':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:precision(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:precision(${selectedColumn})`;
      break;
    case 'SCALE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:scale(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:scale(${selectedColumn})`;
      break;
    case 'UNSCALED':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:unscaled(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:unscaled(${selectedColumn})`;
      break;
    case 'DECIMALLEFT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:decimal_left(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:decimal_left(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALRIGHT':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:decimal_right(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:decimal_right(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALPOWEROF':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, ${inputDigit})`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, ${inputDigit})`;
      break;
    case 'DECIMALABSVALUE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:abs(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:abs(${selectedColumn})`;
      break;
    case 'DECIMALSQUARE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, 2)`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, 2)`;
      break;
    case 'DECIMALCUBE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:pow(${selectedColumn}, 3)`
        : `set-column :${selectedColumn} decimal:pow(${selectedColumn}, 3)`;
      break;
    case 'NEGATE':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:negate(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:negate(${selectedColumn})`;
      break;
    case 'STRIPZERO':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:strip_zero(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:strip_zero(${selectedColumn})`;
      break;
    case 'SIGN':
      directive = copyToNew
        ? `set-column :${newColumnName} decimal:sign(${selectedColumn})`
        : `set-column :${selectedColumn} decimal:sign(${selectedColumn})`;
      break;
  }
  return directive;
};
