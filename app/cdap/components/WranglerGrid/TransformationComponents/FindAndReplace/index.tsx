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
import FormInputFieldComponent from 'components/common/TransformationInputComponents/FormInputFieldComponent';
import InputCheckbox from 'components/common/TransformationInputComponents/InputCheckbox';
import React, { useState, useEffect } from 'react';
import {
  FIND,
  OLD_VALUE,
  IGNORE_CASE,
  EXACT_MATCH,
  REPLACE_WITH,
  NEW_VALUE,
} from 'components/WranglerGrid/TransformationComponents/constants';

const FindAndReplace = ({ setDirectiveComponentsValue, directiveComponentValues }) => {
  const [oldValue, setOldValue] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [exactMatch, setExactMatch] = useState(false);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      findPreviousValue: oldValue,
    });
  }, [oldValue]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, ignoreCase });
  }, [ignoreCase]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, exactMatch });
  }, [exactMatch]);

  useEffect(() => {
    setDirectiveComponentsValue({
      ...directiveComponentValues,
      findReplaceValue: newValue,
    });
  }, [newValue]);

  return (
    <div>
      <FormGroup>
        <div>{FIND}</div>
        <FormInputFieldComponent
          formInputValue={oldValue}
          inputProps={{
            type: 'text',
            value: oldValue,

            onChange: (e) => setOldValue(e.target.value),
            color: 'primary',
            placeholder: OLD_VALUE,
          }}
        />
        <InputCheckbox
          label={IGNORE_CASE}
          value={ignoreCase}
          onChange={(e) => setIgnoreCase(e.target.checked)}
        />
        <InputCheckbox
          label={EXACT_MATCH}
          value={exactMatch}
          onChange={(e) => setExactMatch(e.target.checked)}
        />
      </FormGroup>
      <FormGroup>
        <div>{REPLACE_WITH}</div>
        <FormInputFieldComponent
          formInputValue={newValue}
          inputProps={{
            type: 'text',
            value: newValue,

            onChange: (e) => setNewValue(e.target.value),
            color: 'primary',
            placeholder: NEW_VALUE,
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FindAndReplace;
