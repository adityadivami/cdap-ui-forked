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
  CONTAIN_LETTER_NUMBER,
  CONTAIN_LETTER_LEADING_TRAILING,
  CONTAIN_LETTER_LEADING,
  CONTAIN_LETTER_TRAILING,
  CONTAIN_LETTER_ONLY,
  CONTAIN_NUMBER_ONLY,
} from './constants';

export const convertNonNullPercent = (gridData, nonNullValue) => {
  const lengthOfData: number = gridData?.values.length;
  let nullValueCount: number = 0;
  if (lengthOfData) {
    nullValueCount = nonNullValue.null
      ? (((nonNullValue.null || 0) + (nonNullValue.empty || 0)) / 100) * lengthOfData
      : 0;
  }
  return nullValueCount;
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
      minCount = Math.min(a.length, b.length);
      if (a.length == minCount) {
        return a;
      } else {
        return b;
      }
    }
  });
  const maxElement = arrayOfColumn.reduce((a, b) => {
    if (a || b) {
      maxCount = Math.max(a.length, b.length);
      if (a.length == maxCount) {
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
