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

import { FormControlLabel, Select } from '@material-ui/core';
import React from 'react';
import { styled, InputBase } from '@material-ui/core';
import { useStyles } from '../../styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    width: '100%',
    marginLeft: 15,
  },
  '& .MuiInputBase-input': {
    color: '#5F6368',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

const FormInputFieldComponent = (props) => {
  const classes = useStyles();
  const { formInputValue, classnames } = props;
  return (
    <FormControlLabel
      value={formInputValue}
      control={
        <Select
          input={<BootstrapInput className={classes.selectBootstrapInput} />}
          {...props.inputProps}
        >
          {props.children}
        </Select>
      }
      label=""
    />
  );
};

export default FormInputFieldComponent;
