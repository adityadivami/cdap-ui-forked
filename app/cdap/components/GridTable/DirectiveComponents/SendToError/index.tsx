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
import { SEND_TO_ERROR, IGNORE_CASE } from '../constants';
import { SEND_TO_ERROR_OPTIONS, FILTER_PLACEHOLDER } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import SelectOptionComponent from '../HashComponent/SelectComponent';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';

const SendToErrorComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [filterCondition, setFilterCondition] = useState('EMPTY');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SEND_TO_ERROR_OPTIONS[0]);
  const [customInput, setCustomInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterCondition,
    });
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterCondition });
  }, [filterCondition]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, ignoreCase });
  }, [ignoreCase]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput });
  }, [customInput]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SEND_TO_ERROR}</div>
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
            {SEND_TO_ERROR_OPTIONS.map((filter) => (
              <MenuItem value={filter.value} onClick={() => setSelectedOption(filter)}>
                {filter.label}
              </MenuItem>
            ))}
          </SelectOptionComponent>
        </FormControl>
        {selectedOption && selectedOption?.extraInput?.show && (
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
        )}
        {selectedOption && selectedOption?.extraInput?.ignoreCase && (
          <InputCheckbox
            label={IGNORE_CASE}
            value={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className={classes.checkboxStyles}
          />
        )}
      </FormGroup>
      <Typography variant="body1" className={classes.additionalText}>
        {'When used in a pipeline, these errors can be collected by an error collector'}
      </Typography>
    </div>
  );
};

export default SendToErrorComponent;
