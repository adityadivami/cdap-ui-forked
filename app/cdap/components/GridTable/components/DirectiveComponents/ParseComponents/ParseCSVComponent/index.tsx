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
import { PARSE_CSV_OPTIONS } from '../../options';
import { useStyles } from '../../styles';
import ParseComponent from '..';
import { PLEASE_SELECT_THE_DELIMITER, SET_FIRST_ROW_AS_HEADER } from 'components/GridTable/constants';
import InputCheckbox from 'components/InputCheckbox';
import InputRadioWithCustomInputComponent from '../InputRadioWithCustomInputComponent';

const ParseCSVComponent = (props) => {
  const { setDirectiveComponentsValue, directiveComponentValues } = props;
  const [selectedParseType, setSelectedParseType] = useState('');
  const [firstRowAsHeader, setFirstRowAsHeader] = useState(false);
  const [delimiter, setDelimiter] = useState('');
  const classes = useStyles();

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, radioOption: selectedParseType });
  }, [selectedParseType]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, customInput: delimiter });
  }, [delimiter]);

  useEffect(() => {
    setDirectiveComponentsValue({ ...directiveComponentValues, firstRowAsHeader });
  }, [firstRowAsHeader]);

  return (
    <ParseComponent sectionHeading={PLEASE_SELECT_THE_DELIMITER}>
      <InputRadioWithCustomInputComponent
        options={PARSE_CSV_OPTIONS}
        radioValue={selectedParseType}
        setRadioValue={setSelectedParseType}
        customInputType="customDelimiter"
        customInput={delimiter}
        setCustomInput={setDelimiter}
      />
      <InputCheckbox
        label={SET_FIRST_ROW_AS_HEADER}
        value={firstRowAsHeader}
        onChange={(e) => setFirstRowAsHeader(e.target.checked)}
        className={classes.checkboxStyles}
      />
    </ParseComponent>
  );
};
export default ParseCSVComponent;
