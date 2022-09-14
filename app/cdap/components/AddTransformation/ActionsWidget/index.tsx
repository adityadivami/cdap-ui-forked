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
    </React.Fragment>
  );
};

export default ActionsWidget;
