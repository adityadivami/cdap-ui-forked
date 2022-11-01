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
import FormInputField from 'components/FormInputField';
import ParseComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/index';
import { IParseCSVProps } from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import { useStyles } from 'components/GridTable/components/DirectiveComponents/styles';
import {
  COLUMN_WIDTHS,
  COLUMN_WIDTHS_PLACEHOLDER,
  PADDING,
  PADDING_PLACEHOLDER,
  PARSE_AS_FIXED_LENGTH,
} from 'components/GridTable/constants';
import React, { useEffect, useState } from 'react';

export default function({ setDirectiveComponentsValue }: IParseCSVProps) {
  const [columnWidths, setColumnWidths] = useState<string>('');
  const [padding, setPadding] = useState<string>('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, columnWidths }));
  }, [columnWidths]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, optionPaddingParam: padding }));
  }, [padding]);

  return (
    <ParseComponent sectionHeading={PARSE_AS_FIXED_LENGTH}>
      <FormGroup>
        <div className={classes.formLabelStyles}>{COLUMN_WIDTHS}</div>
        <FormInputField
          formInputValue={columnWidths}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'number',
            value: columnWidths,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setColumnWidths(e.target.value),
            color: 'primary',
            placeholder: COLUMN_WIDTHS_PLACEHOLDER,
          }}
        />
        <div className={classes.formLabelStyles}>{PADDING}</div>
        <FormInputField
          formInputValue={padding}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'number',
            value: padding,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPadding(e.target.value),
            color: 'primary',
            placeholder: PADDING_PLACEHOLDER,
          }}
        />
      </FormGroup>
    </ParseComponent>
  );
}
