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
import ParseComponent from '..';
import {
  COLUMN_WIDTHS,
  COLUMN_WIDTHS_PLACEHOLDER,
  PADDING,
  PADDING_PLACEHOLDER,
  PARSE_AS_FIXED_LENGTH,
} from '../../constants';
import { useStyles } from '../../styles';
import { FormInputFieldComponent } from '../FormInputFieldComponent';

export const ParseFixedLengthComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [columnWidths, setColumnWidths] = useState('');
  const [padding, setPadding] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, columnWidths });
  }, [columnWidths]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, optionPaddingParam: padding });
  }, [padding]);

  return (
    <ParseComponent sectionHeading={PARSE_AS_FIXED_LENGTH}>
      <FormGroup>
        <div className={classes.formLabelStyles}>{COLUMN_WIDTHS}</div>
        <FormInputFieldComponent
          formInputValue={columnWidths}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'number',
            value: columnWidths,
            onChange: (e) => setColumnWidths(e.target.value),
            color: 'primary',
            placeholder: COLUMN_WIDTHS_PLACEHOLDER,
          }}
        />
        <div className={classes.formLabelStyles}>{PADDING}</div>
        <FormInputFieldComponent
          formInputValue={padding}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'number',
            value: padding,
            onChange: (e) => setPadding(e.target.value),
            color: 'primary',
            placeholder: PADDING_PLACEHOLDER,
          }}
        />
      </FormGroup>
    </ParseComponent>
  );
};
