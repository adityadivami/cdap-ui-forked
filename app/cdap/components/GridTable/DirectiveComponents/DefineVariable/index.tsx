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
import { FormControl, FormGroup, Typography, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { SET_VARIABLE_NAME, SELECT_ROW_WHERE, SELECT_COLUMN_SELECTED_ROW } from '../constants';
import { DEFINE_VARIABLE_OPTIONS, FILTER_PLACEHOLDER } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import SelectOptionComponent from '../HashComponent/SelectComponent';

const DefineVariable = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [filterCondition, setFilterCondition] = useState('TEXTEXACTLY');
  const [variableName, setVariableName] = useState('');
  const [columnSelected, setColumnSelected] = useState('');
  const [customInput, setCustomInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterCondition,
      selectedColumnForDefineVariable: directiveComponentValues.selectedColumn,
    });
    setColumnSelected(directiveComponentValues.selectedColumn);
  }, [directiveComponentValues.selectedColumn]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterCondition });
  }, [filterCondition]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, variableName });
  }, [variableName]);

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      selectedColumnForDefineVariable: columnSelected,
    });
  }, [columnSelected]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput });
  }, [customInput]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SET_VARIABLE_NAME}</div>
        <FormInputFieldComponent
          formInputValue={variableName}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'text',
            value: variableName,
            onChange: (e) => setVariableName(e.target.value),
            color: 'primary',
            placeholder: 'Enter variable name',
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_ROW_WHERE}</div>
        <FormControl>
          <SelectOptionComponent
            formInputValue={filterCondition}
            inputProps={{
              value: filterCondition,
              onChange: (e) => setFilterCondition(e.target.value),
              color: 'primary',
              placeholder: '',
            }}
            label=""
          >
            {DEFINE_VARIABLE_OPTIONS.map((filter) => (
              <MenuItem value={filter.value}>{filter.label}</MenuItem>
            ))}
          </SelectOptionComponent>
        </FormControl>
        <FormInputFieldComponent
          formInputValue={customInput}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'text',
            value: customInput,
            onChange: (e) => setCustomInput(e.target.value),
            color: 'primary',
            placeholder: FILTER_PLACEHOLDER[filterCondition],
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_COLUMN_SELECTED_ROW}</div>
        <FormControl>
          <SelectOptionComponent
            formInputValue={columnSelected}
            inputProps={{
              value: columnSelected,
              onChange: (e) => setColumnSelected(e.target.value),
              color: 'primary',
              placeholder: '',
            }}
            label=""
          >
            {directiveComponentValues.columnNames.map((column) => (
              <MenuItem value={column}>{column}</MenuItem>
            ))}
          </SelectOptionComponent>
        </FormControl>
      </FormGroup>
      {columnSelected && directiveComponentValues.selectedColumn && (
        <Typography
          variant="body1"
          className={classes.additionalText}
        >{`Summary: you defined the variable "${variableName}" for the cell in column ${columnSelected} in the row which value starts with fdg in column "${directiveComponentValues.selectedColumn}"`}</Typography>
      )}
    </div>
  );
};

export default DefineVariable;
