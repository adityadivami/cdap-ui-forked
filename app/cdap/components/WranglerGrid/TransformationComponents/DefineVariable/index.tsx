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

import { Box, FormControl, FormGroup } from '@material-ui/core';
import FormInputFieldComponent from 'components/common/TransformationInputComponents/FormInputFieldComponent';
import SelectInputComponent from 'components/common/TransformationInputComponents/SelectInputComponent';
import { NormalFont, SubHeadBoldFont } from 'components/common/TypographyText';
import { ITransformationComponentValues } from 'components/WranglerGrid/AddTransformationPanel/types';
import { IHeaderNamesList } from 'components/WranglerGrid/SelectColumnPanel/types';
import {
  DEFINE_VARIABLE_OPTIONS,
  FILTER_PLACEHOLDER,
} from 'components/WranglerGrid/TransformationComponents/DefineVariable/options';
import T from 'i18n-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PREFIX = 'features.WranglerNewUI.GridPage.transformationUI.defineVariable';

interface IDefineVariableProps {
  setTransformationComponentsValue: React.Dispatch<
    React.SetStateAction<ITransformationComponentValues>
  >;
  transformationComponentValues: ITransformationComponentValues;
  columnsList: IHeaderNamesList[];
}

interface INewColumnList {
  label: string;
  value: string;
}

const CustomizedBox = styled(Box)`
  margin-bottom: 10px;
`;

export default function({
  setTransformationComponentsValue,
  transformationComponentValues,
  columnsList,
}: IDefineVariableProps) {
  const [filterCondition, setFilterCondition] = useState('TEXTEXACTLY');
  const [variableName, setVariableName] = useState('');
  const [columnSelected, setColumnSelected] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [newColumnList, setNewColumnList] = useState<INewColumnList[]>([]);

  useEffect(() => {
    const updatedColumnList = [];
    columnsList.map(({ label }) => {
      updatedColumnList.push({
        label,
        value: label,
      });
    });
    setNewColumnList(updatedColumnList);
  }, []);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterCondition,
      selectedColumnForDefineVariable: transformationComponentValues.selectedColumn,
    });
    setColumnSelected(transformationComponentValues.selectedColumn);
  }, [transformationComponentValues?.selectedColumn]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      filterCondition,
    });
  }, [filterCondition]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      variableName,
    });
  }, [variableName]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      selectedColumnForDefineVariable: columnSelected,
    });
  }, [columnSelected]);

  useEffect(() => {
    setTransformationComponentsValue({
      ...transformationComponentValues,
      customInput,
    });
  }, [customInput]);

  return (
    <div>
      <FormGroup>
        <CustomizedBox>
          <SubHeadBoldFont>{T.translate(`${PREFIX}.setVariableName`)}</SubHeadBoldFont>
        </CustomizedBox>
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
        <CustomizedBox>
          <SubHeadBoldFont>{T.translate(`${PREFIX}.selectRowWhere`)}</SubHeadBoldFont>
        </CustomizedBox>
        <FormControl>
          <SelectInputComponent
            optionSelected={filterCondition}
            setOptionSelected={setFilterCondition}
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
        <CustomizedBox>
          <SubHeadBoldFont>{T.translate(`${PREFIX}.selectColumnSelectedRow`)}</SubHeadBoldFont>
        </CustomizedBox>
        <FormControl>
          <SelectInputComponent
            optionSelected={columnsList[0].label}
            setOptionSelected={setColumnSelected}
            options={newColumnList}
            checkboxLabel={T.translate(`${PREFIX}.encode`).toString()}
            transformation={'define-varibale-columnlist'}
          />
        </FormControl>
      </FormGroup>
      {columnSelected &&
        transformationComponentValues.selectedColumn &&
        customInput &&
        variableName && (
          <CustomizedBox>
            <NormalFont>{`Summary: you defined the variable "${variableName}" for the cell in column ${columnSelected} in the row which ${filterCondition} ${customInput} in column "${transformationComponentValues.selectedColumn}"`}</NormalFont>
          </CustomizedBox>
        )}
    </div>
  );
}
