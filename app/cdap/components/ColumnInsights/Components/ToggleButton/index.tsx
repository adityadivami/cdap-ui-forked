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

import { Box } from '@material-ui/core';
import RenderLabel from 'components/ColumnInsights/Components/common/RenderLabel/';
import React from 'react';
import styled from 'styled-components';
import { IToggleButtonProps } from 'components/ColumnInsights/Components/ToggleButton/types';

const StyledToggleBox = styled(Box)`
  border-top-left-radius: ${(props) => (props.type === 'left' ? 4 : 0)}px;
  border-bottom-left-radius: ${(props) => (props.type === 'left' ? 4 : 0)}px;
  border-top-right-radius: ${(props) => (props.type === 'right' ? 4 : 0)}px;
  border-bottom-right-radius: ${(props) => (props.type === 'right' ? 4 : 0)}px;
  border-right: ${(props) => (props.type === 'left' ? 0 : 1)}px;
  border: 1px solid #dadce0;
  width: 50%;
  text-align: center;
  padding: 10px;
  cursor: pointer;
`;

export default function({ children, type, setIsSelected, className }: IToggleButtonProps) {
  return (
    <StyledToggleBox
      type={type}
      onClick={() => {
        type === 'left' ? setIsSelected(1) : setIsSelected(2);
      }}
      role="button"
      className={className}
    >
      <RenderLabel type="simple" fontSize={14}>
        {children}
      </RenderLabel>
    </StyledToggleBox>
  );
}
