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
import { FILL_NULL_EMPTY } from '../constants';
import { useStyles } from '../styles';
import FormInputFieldComponent from '../ParseComponent/FormInputFieldComponent';

const FillNullEmptyComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [replaceValue, setReplaceValue] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: replaceValue });
  }, [replaceValue]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{FILL_NULL_EMPTY}</div>
        <FormInputFieldComponent
          formInputValue={replaceValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            type: 'text',
            value: replaceValue,
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            onChange: (e) => setReplaceValue(e.target.value),
            color: 'primary',
            placeholder: 'Enter value',
          }}
        />
      </FormGroup>
    </div>
  );
};

export default FillNullEmptyComponent;
