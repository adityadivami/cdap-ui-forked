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
  RadioGroup
} from '@material-ui/core';
import FormInputField from 'components/FormInputField';
import { CONCATENATE_OPTIONS } from 'components/GridTable/components/DirectiveComponents/options';
import { ISetDirectiveComponentValue } from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import { useStyles } from 'components/GridTable/components/DirectiveComponents/styles';
import {
  ADD,
  COPY_TO_NEW_COLUMN,
  DESTINATION_COLUMN,
  ENTER_STRING
} from 'components/GridTable/constants';
import { ISubMenuOption } from 'components/GridTable/types';
import InputCheckbox from 'components/InputCheckbox';
import React, { useEffect, useState } from 'react';

export default function({ setDirectiveComponentsValue }: ISetDirectiveComponentValue) {
  const [placement, setPlacement] = useState<string>('');
  const [stringValue, setStringValue] = useState<string>('');
  const [copy, setCopy] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');
  const classes = useStyles();
  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, radioOption: placement }));
  }, [placement]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, customInput: stringValue }));
  }, [stringValue]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, copyToNewColumn: copy }));
  }, [copy]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, copyColumnName: columnName }));
  }, [columnName]);

  return (
    <div>
      <FormGroup>
        <div className={classes.formLabelStyles}>{ADD}</div>
        <FormControl>
          <FormControlLabel
            value={stringValue}
            className={classes.formFieldStyles}
            control={
              <Input
                classes={{
                  underline: classes.underlineStyles,
                  input: classes.inputStyles,
                }}
                type={'text'}
                value={stringValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStringValue(e.target.value)
                }
                color="primary"
                placeholder={ENTER_STRING}
              />
            }
            label={''}
          />
          <RadioGroup
            name="actions"
            value={placement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlacement(e.target.value)}
          >
            {CONCATENATE_OPTIONS.map((eachRadio: ISubMenuOption) => (
              <FormControlLabel
                value={eachRadio.value}
                className={classes.radioStyles}
                control={<Radio color="primary" />}
                label={eachRadio.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <InputCheckbox
          label={COPY_TO_NEW_COLUMN}
          value={copy}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCopy(e.target.checked)}
          className={classes.checkboxStyles}
        />
      </FormGroup>
      {copy && (
        <FormGroup>
          <FormInputField
            formInputValue={columnName}
            classnames={classes.formFieldStyles}
            inputProps={{
              type: 'text',
              value: columnName,
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value),
              color: 'primary',
              placeholder: DESTINATION_COLUMN,
            }}
          />
        </FormGroup>
      )}
    </div>
  );
}
