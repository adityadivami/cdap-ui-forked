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

import { FormControl, FormGroup, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { USING_PATTERN_OPTIONS } from './options';
import { useStyles } from 'components/GridTable/components/TransformationComponents/styles';
import FormInputFieldComponent from 'components/GridTable/components/TransformationComponents/InputComponents/FormInputFieldComponent';
import SelectInputComponent from 'components/GridTable/components/TransformationComponents/InputComponents/SelectInputComponent';
import LabelComponent from 'components/GridTable/components/TransformationComponents/InputComponents/LabelInputComponent';
import StartEndComponent from 'components/GridTable/components/TransformationComponents/PatternExtract/StartEndPattern';
import CustomComponent from 'components/GridTable/components/TransformationComponents/PatternExtract/CustomPattern';
import T from 'i18n-react';

export default function({ setTransformationComponentsValue, transformationComponentValues }) {
  const [patternName, setPatternName] = useState('');
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [nDigit, setNDigit] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      extractOptionSelected: patternName,
    });
  }, [patternName]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, startValue });
  }, [startValue]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, endValue });
  }, [endValue]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, nDigit });
  }, [nDigit]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, customInput });
  }, [customInput]);

  return (
    <>
      <FormGroup>
        <LabelComponent
          labelText={`${T.translate(
            'features.WranglerNewUI.GridPage.transformationUI.extract.selectPattern'
          )}`}
        />
        <FormControl>
          <SelectInputComponent
            optionSelected={patternName}
            setOptionSelected={setPatternName}
            options={USING_PATTERN_OPTIONS}
            customInput={customInput}
            setCustomInput={setCustomInput}
            customInputPlaceHolder={''}
            checkboxValue={checkboxValue}
            setCheckboxValue={setCheckboxValue}
            checkboxLabel={``}
          />
        </FormControl>
      </FormGroup>
      {patternName === 'ndigitnumber' && (
        <FormGroup>
          <LabelComponent
            labelText={`${T.translate(
              'features.WranglerNewUI.GridPage.transformationUI.extract.extractNumber'
            )}`}
          />
          <FormInputFieldComponent
            formInputValue={nDigit}
            classnames={classes.formFieldStyles}
            inputProps={{
              classes: { underline: classes.underlineStyles, input: classes.inputStyles },
              type: 'number',
              value: nDigit,
              onChange: (e) => setNDigit(e.target.value),
              color: 'primary',
              placeholder: 'E.g. 3',
            }}
            label={`${T.translate(
              'features.WranglerNewUI.GridPage.transformationUI.extract.digits'
            )}`}
          />
        </FormGroup>
      )}
      {patternName === 'startend' && (
        <StartEndComponent
          setStartValue={setStartValue}
          startValue={startValue}
          endValue={endValue}
          setEndValue={setEndValue}
        />
      )}
      {patternName === 'custom' && (
        <CustomComponent setCustomInput={setCustomInput} customInput={customInput} />
      )}
    </>
  );
}
