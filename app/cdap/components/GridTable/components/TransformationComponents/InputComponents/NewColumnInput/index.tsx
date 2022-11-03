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
import { useStyles } from '../../styles';
import { Box, FormGroup, FormHelperText } from '@material-ui/core';
import FormInputFieldComponent from '../FormInputFieldComponent';
import LabelComponent from '../LabelInputComponent';
import T from 'i18n-react';
import { INewColumnProps } from '../types';

export default function({ column, setColumnName, isError }: INewColumnProps) {
  const classes = useStyles();
  return (
    <Box className={classes.calculateFlex}>
      <FormGroup classes={{ root: classes.muiFormGroupRootInput }}>
        <LabelComponent
          labelText={`${T.translate('features.DirectiveUIComponent.calculate.nameNewColumn')}`}
        />
        <FormInputFieldComponent
          formInputValue={column}
          classnames={classes.formFieldStyles}
          inputProps={{
            classes: { underline: classes.underlineStyles, input: classes.inputStyles },
            type: 'text',
            value: column,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setColumnName(e.target.value),
            color: 'primary',
            placeholder: `${T.translate(
              'features.DirectiveUIComponent.calculate.destinationColumn'
            )}`,
          }}
        />
        {isError && (
          <FormHelperText error={isError} classes={{ root: classes.errorText }}>
            {T.translate('features.DirectiveUIComponent.calculate.columnExist')}
          </FormHelperText>
        )}
      </FormGroup>
    </Box>
  );
}
