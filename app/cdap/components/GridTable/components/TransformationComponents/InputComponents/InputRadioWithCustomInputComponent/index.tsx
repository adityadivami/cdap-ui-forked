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

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { useStyles } from 'components/GridTable/components/TransformationComponents/styles';
import { IRadioInputWithCustomComponentProps } from 'components/GridTable/components/TransformationComponents/InputComponents/types';

export default function({
  options,
  radioValue,
  setRadioValue,
  customInputType,
  customInput,
  setCustomInput,
}: IRadioInputWithCustomComponentProps) {
  const classes = useStyles();

  return (
    <FormGroup className={classes.formGroupStyles}>
      <FormControl>
        <RadioGroup
          name="actions"
          value={radioValue}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          {options.map((eachRadio) => (
            <FormControlLabel
              value={eachRadio.value}
              className={classes.radioStyles}
              control={<Radio color="primary" />}
              label={eachRadio.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {radioValue === customInputType && (
        <FormControlLabel
          value={customInput}
          className={classes.formFieldStyles}
          control={
            <Input
              classes={{
                underline: classes.underlineStyles,
                input: classes.inputStyles,
              }}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              color="primary"
            />
          }
          label={''}
        />
      )}
    </FormGroup>
  );
}
