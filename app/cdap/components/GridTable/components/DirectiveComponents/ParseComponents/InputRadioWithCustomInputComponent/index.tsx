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
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import FormInputField from 'components/FormInputField';
import FormInputRadio from 'components/FormInputRadio';
import React from 'react';
import { useStyles } from '../../styles';
import { IInputRadioWithCustomInputProps } from '../types';

const InputRadioWithCustomInputComponent = ({
  options,
  radioValue,
  setRadioValue,
  customInputType,
  customInput,
  setCustomInput,
}: IInputRadioWithCustomInputProps) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.formGroupStyles}>
      <FormInputRadio
        options={options}
        radioValue={radioValue}
        setRadioValue={(e: React.ChangeEvent<HTMLInputElement>) => setRadioValue(e.target.value)}
      />
      {radioValue === customInputType && (
        <FormInputField
          formInputValue={customInput}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: {
              underline: classes.underlineStyles,
              input: classes.inputStyles,
            },
            type: 'text',
            value: customInput,
            onChange: (e) => setCustomInput(e.target.value),
            color: 'primary',
            placeholder: '',
          }}
        />
      )}
    </FormGroup>
  );
};
export default InputRadioWithCustomInputComponent;
