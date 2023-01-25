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

import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export interface IDropdownProps {
  label: string;
  menuList: IMenuItem[];
}

export interface IMenuItem {
  label: string;
  value: string;
}

export const StyledLabel = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.4px;
  color: ${grey[700]};
`;

export const StyledFormControl = styled(FormControl)`
  width: 350px;
  .MuiSelect-select:focus {
    background-color: transparent;
  }
  .MuiSelect-icon {
    width: 24px;
    height: 24px;
  }
`;

export default function Dropdown({ label, menuList }: IDropdownProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const onOptionChange = (event) => {
    setSelectedMenuItem(event.target.value);
  };

  return (
    <>
      <StyledFormControl>
        <StyledLabel>{label}</StyledLabel>
        <Select value={selectedMenuItem} onChange={onOptionChange} displayEmpty>
          {Boolean(menuList.length) &&
            menuList.map((eachOption) => {
              return <MenuItem value={eachOption.value}>{eachOption.label}</MenuItem>;
            })}
        </Select>
      </StyledFormControl>
    </>
  );
}
