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
import { DELIMITER_OPTION_EXPLODE_EXTRACT } from 'components/GridTable/components/TransformationComponents/DelimiterForExtract/options';
import InputRadioWithCustomInputComponent from 'components/GridTable/components/TransformationComponents/InputComponents/InputRadioWithCustomInputComponent';
import { IDelimiterExtractProps } from 'components/GridTable/components/TransformationComponents/DelimiterForExtract/types';
import { FormGroup } from '@material-ui/core';
import LabelComponent from 'components/GridTable/components/TransformationComponents/InputComponents/LabelInputComponent';
import T from 'i18n-react';

export default function({
  setTransformationComponentsValue,
  transformationComponentValues,
}: IDelimiterExtractProps) {
  const [selectedParseType, setSelectedParseType] = useState<string>('');
  const [delimiter, setDelimiter] = useState<string>('');

  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({
      ...prevState,
      radioOption: selectedParseType,
    }));
  }, [selectedParseType]);

  useEffect(() => {
    setTransformationComponentsValue((prevState) => ({ ...prevState, customInput: delimiter }));
  }, [delimiter]);

  return (
    <FormGroup>
      <LabelComponent
        labelText={`${T.translate(
          'features.WranglerNewUI.GridPage.transformationUI.extract.selectDelimiter'
        )}`}
      />
      <InputRadioWithCustomInputComponent
        options={DELIMITER_OPTION_EXPLODE_EXTRACT}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="customDelimiter"
        customInput={delimiter}
        setCustomInput={setDelimiter}
      />
    </FormGroup>
  );
}
