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

import { HASH_ALGORITHM_OPTIONS } from '../options';
import { FormGroup, MenuItem } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../styles';
import { ENCODE, SELECT_HASH_ALGO } from 'components/GridTable/constants';
import SelectInputComponent from '../../../../SelectInputComponent';

const HashComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues, functionName } = props;
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(HASH_ALGORITHM_OPTIONS[0]);
  const [encode, setEncode] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, hashValue: selectedAlgorithm }));
  }, []);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, hashValue: selectedAlgorithm }));
  }, [selectedAlgorithm]);

  useEffect(() => {
    setDirectiveComponentsValue((prevState) => ({ ...prevState, encode }));
  }, [encode]);

  return (
    <FormGroup>
      <div className={classes.formLabelStyles}>{SELECT_HASH_ALGO}</div>
      <SelectInputComponent
        optionSelected={selectedAlgorithm}
        setOptionSelected={setSelectedAlgorithm}
        options={HASH_ALGORITHM_OPTIONS}
        checkboxValue={encode}
        setCheckboxValue={setEncode}
        checkboxLabel={ENCODE}
        functionName={functionName}
      />
      {/* <InputCheckbox
        label={ENCODE}
        value={encode}
        onChange={(e) => setEncode(e.target.checked)}
        className={classes.checkboxStyles}
      /> */}
    </FormGroup>
  );
};

export default HashComponent;
