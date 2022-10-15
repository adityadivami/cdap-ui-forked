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
import { FormGroup, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { SELECT_HASH_ALGO, ENCODE } from '../constants';
import { useStyles } from '../styles';
import SelectOptionComponent from './SelectComponent';
import InputCheckbox from 'components/ParsingDrawer/Components/InputCheckbox';

const HashComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(hashAlgorithmOptions[0]);
  const [encode, setEncode] = useState(false);
  const classes = useStyles();

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
      <div className={classes.formLabelStyles}>{SELECT_HASH_ALGO}</div>
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
        label={ENCODE}
        value={encode}
        onChange={(e) => setEncode(e.target.checked)}
        className={classes.checkboxStyles}
      />
    </FormGroup>
  );
};

export default HashComponent;
