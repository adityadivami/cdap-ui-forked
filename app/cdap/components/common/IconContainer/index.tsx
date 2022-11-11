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
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const IconBox = styled(Box)`
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : 'auto')};
  margin: ${({ margin }) => (margin ? margin : 0)};
`;

export const IconContainer = ({
  children,
  margin,
  onClick,
  dataTestId,
  isPointer
}) => (
  <IconBox
    margin={margin}
    onClick={onClick}
    dataTestId={dataTestId}
    isPointer={isPointer}
  >
    {children}
  </IconBox>
);
