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
import {
  IHeaderNamesList,
  IMultipleSelectedFunctionDetail,
  ITransformationComponentValues,
} from 'components/WranglerGrid/AddTransformation/types';
import { CALCULATE_OPTIONS } from 'components/WranglerGrid/NestedMenu/menuOptions/calculateOptions';
import { multipleColumnSelected } from 'components/WranglerGrid/AddTransformation/constants';

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
        transformationComponentValues.customInput,
        transformationComponentValues.copyColumnName,
        transformationComponentValues.copyToNewColumn
      );
      return value;
    }
  } else {
    return null;
  }
};

export const getColumnsSupportedType = (transformationDataType, columnsList) => {
  return transformationDataType?.length > 0 && transformationDataType?.includes('all')
    ? transformationDataType?.filter((supportedType: string) => supportedType === 'all')
    : columnsList?.filter((columnDetail: IHeaderNamesList) => {
        return transformationDataType?.some((dataTypeCollection: string | string[]) => {
          return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
        });
      });
};

export const getFilteredColumn = (transformationDataType, columnsList) => {
  return transformationDataType?.length > 0 && transformationDataType?.includes('all')
    ? columnsList
    : columnsList?.filter((columnDetail: IHeaderNamesList) => {
        return transformationDataType?.some((dataTypeCollection: string | string[]) => {
          return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
        });
      });
};

export const enableDoneButton = (
  transformationName: string,
  selectedColumns: IHeaderNamesList[]
) => {
  if (
    multipleColumnSelected.filter(
      (functionNameDetail: IMultipleSelectedFunctionDetail) =>
        functionNameDetail.value === transformationName && !functionNameDetail.isMoreThanTwo
    )?.length
  ) {
    return selectedColumns?.length === 2 ? false : true;
  } else if (
    multipleColumnSelected.filter(
      (functionNameDetail: IMultipleSelectedFunctionDetail) =>
        functionNameDetail.value === transformationName && functionNameDetail.isMoreThanTwo
    )?.length
  ) {
    return selectedColumns?.length >= 1 ? false : true;
  } else {
    return selectedColumns?.length >= 1 ? false : true;
  }
};
