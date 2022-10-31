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
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useStyles } from 'components/FormInputRadio/styles';
import { IFormInputRadioProps } from 'components/FormInputRadio/types';

const FormInputRadio = ({ options, radioValue, setRadioValue }: IFormInputRadioProps) => {
  const classes = useStyles();
  return (
    <FormControl>
      <RadioGroup name="actions" value={radioValue} onChange={setRadioValue}>
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
  );
};
export default FormInputRadio;
