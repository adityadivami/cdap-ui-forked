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

import { IExecuteAPIResponse, IRecords } from 'components/GridTable/types';
import T from 'i18n-react';
import { element } from 'prop-types';

const PREFIX = 'features.NewWranglerUI.GridTable';

/**
 *
 * @description This function takes API response of execute api and object containing detail about null, non-null or
 * empty values and returns the count of Missing/Null values
 * @param {IExecuteAPIResponse} gridData This is the execute API Response
 * @param {nonNullValue} nonNullValue This the extracted object with respect to column from execute API Response
 * @returns {number} This is the calculated count of missing/null value
 */

export const convertNonNullPercent = (
  gridData: IExecuteAPIResponse | undefined,
  key,
  nonNullValue
) => {
  const lengthOfData: number = gridData?.values?.length || 0;
  let nullValueCount: number = 0;
  if (lengthOfData) {
    nullValueCount =
      (((nonNullValue?.null || 0) + (nonNullValue?.empty || 0)) / 100) * lengthOfData || 0;
  }
  return nullValueCount.toFixed(0);
};

/**
 *
 * @description This function takes API response of execute api and key(header column key) and finds out which item
 * in a column appears maximum times, and returns an object containing value and the number of time it is present
 * @param {IExecuteAPIResponse} gridData This is the execute API Response
 * @param {string} key This is the name of column header
 * @returns {name: string, count: number} Return value, object containing name of most frequently occurred value with its count
 */

export const checkFrequentlyOccuredValues = (
  gridData: IExecuteAPIResponse | undefined,
  key: string
) => {
  if (gridData?.values && Array.isArray(gridData?.values)) {
    const valueOfKey = gridData?.values?.map((el) => el[key]);
    let mostFrequentItem: number = 1;
    let mostFrequentItemCount: number = 0;
    let mostFrequentItemValue: string = '';
    const mostFrequentDataItem = {
      name: '',
      count: 0,
    };
    if (Array.isArray(valueOfKey) && valueOfKey?.length) {
      valueOfKey.map((item, index) => {
        valueOfKey.map((value, valueIndex) => {
          if (item == value) {
            mostFrequentItemCount++;
          }
          if (mostFrequentItem < mostFrequentItemCount) {
            mostFrequentItem = mostFrequentItemCount;
            mostFrequentItemValue = item as string;
          }
        });
        mostFrequentItemCount = 0;
        mostFrequentItemValue = (mostFrequentItemValue == ''
          ? item
          : mostFrequentItemValue) as string;
      });
    }
    mostFrequentDataItem.name = mostFrequentItemValue;
    mostFrequentDataItem.count = mostFrequentItemCount;
    return mostFrequentDataItem;
  }
  return { name: 'No Data Found', count: 0 };
};

/**
 * @description This function takes column name , rowsDataList and calculate the distinct values in the Column .
 * @param  {IRecords} values , this is the rowDataList .
 * @param  {string}  , this is the column Name .
 * @returns {distinctCount : number } Return number of distinct values
 */

export const calculateDistinctValues = (values: IRecords[], columnName: string) => {
  const arrayOfColumn =
    Array.isArray(values) && values?.length && values.map((el) => el[columnName]);
  const arr = [...arrayOfColumn];
  let distinctCount: number = 0;

  arr.forEach((element, index) => {
    if (arr.indexOf(element) === index && element !== undefined) {
      distinctCount += 1;
    }
  });

  return distinctCount;
};

/**
 * @description This function takes column name , rowsDataList and calculate the minimum and maximum character Count in the Column .
 * @param  {IRecords} values , this is the rowDataList .
 * @param  {string}  , this is the column Name .
 * @returns {min : number || max : number } Return minimum and maximum character Count .
 */

export const characterCount = (values: IRecords[], columnName: string) => {
  let minCount = 0;
  let maxCount = 0;
  const arrayOfColumn =
    Array.isArray(values) && values?.length && values.map((el) => el[columnName]);

  Array.isArray(arrayOfColumn) &&
    arrayOfColumn?.length &&
    arrayOfColumn.map((element) => {
      if (element !== undefined) {
        if (element !== undefined && element.length < minCount) {
          minCount = element.length;
        } else if (element !== undefined && element.length > maxCount) {
          maxCount = element.length;
        }
      }
    });
  return { min: minCount || 0, max: maxCount || 0 };
};

/**
 * @description This function takes column name , rowsDataList and checks for column container letter , trailing spaces , number ,leading space
 * @param  {IRecords} values , this is the rowDataList .
 * @param  {string}  , this is the column Name .
 * @returns {returnValue : string } Returns a string which describe the column having letter or number or leading , trailing spaces.
 */

export const checkAlphaNumericAndSpaces = (values: IRecords[], columnName: string) => {
  const arrayOfColumn =
    Array.isArray(values) && values?.length && values.map((el) => el[columnName]);
  let containNumber = false;
  let containLetter = false;
  let containLeadingSpace = false;
  let containTrailingSpace = false;
  let returnValue = '';

  arrayOfColumn.forEach((element) => {
    if (!containNumber) {
      containNumber = isNumber(element);
    }
    if (!containLetter) {
      containLetter = isLetter(element);
    }
    if (!containLeadingSpace) {
      containLeadingSpace = isLeadingSpace(element);
    }
    if (!containTrailingSpace) {
      containTrailingSpace = isTrailingSpace(element);
    }
  });

  if (containNumber && containLetter && containLeadingSpace && containTrailingSpace) {
    returnValue = T.translate(`${PREFIX}.containsLetterNumberLeadingTrailingSpaces`).toString();
  } else if (containLetter && containLeadingSpace && containTrailingSpace) {
    returnValue = T.translate(`${PREFIX}.containsLetterLeadingTrailing`).toString();
  } else if (containLetter && containLeadingSpace) {
    returnValue = T.translate(`${PREFIX}.containsLetterLeading`).toString();
  } else if (containLetter && containTrailingSpace) {
    returnValue = T.translate(`${PREFIX}.containsLetterTrailing`).toString();
  } else if (containLetter && containNumber) {
    returnValue = T.translate(`${PREFIX}.containsLetterNumber`).toString();
  } else if (containLetter) {
    returnValue = T.translate(`${PREFIX}.containsLetterOnly`).toString();
  } else if (containNumber) {
    returnValue = T.translate(`${PREFIX}.containsNumberOnly`).toString();
  }

  return returnValue;
};

/* Checks whether a string is number*/
const isNumber = (str: string) => {
  return /^\d+$/.test(str);
};

/*Checks whether a string has leading space */
const isLeadingSpace = (str: string) => {
  return /^\s+/.test(str);
};

/*Checks whether a string has trailing space */
const isTrailingSpace = (str: string) => {
  return /[\s]+$/.test(str);
};

/* Checks whether a string has letter */
const isLetter = (str: string) => {
  return /[a-z]/.test(str);
};

/**
 * @description This function takes column name , rowsDataList and calculate Distribution Graph Data
 * @param  {IRecords} values , this is the rowDataList .
 * @param  {string}  , this is the column Name .
 * @returns  TODO:
 */

export const calculateDistributionGraphData = (values: IRecords[], columnName: string) => {
  const arrayOfColumn =
    Array.isArray(values) && values?.length && values.map((el) => el[columnName]);
  const map = {};
  for (let i = 0; i < arrayOfColumn.length; i++) {
    map[arrayOfColumn[i]] = (map[arrayOfColumn[i]] || 0) + 1;
  }
  return Object.keys(map)
    .sort(function(a, b) {
      return map[b] - map[a];
    })
    .map((key) => {
      return { text: key, value: map[key] };
    });
};
