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
import FormInputRadio from 'components/FormInputRadio';
import { PARSE_EXCEL_OPTIONS } from 'components/GridTable/components/DirectiveComponents/options';
import ParseComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/index';
import {
  IParseCSVProps,
  ISetDirectiveComponentValue,
} from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import { useStyles } from 'components/GridTable/components/DirectiveComponents/styles';
import {
  CHOOSE_SHEET_IN_EXCEL,
  SET_FIRST_ROW_AS_HEADER,
  SHEET_NAME_PLACEHOLDER,
  SHEET_NUMBER_PLACEHOLDER,
} from 'components/GridTable/constants';
import InputCheckbox from 'components/InputCheckbox';
import React, { useEffect, useState } from 'react';

export default function({ setTransformationValues }: ISetDirectiveComponentValue) {
  const [sheetRadioType, setSheetRadioType] = useState<string>('sheetNumber');
  const [sheetValue, setSheetValue] = useState<string>('');
  const [firstRowAsHeader, setFirstRowAsHeader] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setTransformationValues((prevState) => ({ ...prevState, radioOption: sheetRadioType }));
  }, [sheetRadioType]);

  useEffect(() => {
    setTransformationValues((prevState) => ({ ...prevState, sheetValue }));
  }, [sheetValue]);

  useEffect(() => {
    setTransformationValues((prevState) => ({ ...prevState, firstRowAsHeader }));
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
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSheetValue(e.target.value),
            color: 'primary',
            placeholder:
              sheetRadioType === 'sheetNumber' ? SHEET_NUMBER_PLACEHOLDER : SHEET_NAME_PLACEHOLDER,
          }}
        />
        <InputCheckbox
          label={SET_FIRST_ROW_AS_HEADER}
          value={firstRowAsHeader}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstRowAsHeader(e.target.checked)
          }
          className={classes.checkboxStyles}
        />
      </FormGroup>
    </ParseComponent>
  );
}
