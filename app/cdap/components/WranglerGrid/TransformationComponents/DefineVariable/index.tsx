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

import { FormControl, FormGroup, Typography, MenuItem } from '@material-ui/core';
import FormInputFieldComponent from 'components/common/TransformationInputComponents/FormInputFieldComponent';
import React, { useState, useEffect } from 'react';
import T from 'i18n-react';
import {
  DEFINE_VARIABLE_OPTIONS,
  FILTER_PLACEHOLDER,
} from 'components/WranglerGrid/TransformationComponents/DefineVariable/options';
import SelectInputComponent from 'components/common/TransformationInputComponents/SelectInputComponent';

const PREFIX = 'features.WranglerNewUI.GridPage.transformationUI.defineVariable';

interface IDefineVariableProps {
  setTransformationComponentsValue: any;
  transformationComponentValues: any;
}

export default function({
  setTransformationComponentsValue,
  transformationComponentValues,
}: IDefineVariableProps) {
  const [filterCondition, setFilterCondition] = useState('TEXTEXACTLY');
  const [variableName, setVariableName] = useState('');
  const [columnSelected, setColumnSelected] = useState('');
  const [customInput, setCustomInput] = useState('');

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterCondition,
      selectedColumnForDefineVariable: transformationComponentValues.selectedColumn,
    });
    setColumnSelected(transformationComponentValues.selectedColumn);
  }, [setTransformationComponentsValue?.selectedColumn]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterCondition,
    });
  }, [filterCondition]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, variableName });
  }, [variableName]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      selectedColumnForDefineVariable: columnSelected,
    });
  }, [columnSelected]);

  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, customInput });
  }, [customInput]);

  return (
    <div>
      <FormGroup>
        <div>{<Typography>{T.translate(`${PREFIX}.setVariableName`)}</Typography>}</div>
        <FormInputFieldComponent
          formInputValue={variableName}
          inputProps={{
            type: 'text',
            value: variableName,
            onChange: (e) => setVariableName(e.target.value),
            color: 'primary',
            placeholder: 'Enter variable name',
          }}
        />
      </FormGroup>
      <FormGroup>
        <div>
          <Typography>{T.translate(`${PREFIX}.selectRowWhere`)}</Typography>
        </div>
        <FormControl>
          <SelectInputComponent
            optionSelected={columnSelected}
            setOptionSelected={setCustomInput}
            options={DEFINE_VARIABLE_OPTIONS}
            checkboxLabel={T.translate(`${PREFIX}.encode`).toString()}
            transformation={'define-varibale'}
          />
        </FormControl>
        <FormInputFieldComponent
          formInputValue={customInput}
          inputProps={{
            type: 'text',
            value: customInput,
            onChange: (e) => setCustomInput(e.target.value),
            color: 'primary',
            placeholder: FILTER_PLACEHOLDER[filterCondition],
          }}
        />
      </FormGroup>
      <FormGroup>
        <div>
          <Typography>{T.translate(`${PREFIX}.selectColumnSelectedRow`)}</Typography>
        </div>
        <FormControl>
          <SelectInputComponent
            optionSelected={filterCondition}
            setOptionSelected={setFilterCondition}
            options={DEFINE_VARIABLE_OPTIONS}
            checkboxLabel={T.translate(`${PREFIX}.encode`).toString()}
            transformation={'define-varibale'}
          />
        </FormControl>
      </FormGroup>
      {columnSelected && transformationComponentValues.selectedColumn && (
        <Typography variant="body1">{`Summary: you defined the variable "${variableName}" for the cell in column ${columnSelected} in the row which value starts with fdg in column "${transformationComponentValues.selectedColumn}"`}</Typography>
      )}
    </div>
  );
}
