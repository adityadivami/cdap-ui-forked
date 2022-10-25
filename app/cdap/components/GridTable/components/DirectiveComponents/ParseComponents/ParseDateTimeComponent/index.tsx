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
import { PLEASE_SELECT_THE_DATE_FORMAT } from 'components/GridTable/constants';
import React, { useState, useEffect } from 'react';
import ParseComponent from '..';
import { PARSE_DATE_TIME_OPTIONS } from '../../options';
import InputRadioWithCustomInputComponent from '../InputRadioWithCustomInputComponent';
import { IParseCSVProps } from '../types';

const ParseDateTimeComponent = ({
  setDirectiveComponentsValue,
  directiveComponentValues,
}: IParseCSVProps) => {
  const [customFormat, setCustomFormat] = useState<string>('');
  const [selectedParseType, setSelectedParseType] = useState<string>('');

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, radioOption: selectedParseType }));
  }, [selectedParseType]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, customInput: customFormat }));
  }, [customFormat]);

  return (
    <ParseComponent sectionHeading={PLEASE_SELECT_THE_DATE_FORMAT}>
      <InputRadioWithCustomInputComponent
        options={PARSE_DATE_TIME_OPTIONS}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="customFormat"
        customInput={customFormat}
        setCustomInput={setCustomFormat}
      />
    </ParseComponent>
  );
};
export default ParseDateTimeComponent;
