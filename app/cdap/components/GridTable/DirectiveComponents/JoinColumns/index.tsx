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
import { FormControl, FormControlLabel, FormGroup, MenuItem, Box } from '@material-ui/core';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';
import React, { useState, useEffect } from 'react';
import { NAME_NEW_COLUMN, DESTINATION_COLUMN, SET_ORDER, CHOOSE_DELIMITER } from '../constants';
import { JOIN_COLUMN_OPTIONS } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import InputRadioWithCustomInputComponent from '../ParseComponent/InputRadioWithCustomInputComponent';
import SwapVertIcon from '@material-ui/icons/SwapVert';

const JoinColumn = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [customFormat, setCustomFormat] = useState('');
  const [selectedParseType, setSelectedParseType] = useState('');
  const [column_1, setColumn_1] = useState('');
  const [column_2, setColumn_2] = useState('');
  const [newColumn, setNewColumn] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setColumn_1(directiveComponentValues.column_1);
  }, [directiveComponentValues.column_1]);

  useEffect(() => {
    setColumn_2(directiveComponentValues.column_2);
  }, [directiveComponentValues.column_2]);

  useEffect(() => {
    setColumn_1(directiveComponentValues.column_1);
    setColumn_2(directiveComponentValues.column_2);
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, column_1 });
  }, [column_1]);
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, column_2 });
  }, [column_2]);
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, copyColumnName: newColumn });
  }, [newColumn]);
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: customFormat });
  }, [customFormat]);
  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, radioOption: selectedParseType });
  }, [selectedParseType]);

  const handleChange = () => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      column_2: column_1,
      column_1: column_2,
    });
    setColumn_1(column_2);
    setColumn_2(column_1);
  };

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SET_ORDER}</div>
        <FormInputFieldComponent
          formInputValue={column_1}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: column_1,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            color: 'primary',
            placeholder: '',
            disabled: true,
          }}
        />
        <Box onClick={handleChange} className={classes.exchangeIcon}>
          <SwapVertIcon />
        </Box>
        <FormInputFieldComponent
          formInputValue={column_2}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: column_2,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            color: 'primary',
            placeholder: '',
            disabled: true,
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{CHOOSE_DELIMITER}</div>
        <InputRadioWithCustomInputComponent
          options={JOIN_COLUMN_OPTIONS}
          radioValue={selectedParseType}
          setRadioValue={setSelectedParseType}
          customInputType="custom"
          customInput={customFormat}
          setCustomInput={setCustomFormat}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{NAME_NEW_COLUMN}</div>
        <FormInputFieldComponent
          formInputValue={newColumn}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: newColumn,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setNewColumn(e.target.value),
            color: 'primary',
            placeholder: DESTINATION_COLUMN,
          }}
        />
      </FormGroup>
    </div>
  );
};

export default JoinColumn;
