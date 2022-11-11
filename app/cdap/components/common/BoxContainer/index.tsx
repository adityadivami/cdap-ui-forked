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
import { IBoxContainerProps } from 'components/common/BoxContainer/types';

const SimpleBox = styled(Box)`
  display: block;
  position: relative;
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  box-sizing: border-box;
  padding: ${({ padding }) => (padding ? padding : 0)};
  margin: ${({ margin }) => (margin ? margin : 0)};
`;

export const BlockContainer = ({
  children,
  padding,
  margin,
  width,
  height,
  onClick,
  dataTestId,
}: IBoxContainerProps) => (
  <SimpleBox
    padding={padding}
    margin={margin}
    width={width}
    height={height}
    onClick={onClick}
    dataTestId={dataTestId}
  >
    {children}
  </SimpleBox>
);

const CenterAligned = styled(SimpleBox)`
text-align: center;
`;


export const CenterAlignedBox = ({
  children,
  padding,
  margin,
  width,
  height,
  dataTestId,
}: IBoxContainerProps) => (
  <CenterAligned
    padding={padding}
    margin={margin}
    width={width}
    height={height}
    dataTestId={dataTestId}
  >
    {children}
  </CenterAligned>
);

const SimpleFlexBox = styled(SimpleBox)`
  display: flex;
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
`;

const FlexSpaceBox = styled(SimpleFlexBox)`
  justify-content: space-between;
  align-items: center;
`;

export const FlexBoxContainer = ({
  children,
  padding,
  margin,
  width,
  height,
  dataTestId,
  flexDirection
}: IBoxContainerProps) => (
  <SimpleFlexBox
    padding={padding}
    margin={margin}
    width={width}
    height={height}
    dataTestId={dataTestId}
    flexDirection={flexDirection}
  >
    {children}
  </SimpleFlexBox>
);

export const FlexSpaceBetweenContainer = ({
  children,
  padding,
  margin,
  width,
  height,
  dataTestId,
}: IBoxContainerProps) => (
  <FlexSpaceBox
    padding={padding}
    margin={margin}
    width={width}
    height={height}
    dataTestId={dataTestId}
  >
    {children}
  </FlexSpaceBox>
);
