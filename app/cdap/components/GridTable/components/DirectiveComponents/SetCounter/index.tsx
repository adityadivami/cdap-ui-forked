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
import { useStyles } from '../styles';
import { SET_COUNTER_OPTION } from '../options';
import {
  SELECT_ACTION,
  INCREMENT_COUNT_BY,
  NAME_THIS_COUNTER,
} from 'components/GridTable/constants';
import FormInputField from 'components/FormInputField';
import SelectInputComponent from 'components/SelectInputComponent';
import { IParseCSVProps } from '../ParseComponents/ParseSimpleDateComponent/types';

const SetCounter = ({ setDirectiveComponentsValue, directiveComponentValues }: IParseCSVProps) => {
  const [filterCondition, setFilterCondition] = useState<string>('always');
  const [filterValue, setFilterValue] = useState<string>('');
  const [counter, setCounter] = useState<number>(1);
  const [counterName, setCounterName] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      filterCondition,
      filterConditionValue: 'true',
      counter,
    });
  }, []);

  useEffect(() => {
    if (filterCondition == 'always') {
      setDirectiveComponentsValue({
        ...directiveComponentValues,
        filterCondition,
        filterConditionValue: 'true',
      });
    } else {
      setDirectiveComponentsValue({
        ...directiveComponentValues,
        filterCondition,
        filterConditionValue: filterValue,
      });
    }
  }, [filterCondition]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({
      ...prevState,
      filterConditionValue: filterValue,
    }));
  }, [filterValue]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, counter }));
  }, [counter]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, counterName }));
  }, [counterName]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{SELECT_ACTION}</div>
        <FormControl>
          <SelectInputComponent
            optionSelected={filterCondition}
            setOptionSelected={setFilterCondition}
            options={SET_COUNTER_OPTION}
          />
        </FormControl>
      </FormGroup>
      {filterCondition != 'always' && (
        <FormGroup>
          <FormInputField
            formInputValue={filterValue}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: filterValue,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value),
              color: 'primary',
              placeholder: 'Enter JEXL condition',
            }}
          />
        </FormGroup>
      )}
      <FormGroup>
        <div className={classes.formLabelStyles}>{INCREMENT_COUNT_BY}</div>
        <FormInputField
          formInputValue={counter}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'number',
            value: counter,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setCounter(Number(e.target.value)),
            color: 'primary',
          }}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{NAME_THIS_COUNTER}</div>
        <FormInputField
          formInputValue={counterName}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: counterName,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCounterName(e.target.value),
            color: 'primary',
            placeholder: 'Enter counter name',
          }}
        />
      </FormGroup>
    </div>
  );
};

export default SetCounter;
