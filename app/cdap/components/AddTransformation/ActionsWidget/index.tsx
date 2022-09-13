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
          replaceValue={replaceValue}
          setReplaceValue={setReplaceValue}
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
    </React.Fragment>
  );
};

export default ActionsWidget;
