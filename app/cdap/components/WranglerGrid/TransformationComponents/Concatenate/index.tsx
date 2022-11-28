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
  Typography,
} from '@material-ui/core';
import FormInputFieldComponent from 'components/common/TransformationInputComponents/FormInputFieldComponent';
import InputCheckbox from 'components/common/TransformationInputComponents/InputCheckbox';
import {
  ADD,
  COPY_TO_NEW_COLUMN,
  DESTINATION_COLUMN,
  ENTER_STRING,
} from 'components/GridTable/constants';
import { CONCATENATE_OPTIONS } from 'components/WranglerGrid/TransformationComponents/ParseComponents/options';
import {
  ISetTransformationValues,
  ISubMenuOption,
} from 'components/WranglerGrid/TransformationComponents/ParseComponents/types';
import { useStyles } from 'components/WranglerGrid/TransformationComponents/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormLabel = styled(Typography)`
  color: #5f6368;
  font-size: 14px;
  font-style: normal;
  margin-top: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.15px;
  margin-bottom: 10px;
`;

export default function({ setTransformationComponentsValue }: ISetTransformationValues) {
  const [placement, setPlacement] = useState<string>('');
  const [stringValue, setStringValue] = useState<string>('');
  const [copy, setCopy] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');
  const classes = useStyles();
  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({ ...prevState, radioOption: placement }));
  }, [placement]);

  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({ ...prevState, customInput: stringValue }));
  }, [stringValue]);

  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({ ...prevState, copyToNewColumn: copy }));
  }, [copy]);

  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({ ...prevState, copyColumnName: columnName }));
  }, [columnName]);

  return (
    <>
      <FormGroup>
        <FormLabel>{ADD}</FormLabel>
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
          inputProps={{
            'data-testid': 'copy-to-new-column-checkbox',
          }}
        />
      </FormGroup>
      {copy && (
        <FormGroup>
          <FormInputFieldComponent
            formInputValue={columnName}
            inputProps={{
              type: 'text',
              value: columnName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value),
              color: 'primary',
              placeholder: DESTINATION_COLUMN,
              inputProps: {
                'data-testid': 'copy-to-new-column-custom-input',
              },
            }}
          />
        </FormGroup>
      )}
    </>
  );
}
