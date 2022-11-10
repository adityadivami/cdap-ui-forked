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

import React from 'react';
import { useStyles } from 'components/GridTable/components/TransformationComponents/styles';
import { Box, FormGroup, FormHelperText } from '@material-ui/core';
import FormInputFieldComponent from 'components/GridTable/components/TransformationComponents/InputComponents/FormInputFieldComponent';
import LabelComponent from 'components/GridTable/components/TransformationComponents/InputComponents/LabelInputComponent';
import T from 'i18n-react';
import { INewColumnProps } from 'components/GridTable/components/TransformationComponents/InputComponents/types';
import { ErrorLabel } from 'components/common/TypographyText';
import { FlexBoxContainer } from 'components/common/BoxContainer';
import { CALCULATE_PREFIX } from 'components/GridTable/components/TransformationComponents/constants';

export default function({ column, setColumnName, isError }: INewColumnProps) {
  const classes = useStyles();
  return (
    <FlexBoxContainer width="100%">
      <FormGroup classes={{ root: classes.muiFormGroupRootInput }}>
        <LabelComponent labelText={`${T.translate(`${CALCULATE_PREFIX}.nameNewColumn`)}`} />
        <FormInputFieldComponent
          formInputValue={column}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'text',
            value: column,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value),
            color: 'primary',
            placeholder: `${T.translate(`${CALCULATE_PREFIX}.destinationColumn`)}`,
          }}
        />
        {isError && (
          <ErrorLabel
            size="14px"
            component="p"
            weight={400}
            dataTestId="error-text"
            text={T.translate(`${CALCULATE_PREFIX}.columnExist`).toString()}
          />
        )}
      </FormGroup>
    </FlexBoxContainer>
  );
}
