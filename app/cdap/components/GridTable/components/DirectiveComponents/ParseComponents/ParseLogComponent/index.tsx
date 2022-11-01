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
import { PARSE_LOG_OPTIONS } from 'components/GridTable/components/DirectiveComponents/options';
import ParseComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/index';
import InputRadioWithCustomInputComponent from 'components/GridTable/components/DirectiveComponents/ParseComponents/InputRadioWithCustomInputComponent';
import { ISetDirectiveComponentValue } from 'components/GridTable/components/DirectiveComponents/ParseComponents/types';
import { PLEASE_SELECT_THE_LOGS_FORMAT } from 'components/GridTable/constants';
import React, { useEffect, useState } from 'react';

export default function({ setDirectiveComponentsValue }: ISetDirectiveComponentValue) {
  const [selectedParseType, setSelectedParseType] = useState<string>('');
  const [delimiter, setDelimiter] = useState<string>('');

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, radioOption: selectedParseType }));
  }, [selectedParseType]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, customInput: delimiter }));
  }, [delimiter]);

  return (
    <ParseComponent sectionHeading={PLEASE_SELECT_THE_LOGS_FORMAT}>
      <InputRadioWithCustomInputComponent
        options={PARSE_LOG_OPTIONS}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="custom"
        customInput={delimiter}
        setCustomInput={setDelimiter}
      />
    </ParseComponent>
  );
}
