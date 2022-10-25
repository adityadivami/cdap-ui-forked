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
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useStyles } from './styles';
import { IInputCheckbox } from './types';

const InputCheckbox = ({ label, value, onChange, className }: IInputCheckbox) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={className}
      control={
        <Checkbox
          onChange={onChange}
          checked={value}
          color="primary"
          data-testid={`parsing-checkbox-${label}`}
        />
      }
      label={<span className={classes.labelTextStyles}>{label}</span>}
    />
  );
};

export default InputCheckbox;
