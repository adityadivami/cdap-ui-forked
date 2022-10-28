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
import React, { useState } from 'react';
import { Box, MenuItem, FormControl, Select, FormGroup } from '@material-ui/core';
import FormInputFieldComponent from '../FormInputFieldComponent';
import { useStyles } from '../../styles';
import InputCheckbox from '../InputCheckbox';

export default function({
  optionSelected,
  setOptionSelected,
  options,
  customInput,
  setCustomInput,
  customInputPlaceHolder,
  checkboxValue,
  setCheckboxValue,
  checkboxLabel,
}) {
  const [inputRequired, setInputRequired] = useState(false);
  const [checkboxRequired, setCheckboxRequired] = useState(false);

  const classes = useStyles();
  const handleChange = (event, item) => {
    setOptionSelected(event.target.value);
  };

  const onOptionClick = (item) => {
    setInputRequired(item.isInputRequired);
    setCheckboxRequired(item.isCheckboxRequired);
  };

  return (
    <Box>
      <FormGroup>
        <Select value={optionSelected} onChange={handleChange}>
          {options?.length > 0 &&
            options.map((item) => (
              <MenuItem onClick={() => onOptionClick(item)} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormGroup>
      {inputRequired && (
        <FormGroup>
          <FormInputFieldComponent
            formInputValue={customInput}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: customInput,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e) => setCustomInput(e.target.value),
              color: 'primary',
              placeholder: customInputPlaceHolder,
            }}
          />
          {checkboxRequired && (
            <InputCheckbox
              label={checkboxLabel}
              value={checkboxValue}
              onChange={(e) => setCheckboxValue(e.target.checked)}
              className={classes.checkboxStyles}
            />
          )}
        </FormGroup>
      )}
    </Box>
  );
}
