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
import { SELECT_ACTION_TO_TAKE, REMOVE_ROWS, REPLACE_ROWS, REPLACE_WITH } from '../constants';
import { useStyles } from '../styles';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
  FormLabel,
} from '@material-ui/core';
import CopyColumnWidget from './Components/CopyColumnAction';
import NullFunctionWidget from './Components/NullFunctionAction';
import HashFunctionAction from './Components/HashFunctionAction';
import FindAndReplace from './Components/FindAndReplaceAction';
import Concatenate from './Components/ConcatenateAction';
import FilterAction from './Components/FilterAction';
import CustomTransform from './Components/CustomTransform';
import DefineVariable from './Components/DefineVariable';
import SendToError from './Components/SendToError';

const ActionsWidget = (props) => {
  const {
    functionName,
    selectedAction,
    setSelectedAction,
    setReplaceValue,
    replaceValue,
    selectedColumns,
    columnData,
    setEncode,
    encode,
    oldValue,
    setOldValue,
    exactMatch,
    setExactMatch,
    ignoreCase,
    setIgnoreCase,
    setNewColumnName,
    newColumnName,
    textValue,
    setTextValue,
    variableName,
    setVariableName,
    filterAction,
    setFilterAction,
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {functionName === 'null' && (
        <NullFunctionWidget
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          setReplaceValue={setReplaceValue}
          replaceValue={replaceValue}
        />
      )}
      {functionName === 'copy-column' && selectedColumns.length > 0 && (
        <CopyColumnWidget
          columnData={columnData}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
        />
      )}
      {functionName === 'hash' && selectedColumns.length > 0 && (
        <HashFunctionAction
          setEncode={setEncode}
          encode={encode}
          filterAction={filterAction}
          setFilterAction={setFilterAction}
        />
      )}
      {functionName === 'findAndReplace' && selectedColumns.length > 0 && (
        <FindAndReplace
          oldValue={oldValue}
          setOldValue={setOldValue}
          exactMatch={exactMatch}
          setExactMatch={setExactMatch}
          ignoreCase={ignoreCase}
          setIgnoreCase={setIgnoreCase}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
        />
      )}
      {functionName === 'concatenate' && selectedColumns.length > 0 && (
        <Concatenate
          setNewColumnName={setNewColumnName}
          newColumnName={newColumnName}
          setEncode={setEncode}
          encode={encode}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
      {functionName === 'filter' && selectedColumns.length > 0 && (
        <FilterAction
          textValue={textValue}
          setTextValue={setTextValue}
          setIgnoreCase={setIgnoreCase}
          ignoreCase={ignoreCase}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          filterAction={filterAction}
          setFilterAction={setFilterAction}
        />
      )}
      {functionName === 'custom-transform' && selectedColumns.length > 0 && (
        <CustomTransform
          selectedColumns={selectedColumns}
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
        />
      )}
      {functionName === 'define-variable' && selectedColumns.length > 0 && (
        <DefineVariable
          textValue={textValue}
          setTextValue={setTextValue}
          variableName={variableName}
          setVariableName={setVariableName}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
      {functionName === 'send-to-error' && selectedColumns.length > 0 && (
        <SendToError
          filterAction={filterAction}
          setFilterAction={setFilterAction}
          ignoreCase={ignoreCase}
          setIgnoreCase={setIgnoreCase}
          textValue={textValue}
          setTextValue={setTextValue}
        />
      )}
    </React.Fragment>
  );
};

export default ActionsWidget;
