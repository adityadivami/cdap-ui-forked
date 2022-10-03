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
import { PLEASE_SELECT_THE_DELIMITER } from '../constants';
import { DELIMITER_OPTION_EXPLODE_EXTRACT } from '../options';
import InputRadioWithCustomInputComponent from '../ParseComponent/InputRadioWithCustomInputComponent';
import ParseComponent from '../ParseComponent';

const DelimiterComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [selectedParseType, setSelectedParseType] = useState('');
  const [delimiter, setDelimiter] = useState('');

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, radioOption: selectedParseType });
  }, [selectedParseType]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: delimiter });
  }, [delimiter]);

  return (
    <ParseComponent sectionHeading={PLEASE_SELECT_THE_DELIMITER}>
      <InputRadioWithCustomInputComponent
        options={DELIMITER_OPTION_EXPLODE_EXTRACT}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="customDelimiter"
        customInput={delimiter}
        setCustomInput={setDelimiter}
      />
    </ParseComponent>
  );
};

export default DelimiterComponent;
