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

import {
  IHeaderNamesList,
  IMultipleSelectedFunctionDetail,
} from 'components/WranglerGrid/SelectColumnPanel/types';
import { MULTI_SELECTION_COLUMN } from 'components/WranglerGrid/SelectColumnPanel/constants';

/**
 * @param  {string[]} transformationDataType
 * @param  {IHeaderNamesList[]} columnsList
 * @return {string[]} This function is used to return array of datatype the selected transformation/option like uppercase or lowercase supports
 */
export const getColumnsSupportedType = (
  transformationDataType: string[],
  columnsList: IHeaderNamesList[]
) => {
  if(transformationDataType?.length > 0 && transformationDataType?.includes('all')){
    return transformationDataType?.filter((supportedType: string) => supportedType === 'all')
  } else{
    const columnTypeList =  columnsList.filter((columnDetail: IHeaderNamesList) => {
      return transformationDataType?.some((dataTypeCollection: string | string[]) => {
        return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
      });
    });
    return columnTypeList
  }
};

/**
 * @param  {string[]} transformationDataType
 * @param  {IHeaderNamesList[]} columnsList
 * @return {IHeaderNamesList[]} This function is used to return the list of column based on the transformation/option selected
 * For Example ADD, this can be performed on column whose datatype is int/float/double so this function will return only those 
 * columns whose dataype int/float/double
 */
export const getFilteredColumn = (
  transformationDataType: string[],
  columnsList: IHeaderNamesList[]
) => {
  if(transformationDataType?.length > 0 && transformationDataType?.includes('all')){
    return columnsList
  }else {
    const filteredColumnList = columnsList.filter((columnDetail: IHeaderNamesList) => {
      return transformationDataType?.some((dataTypeCollection: string | string[]) => {
        return dataTypeCollection?.includes(columnDetail?.type[0]?.toLowerCase());
      });
    });
    return filteredColumnList
  }
};

/**
 * @param  {string} transformationName
 * @param  {IHeaderNamesList[]} selectedColumns
 * @return {boolean} This function is used to enable done button which can be enabled only when atleast one column is selected
 * In case of join and swap two column needs to be selected while in delete/keep more than two selections are posible
 */
export const enableDoneButton = (transformationName: string, selectedColumns: IHeaderNamesList[]) => {
  if (
    MULTI_SELECTION_COLUMN.findIndex(
      (functionNameDetail: IMultipleSelectedFunctionDetail) =>
        functionNameDetail.value === transformationName && !functionNameDetail.isMoreThanTwo
    ) > -1
  ) {
    return selectedColumns?.length === 2 ? false : true;
  } else if (
    MULTI_SELECTION_COLUMN.findIndex(
      (functionNameDetail: IMultipleSelectedFunctionDetail) =>
        functionNameDetail.value === transformationName && functionNameDetail.isMoreThanTwo
    ) > -1
  ) {
    return selectedColumns?.length >= 1 ? false : true;
  } else {
    return selectedColumns?.length >= 1 ? false : true;
  }
};
