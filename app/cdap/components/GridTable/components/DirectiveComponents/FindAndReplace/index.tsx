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
import { FormGroup } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  FIND,
  OLD_VALUE,
  IGNORE_CASE,
  EXACT_MATCH,
  REPLACE_WITH,
  NEW_VALUE,
} from '../../../constants';
import { useStyles } from '../styles';
import InputCheckbox from 'components/InputCheckbox';
import { IParseCSVProps } from '../ParseComponents/types';
import FormInputField from 'components/FormInputField';

const FindAndReplace = ({
  setDirectiveComponentsValue,
  directiveComponentValues,
}: IParseCSVProps) => {
  const [oldValue, setOldValue] = useState<string>('');
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false);
  const [exactMatch, setExactMatch] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, findPreviousValue: oldValue }));
  }, [oldValue]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, ignoreCase }));
  }, [ignoreCase]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, exactMatch }));
  }, [exactMatch]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, findReplaceValue: newValue }));
  }, [newValue]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{FIND}</div>
        <FormInputField
          formInputValue={oldValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: oldValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOldValue(e.target.value),
            color: 'primary',
            placeholder: OLD_VALUE,
          }}
        />
        <InputCheckbox
          label={IGNORE_CASE}
          value={ignoreCase}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIgnoreCase(e.target.checked)}
          className={classes.checkboxStyles}
        />
        <InputCheckbox
          label={EXACT_MATCH}
          value={exactMatch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExactMatch(e.target.checked)}
          className={classes.checkboxStyles}
        />
      </FormGroup>
      <FormGroup>
        <div className={classes.formLabelStyles}>{REPLACE_WITH}</div>
        <FormInputField
          formInputValue={newValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: newValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNewValue(e.target.value),
            color: 'primary',
            placeholder: NEW_VALUE,
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FindAndReplace;
