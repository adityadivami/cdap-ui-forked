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

import React, { useState, useEffect } from 'react';
import SelectInput from '../InputComponents/SelectInputComponent';
import FormInputFieldComponent from '../InputComponents/FormInputFieldComponent';
import InputRadioWithCustomInputComponent from '../InputComponents/InputRadioWithCustomInputComponent';
import { useStyles } from '../styles';
import T from 'i18n-react';
import LabelComponent from '../InputComponents/LabelInputComponent';
import { FormGroup, Box } from '@material-ui/core';
import { FILTER_RADIO_OPTION, FILTER_OPTIONS, FILTER_PLACEHOLDER } from './options';

export default function({ setTransformationComponentsValue, transformationComponentValues }) {
  console.log('filter');
  const [radioOption, setRadioOption] = useState('KEEP');
  const [optionSelected, setOptionSelected] = useState('EMPTY');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const classes = useStyles();
  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterRadioOption: radioOption,
    });
  }, [radioOption]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterRadioOption: radioOption,
      filterOptionSelected: optionSelected,
    });
  }, []);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterOptionSelected: optionSelected,
    });
  }, [optionSelected]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterOptionValue: customInput,
    });
  }, [customInput]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, ignoreCase });
  }, [ignoreCase]);

  return (
    <Box>
      <FormGroup>
        <LabelComponent
          labelText={`${T.translate('features.DirectiveUIComponent.filter.selectAction')}`}
        />
        <InputRadioWithCustomInputComponent
          options={FILTER_RADIO_OPTION}
          radioValue={radioOption}
          setRadioValue={setRadioOption}
          customInputType="customFormat"
          customInput={customInput}
          setCustomInput={setCustomInput}
        />
      </FormGroup>
      <FormGroup>
        <LabelComponent labelText={`IF`} />
        <SelectInput
          optionSelected={optionSelected}
          setOptionSelected={setOptionSelected}
          options={FILTER_OPTIONS}
          customInput={customInput}
          setCustomInput={setCustomInput}
          customInputPlaceHolder={FILTER_PLACEHOLDER[optionSelected]}
          checkboxValue={ignoreCase}
          setCheckboxValue={setIgnoreCase}
          checkboxLabel={'Ignore case'}
        />
      </FormGroup>
    </Box>
  );
}
