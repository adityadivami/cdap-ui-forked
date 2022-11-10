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
import { CALCULATE_OPTIONS } from 'components/GridTable/components/NestedMenu/menuOptions/calculateOptions';
import FormInputFieldComponent from 'components/GridTable/components/TransformationComponents/InputComponents/FormInputFieldComponent';
import { FormGroup } from '@material-ui/core';
import { useStyles } from 'components/GridTable/components/TransformationComponents/styles';
import InputCheckbox from 'components/GridTable/components/TransformationComponents/InputComponents/InputCheckbox';
import T from 'i18n-react';
import { ICalculateProps } from 'components/GridTable/components/TransformationComponents/Calculate/types';
import NewColumnInput from 'components/GridTable/components/TransformationComponents/InputComponents/NewColumnInput';
import { SimpleLabel } from 'components/common/TypographyText';
import { BlockContainer, FlexBoxContainer } from 'components/common/BoxContainer';
import { CALCULATE_PREFIX } from 'components/GridTable/components/TransformationComponents/constants';

export default function({
  transformationName,
  setTransformationComponentsValue,
  transformationComponentValues,
}: ICalculateProps) {
  const [customInput, setCustomInput] = useState<string>('');
  const [copyToNewColumn, setCopyToNew] = useState<boolean>(false);
  const [column, setColumnName] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const UI_INPUT =
    CALCULATE_OPTIONS?.length > 0
      ? CALCULATE_OPTIONS.filter((option) => option?.value === transformationName)
      : [];
  const classes = useStyles();
  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, customInput });
  }, [customInput]);
  useEffect(() => {
    setTransformationComponentsValue({ ...transformationComponentValues, copyToNewColumn });
  }, [copyToNewColumn]);
  useEffect(() => {
    if (
      transformationComponentValues?.columnNames?.filter((name: string) => name === column).length
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setTransformationComponentsValue({ ...transformationComponentValues, copyColumnName: column });
  }, [column]);

  return (
    <BlockContainer margin="10px 0 0">
      <div>
        {UI_INPUT?.length > 0 &&
          UI_INPUT.map((item) =>
            item.value === 'CHARCOUNT' ? (
              <NewColumnInput column={column} setColumnName={setColumnName} isError={isError} />
            ) : item.inputRequired ? (
              <BlockContainer>
                <SimpleLabel
                  size="16px"
                  weight={600}
                  text={
                    item?.sign
                      ? `${T.translate(`${CALCULATE_PREFIX}.enterValueTo`)} ${transformationName}`
                      : ''
                  }
                />
                <FlexBoxContainer margin="10px 0 0">
                  {item?.sign && (
                    <BlockContainer margin="10px">
                      <SimpleLabel size="14px" text={item?.sign} />
                    </BlockContainer>
                  )}
                  <FormGroup classes={{ root: classes.muiFormGroupRootInput }}>
                    <FormInputFieldComponent
                      formInputValue={customInput}
                      classnames={classes.formFieldStyles}
                      inputProps={{
                        classes: { underline: classes.underlineStyles, input: classes.inputStyles },
                        type: 'number',
                        value: customInput,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setCustomInput(e.target.value),
                        color: 'primary',
                        placeholder: 'Enter value, e.g. 3',
                      }}
                    />
                  </FormGroup>
                </FlexBoxContainer>
              </BlockContainer>
            ) : (
              <></>
            )
          )}
      </div>
      {transformationName !== 'CHARCOUNT' && (
        <FormGroup>
          <InputCheckbox
            label={`${T.translate(`${CALCULATE_PREFIX}.copyToNewColumn`)}`}
            value={copyToNewColumn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCopyToNew(e.target.checked)}
            className={classes.checkboxStyles}
          />
          {copyToNewColumn && (
            <NewColumnInput column={column} setColumnName={setColumnName} isError={isError} />
          )}
        </FormGroup>
      )}
    </BlockContainer>
  );
}
