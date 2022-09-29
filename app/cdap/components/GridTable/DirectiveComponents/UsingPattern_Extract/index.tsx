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

import { FormControl, FormGroup, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  SELECT_PATTERN,
  EXTRACT_FIELD_PATTERN,
  EXTRACT_NUMBERS_WITH,
  EXTRACT_TEXT_START_WITH,
  AND_END_WITH,
  WRITE_YOUR_OWN_REGEX,
} from '../constants';
import { USING_PATTERN_OPTIONS } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import SelectOptionComponent from '../HashComponent/SelectComponent';
import ParseComponent from '../ParseComponent';

const UsingPattern = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [patternName, setPatternName] = useState('');
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [nDigit, setNDigit] = useState('');
  const [customInput, setCustomInput] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, patternName });
  }, [patternName]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, startValue });
  }, [startValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, endValue });
  }, [endValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, nDigit });
  }, [nDigit]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput });
  }, [customInput]);

  return (
    <ParseComponent sectionHeading={EXTRACT_FIELD_PATTERN}>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_PATTERN}</div>
        <FormControl>
          <SelectOptionComponent
            formInputValue={patternName}
            inputProps={{
              value: patternName,
              onChange: (e) => setPatternName(e.target.value),
              color: 'primary',
              placeholder: '',
            }}
            label=""
          >
            {USING_PATTERN_OPTIONS.map((filter) => (
              <MenuItem value={filter.patternName}>{filter.label}</MenuItem>
            ))}
          </SelectOptionComponent>
        </FormControl>
      </FormGroup>
      {patternName === 'ndigitnumber' && (
        <FormGroup>
          <div className={classes.formLabelStyles}>{EXTRACT_NUMBERS_WITH}</div>
          <FormInputFieldComponent
            formInputValue={nDigit}
            classnames={classes.formFieldStyles}
            inputProps={{
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              type: 'number',
              value: nDigit,
              onChange: (e) => setNDigit(e.target.value),
              color: 'primary',
              placeholder: 'E.g. 3',
            }}
            label={'digits'}
          />
        </FormGroup>
      )}
      {patternName === 'startend' && (
        <FormGroup>
          <div className={classes.formLabelStyles}>{EXTRACT_TEXT_START_WITH}</div>
          <FormInputFieldComponent
            formInputValue={startValue}
            classnames={classes.formFieldStyles}
            inputProps={{
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              type: 'text',
              value: startValue,
              onChange: (e) => setStartValue(e.target.value),
              color: 'primary',
              placeholder: 'E.g. <',
            }}
          />
          <div className={classes.formLabelStyles}>{AND_END_WITH}</div>
          <FormInputFieldComponent
            formInputValue={endValue}
            classnames={classes.formFieldStyles}
            inputProps={{
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              type: 'text',
              value: endValue,
              onChange: (e) => setEndValue(e.target.value),
              color: 'primary',
              placeholder: 'E.g. >',
            }}
          />
        </FormGroup>
      )}
      {patternName === 'custom' && (
        <FormGroup>
          <div className={classes.formLabelStyles}>{WRITE_YOUR_OWN_REGEX}</div>
          <FormInputFieldComponent
            formInputValue={customInput}
            classnames={classes.formFieldStyles}
            inputProps={{
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              type: 'text',
              value: customInput,
              onChange: (e) => setCustomInput(e.target.value),
              color: 'primary',
              placeholder: 'E.g. [^(]+(([0-9]{4})).* ',
            }}
            label={'digits'}
          />
        </FormGroup>
      )}
    </ParseComponent>
  );
};

export default UsingPattern;
