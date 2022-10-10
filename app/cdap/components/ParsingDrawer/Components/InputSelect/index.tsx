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
import { MenuItem, Select } from '@material-ui/core';

const InputSelect = (props) => {
  const {
    options,
    value,
    onChange,
    classes,
    className,
    fullWidth,
    optionClassName,
    defaultValue,
  } = props;

  return (
    <Select
      classes={{ ...classes }}
      className={className}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      displayEmpty={false}
      defaultValue={defaultValue}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        getContentAnchorEl: null,
      }}
    >
      {options.map((option) => {
        return (
          <MenuItem classes={...optionClassName} value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default InputSelect;
