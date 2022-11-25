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
import { Box, FormGroup, Typography } from '@material-ui/core';
import FormInputFieldComponent from 'components/common/TransformationInputComponents/FormInputFieldComponent';
import InputCheckbox from 'components/common/TransformationInputComponents/InputCheckbox';
import React, { useState, useEffect } from 'react';
import T from 'i18n-react';
import styled from 'styled-components';
import CheckBox from '@material-ui/icons/CheckBox';

const StyledLabel = styled(Typography)`
  color: #5f6368;
  font-size: 14px;
  font-style: normal;
  margin-top: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 0.15px;
  margin-bottom: 10px;
`;

const CustomizedFormInputFieldComponent = styled(FormInputFieldComponent)`
  width: calc(100% - 60px);
  margin-right: 60px;
  border: 1px solid #dadce0;
  height: 40px;
  padding: 5px 15px;
  font-size: 14px;
  background: #ffffff;
  borderradius: 4px;
  marginleft: 0;
`;

const FindAndReplace = ({ setTransformationComponentsValue, transformationComponentValues }) => {
  const [oldValue, setOldValue] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [exactMatch, setExactMatch] = useState(false);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      findPreviousValue: oldValue,
    });
  }, [oldValue]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      ignoreCase,
    });
  }, [ignoreCase]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      exactMatch,
    });
  }, [exactMatch]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      findReplaceValue: newValue,
    });
  }, [newValue]);

  return (
    <Box>
      <FormGroup>
        <Box>
          <StyledLabel>
            {T.translate(`features.WranglerNewUI.GridPage.transformationUI.findAndReplace.find`)}
          </StyledLabel>
        </Box>
        <CustomizedFormInputFieldComponent
          formInputValue={oldValue}
          inputProps={{
            type: 'text',
            value: oldValue,
            onChange: (e) => setOldValue(e.target.value),
            color: 'primary',
            placeholder: T.translate(
              `features.WranglerNewUI.GridPage.transformationUI.findAndReplace.oldValue`
            ),
          }}
        />
        <InputCheckbox
          label={
            T.translate(
              `features.WranglerNewUI.GridPage.transformationUI.findAndReplace.ignoreCase`
            ) as string
          }
          value={ignoreCase}
          onChange={(e) => setIgnoreCase(e.target.checked)}
          inputProps={{
            'data-testid': 'ignore-case-input-checkbox',
          }}
        />
        <InputCheckbox
          label={
            T.translate(
              `features.WranglerNewUI.GridPage.transformationUI.findAndReplace.exactMatch`
            ) as string
          }
          value={exactMatch}
          onChange={(e) => setExactMatch(e.target.checked)}
          inputProps={{
            'data-testid': 'exact-match-input-checkbox',
          }}
        />
      </FormGroup>
      <FormGroup>
        <Box>
          <StyledLabel>
            {T.translate(
              `features.WranglerNewUI.GridPage.transformationUI.findAndReplace.replaceWith`
            )}
          </StyledLabel>
        </Box>
        <CustomizedFormInputFieldComponent
          formInputValue={newValue}
          inputProps={{
            type: 'text',
            value: newValue,
            onChange: (e) => setNewValue(e.target.value),
            color: 'primary',
            placeholder: T.translate(
              `features.WranglerNewUI.GridPage.transformationUI.findAndReplace.newValue`
            ),
            'data-testid': 'new-value-input-form',
          }}
        />
      </FormGroup>
    </Box>
  );
};

export default FindAndReplace;
