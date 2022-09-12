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
    </React.Fragment>
  );
};

export default ActionsWidget;
