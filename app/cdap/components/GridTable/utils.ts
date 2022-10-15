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
import React from 'react';
import { IExecuteAPIResponse } from './types';
import _ from 'lodash';
import {
  CONTAIN_LETTER_NUMBER_LEADING_TRAILING_SPACES,
  CONTAIN_LETTER_NUMBER,
  CONTAIN_LETTER_LEADING_TRAILING,
  CONTAIN_LETTER_LEADING,
  CONTAIN_LETTER_TRAILING,
  CONTAIN_LETTER_ONLY,
  CONTAIN_NUMBER_ONLY,
} from './constants';
import DataPrepStore from 'components/DataPrep/store';
import DataPrepActions from 'components/DataPrep/store/DataPrepActions';
import MyDataPrepApi from 'api/dataprep';
import { directiveRequestBodyCreator } from 'components/DataPrep/helper';
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
  const lengthOfData: number = gridData?.values.length || 0;
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
  const valueOfKey = gridData?.values.map((el) => el[key]);
  let mostFrequentItem: number = 1;
  let mostFrequentItemCount: number = 0;
  let mostFrequentItemValue: string = '';
  const mostFrequentDataItem = {
    name: '',
    count: 0,
  };
  if (_.isArray(valueOfKey) && valueOfKey?.length) {
    valueOfKey.forEach((item, index) => {
      valueOfKey.forEach((value, valueIndex) => {
        if (item == value) {
          mostFrequentItemCount++;
        }
        if (mostFrequentItem < mostFrequentItemCount) {
          mostFrequentItem = mostFrequentItemCount;
          mostFrequentItemValue = item;
        }
      });
      mostFrequentItemCount = 0;
      mostFrequentItemValue = mostFrequentItemValue == '' ? item : mostFrequentItemValue;
    });
  }
  mostFrequentDataItem.name = mostFrequentItemValue;
  mostFrequentDataItem.count = mostFrequentItemCount;
  return mostFrequentDataItem;
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

export const calculateDistributionGraphData = (values, columnName) => {
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

export const executeApiCall = (params, directiveForPayload, from) => {
  console.log('directiveForPayload', directiveForPayload);
  const executeApiData = {};
  const { dataprep } = DataPrepStore.getState();
  const { workspaceId, workspaceUri, directives, insights, activityPerformed } = dataprep;
  let gridParams = {};
  const updatedDirectives = directiveForPayload;
  const requestBody = directiveRequestBodyCreator(updatedDirectives);
  requestBody.insights = insights;

  const workspaceInfo = {
    properties: insights,
  };
  gridParams = {
    directives: updatedDirectives,
    workspaceId,
    workspaceUri,
    workspaceInfo,
    insights,
  };
  const payload = {
    context: params.namespace,
    workspaceId: params.wid,
  };
  return new Promise((resolve) => {
    MyDataPrepApi.execute(payload, requestBody).subscribe(
      (response) => {
        DataPrepStore.dispatch({
          type: DataPrepActions.setWorkspace,
          payload: {
            data: response.values,
            values: response.values,
            headers: response.headers,
            types: response.types,
            ...gridParams,
          },
        });
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: activityPerformed.undoStack,
              isUndoEnabled: activityPerformed.activityStack.length ? true : false,
              isRedoEnabled: from === 'undo' ? true : false,
            },
          },
        });
        resolve(response);
      },
      (err) => {
        resolve(err);
      }
    );
  });
};

export const undoRedoLogic = async (params, selectedOption) => {
  let finalOutput = {
    data: {},
    action: '',
  };
  const { dataprep } = DataPrepStore.getState();
  const { directives, activityPerformed } = dataprep;
  switch (selectedOption) {
    case 'undo':
      const last_action = activityPerformed.activityStack.slice(-1);
      if (last_action[0]?.isAdded && directives.length === 1) {
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_action[0].directives,
              isUndoEnabled: false,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, [], 'undo');

        finalOutput = {
          data: getData,
          action: 'delete',
        };
      } else if (last_action[0]?.isAdded && directives.length > 1) {
        const last_action = activityPerformed.activityStack.slice(-1);
        const directiveForPayload =
          last_action[0]?.directives?.length > 1
            ? directives.slice(0, -last_action[0].directives.length)
            : directives.slice(0, -1);
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_action[0].directives,
              isUndoEnabled: false,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, directiveForPayload, 'undo');
        finalOutput = {
          data: getData,
          action: 'delete',
        };
      } else if (last_action[0]?.isDeleted) {
        const last_action = activityPerformed.activityStack.slice(-1);
        const directiveForPayload = _.concat(directives, last_action[0].directives);
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_action[0].directives,
              isUndoEnabled: false,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, directiveForPayload, 'undo');
        finalOutput = {
          data: getData,
          action: 'add',
        };
      }
      break;
    case 'redo':
      const last_activity = activityPerformed.activityStack.slice(-1);
      if (last_activity[0]?.isAdded) {
        const directiveForPayload = _.concat(directives, last_activity[0].directives);
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_activity[0].directives,
              isUndoEnabled: true,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, directiveForPayload, 'redo');
        finalOutput = {
          data: getData,
          action: 'add',
        };
      } else if (last_activity[0]?.isDeleted && directives.length === 1) {
        const last_activity = activityPerformed.activityStack.slice(-1);
        const directiveForPayload = _.concat(directives, last_activity[0].directives);
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_activity[0].directives,
              isUndoEnabled: true,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, [], 'redo');
        finalOutput = {
          data: getData,
          action: 'delete',
        };
      } else if (last_activity[0]?.isDeleted && directives.length > 1) {
        const last_activity = activityPerformed.activityStack.slice(-1);
        const directiveForPayload =
          last_activity[0]?.directives?.length > 1
            ? directives.slice(0, -last_activity[0].directives.length)
            : directives.slice(0, -1);
        DataPrepStore.dispatch({
          type: DataPrepActions.setActivityStatus,
          payload: {
            activityPerformed: {
              activityStack: activityPerformed.activityStack,
              undoStack: last_activity[0].directives,
              isUndoEnabled: true,
              isRedoEnabled: true,
            },
          },
        });
        const getData = await executeApiCall(params, directiveForPayload, 'redo');
        finalOutput = {
          data: getData,
          action: 'delete',
        };
      }
      break;
  }
  return finalOutput;
};
