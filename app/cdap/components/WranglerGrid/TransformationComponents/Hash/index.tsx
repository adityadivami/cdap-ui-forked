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

import { hashAlgorithmOptions } from '../options';
import { Box, FormGroup, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SelectOptionComponent from './SelectComponent';
import InputCheckbox from 'components/common/TransformationInputComponents/InputCheckbox';
import T from 'i18n-react';

const PREFIX = 'features.WranglerNewUI.GridPage.transformationUI.hash';

export default function({ setDirectiveComponentsValue, directiveComponentValues }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(hashAlgorithmOptions[0]);
  const [encode, setEncode] = useState(false);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, hashValue: selectedAlgorithm });
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, hashValue: selectedAlgorithm });
  }, [selectedAlgorithm]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, encode });
  }, [encode]);

  return (
    <FormGroup>
      <Box>{T.translate(`${PREFIX}.selectHashAlgorithm`)}</Box>

      <SelectOptionComponent
        formInputValue={selectedAlgorithm}
        inputProps={{
          value: selectedAlgorithm,
          onChange: (e) => setSelectedAlgorithm(e.target.value),
          color: 'primary',
          placeholder: '',
        }}
      >
        {hashAlgorithmOptions.map((algo) => (
          <MenuItem value={algo}>{algo}</MenuItem>
        ))}
      </SelectOptionComponent>
      <InputCheckbox
        label={T.translate(`${PREFIX}.selectHashAlgorithm`) as string}
        value={encode}
        onChange={(e) => setEncode(e.target.checked)}
      />
    </FormGroup>
  );
}
