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
  Radio,
  RadioGroup,
  MenuItem,
} from '@material-ui/core';
import InputCheckbox from '../../../ParsingDrawer/Components/InputCheckbox';
import React, { useState, useEffect } from 'react';
import { SELECT_ACTION, IGNORE_CASE } from '../constants';
import { FILTER_RADIO_OPTION, FILTER_OPTIONS, FILTER_PLACEHOLDER } from '../options';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';
import SelectOptionComponent from '../HashComponent/SelectComponent';

const FilterComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [radioOption, setRadioOption] = useState('KEEP');
  const [filterCondition, setFilterCondition] = useState('EMPTY');
  const [filterValue, setFilterValue] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterRowToKeepOrRemove: radioOption,
    });
  }, [radioOption]);

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterRowToKeepOrRemove: radioOption,
      filterCondition,
    });
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterCondition });
  }, [filterCondition]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, filterConditionValue: filterValue });
  }, [filterValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, ignoreCase });
  }, [ignoreCase]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_ACTION}</div>
        <FormControl>
          <RadioGroup
            name="actions"
            value={radioOption}
            onChange={(e) => setRadioOption(e.target.value)}
          >
            {FILTER_RADIO_OPTION.map((eachRadio) => (
              <FormControlLabel
                value={eachRadio.value}
                className={classes.radioStyles}
                control={<Radio color="primary" />}
                label={eachRadio.label}
              />
            ))}
          </RadioGroup>
          {radioOption && (
            <>
              <div className={classes.formLabelStyles}>{'IF'}</div>
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
                {FILTER_OPTIONS.map((filter) => (
                  <MenuItem value={filter.value}>{filter.label}</MenuItem>
                ))}
              </SelectOptionComponent>
            </>
          )}
        </FormControl>
      </FormGroup>
      {filterCondition && filterCondition != 'EMPTY' && (
        <FormGroup>
          <FormInputFieldComponent
            formInputValue={filterValue}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: filterValue,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e) => setFilterValue(e.target.value),
              color: 'primary',
              placeholder: FILTER_PLACEHOLDER[filterCondition],
            }}
          />
          {filterCondition != 'EMPTY' &&
            filterCondition != 'CUSTOMCONDITION' &&
            filterCondition != 'TEXTREGEX' && (
              <InputCheckbox
                label={IGNORE_CASE}
                value={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                className={classes.checkboxStyles}
              />
            )}
        </FormGroup>
      )}
    </div>
  );
};

export default FilterComponent;
