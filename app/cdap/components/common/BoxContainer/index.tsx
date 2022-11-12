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
import { SxProps } from '@material-ui/system/styleFunctionSx';

interface IBoxContainerProps {
  children?: JSX.Element[] | JSX.Element;
  onClick?: () => void;
  dataTestId?: string;
  sx?: SxProps;
}

const SimpleBox = styled(Box)(({ theme }) => ({
  display: 'block',
  position: 'relative',
}));

export const BlockContainer = ({ children, onClick, dataTestId, sx }: IBoxContainerProps) => (
  <SimpleBox onClick={onClick} data-testid={dataTestId} sx={sx}>
    {children}
  </SimpleBox>
);

const SimpleFlexBox = styled(SimpleBox)(({ theme }) => ({
  display: 'flex',
}));

export const FlexBoxContainer = ({ children, sx, dataTestId }: IBoxContainerProps) => (
  <SimpleFlexBox data-testid={dataTestId} sx={sx}>
    {children}
  </SimpleFlexBox>
);
