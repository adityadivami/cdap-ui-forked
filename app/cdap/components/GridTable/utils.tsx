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
  CONTAIN_LETTER_NUMBER_LEADING_TRAILING_SPACES,
  CONTAIN_LETTER_LEADING_TRAILING,
  CONTAIN_LETTER_LEADING,
  CONTAIN_LETTER_TRAILING,
  CONTAIN_LETTER_NUMBER,
  CONTAIN_LETTER_ONLY,
  CONTAIN_NUMBER_ONLY,
} from 'components/GridTable/constants';
import { IExecuteAPIResponse, IRecords } from 'components/GridTable/types';

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
  if (gridData?.values && gridData && Array.isArray(gridData?.values)) {
    const valueOfKey = gridData?.values?.map((el) => el[key]);
    let mostFrequentItem: number = 1;
    let mostFrequentItemCount: number = 0;
    let mostFrequentItemValue: string = '';
    const mostFrequentDataItem = {
      name: '',
      count: 0,
    };
    if (Array.isArray(valueOfKey) && valueOfKey.length) {
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

export const calculateDistinctValues = (values, columnName) => {
  const arrayOfColumn = values.map((el) => el[columnName]);
  const arr = [...arrayOfColumn];
  let distinctCount: number = 0;

  arr.forEach((element, index) => {
    if (arr.indexOf(element) === index) {
      distinctCount += 1;
    }
  });

  return distinctCount;
};

export const characterCount = (values, columnName) => {
  const arrayOfColumn = values.map((el) => el[columnName]);
  let minCount = 0;
  let maxCount = 0;
  const minElement = arrayOfColumn.reduce((a, b) => {
    if (a || b) {
      minCount = Math.min(a?.length, b?.length);
      if (a?.length == minCount) {
        return a;
      } else {
        return b;
      }
    }
  });
  const maxElement = arrayOfColumn.reduce((a, b) => {
    if (a || b) {
      maxCount = Math.max(a?.length, b?.length);
      if (a?.length == maxCount) {
        return a;
      } else {
        return b;
      }
    }
  });
  return { min: minElement?.length || 0, max: maxElement?.length || 0 };
};

export const checkAlphaNumericAndSpaces = (values, columnName) => {
  const arrayOfColumn = values.map((el) => el[columnName]);
  let containNumber = false;
  let containLetter = false;
  let containLeadingSpace = false;
  let containTrailingSpace = false;
  let returnValue = '';
  arrayOfColumn.forEach((element) => {
    containNumber = isAlphaNumeric(element);
    containLetter = isLetter(element);
    containLeadingSpace = isLeadingSpace(element);
    containTrailingSpace = isTrailingSpace(element);
    if (containNumber && containLetter && containLeadingSpace && containTrailingSpace) {
      returnValue = CONTAIN_LETTER_NUMBER_LEADING_TRAILING_SPACES;
    } else if (containLetter && containLeadingSpace && containTrailingSpace) {
      returnValue = CONTAIN_LETTER_LEADING_TRAILING;
    } else if (containLetter && containLeadingSpace) {
      returnValue = CONTAIN_LETTER_LEADING;
    } else if (containLetter && containTrailingSpace) {
      returnValue = CONTAIN_LETTER_TRAILING;
    } else if (containLetter && containNumber) {
      returnValue = CONTAIN_LETTER_NUMBER;
    } else if (containLetter) {
      returnValue = CONTAIN_LETTER_ONLY;
    } else if (containNumber) {
      returnValue = CONTAIN_NUMBER_ONLY;
    }
  });
  return returnValue;
};

const isAlphaNumeric = (string) => {
  return /\d/.test(string);
};

const isLeadingSpace = (string) => {
  return /^\s*/.test(string);
};

const isTrailingSpace = (string) => {
  return /\s*$/.test(string);
};

const isLetter = (string) => {
  return /[a-z]/.test(string);
};

export const calculateDistributionGraphData = (values: IRecords, columnName: string) => {
  const arrayOfColumn = values.map((el) => el[columnName]);
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
