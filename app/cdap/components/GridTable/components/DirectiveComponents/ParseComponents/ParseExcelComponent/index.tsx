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
} from '@material-ui/core';
import FormInputRadio from 'components/FormInputRadio';
import FormInputField from 'components/FormInputField';
import {
  CHOOSE_SHEET_IN_EXCEL,
  SHEET_NUMBER_PLACEHOLDER,
  SHEET_NAME_PLACEHOLDER,
  SET_FIRST_ROW_AS_HEADER,
} from 'components/GridTable/constants';
import InputCheckbox from 'components/InputCheckbox';
import React, { useState, useEffect } from 'react';
import ParseComponent from '..';
import { PARSE_EXCEL_OPTIONS } from '../../options';
import { useStyles } from '../../styles';
import { IParseCSVProps } from '../types';

const ParseExcelComponent = ({
  setDirectiveComponentsValue,
  directiveComponentValues,
}: IParseCSVProps) => {
  const [sheetRadioType, setSheetRadioType] = useState<string>('sheetNumber');
  const [sheetValue, setSheetValue] = useState<string>('');
  const [firstRowAsHeader, setFirstRowAsHeader] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, radioOption: sheetRadioType }));
  }, [sheetRadioType]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, sheetValue }));
  }, [sheetValue]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, firstRowAsHeader }));
  }, [firstRowAsHeader]);

  return (
    <ParseComponent sectionHeading={CHOOSE_SHEET_IN_EXCEL}>
      <FormGroup>
        <FormInputRadio
          options={PARSE_EXCEL_OPTIONS}
          radioValue={sheetRadioType}
          setRadioValue={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSheetRadioType(e.target.value)
          }
        />
        <FormInputField
          formInputValue={sheetValue}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: {
              underline: classes.underlineStyles,
              input: classes.inputStyles,
            },
            type: sheetRadioType === 'sheetNumber' ? 'number' : 'text',
            value: sheetValue,
            onChange: (e) => setSheetValue(e.target.value),
            color: 'primary',
            placeholder:
              sheetRadioType === 'sheetNumber' ? SHEET_NUMBER_PLACEHOLDER : SHEET_NAME_PLACEHOLDER,
          }}
        />
        <InputCheckbox
          label={SET_FIRST_ROW_AS_HEADER}
          value={firstRowAsHeader}
          onChange={(e) => setFirstRowAsHeader(e.target.checked)}
          className={classes.checkboxStyles}
        />
      </FormGroup>
    </ParseComponent>
  );
};
export default ParseExcelComponent;
