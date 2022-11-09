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
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  padding: ${({ padding }) => (padding ? padding : 0)};
  margin: ${({ margin }) => (margin ? margin : 0)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};
  border: ${({ border }) => (border ? border : 0)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`;

const AbsoluteDiv = styled(SimpleBox)`
  position: absolute;
  top: ${({ top }) => (top ? top : 0)};
  left: ${({ left }) => (left ? left : 0)};
  right: ${({ right }) => (right ? right : 0)};
  bottom: ${({ bottom }) => (bottom ? bottom : 0)};
`;

const SimpleFlexBox = styled(SimpleBox)`
  display: flex;
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'flex-start')};
  align-items: ${({ alignItem }) => (alignItem ? alignItem : 'flex-start')};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
`;

const IconBox = styled(SimpleBox)`
  cursor: pointer;
`;

export default function({
  children,
  type,
  padding,
  margin,
  backgroundColor,
  right,
  left,
  top,
  bottom,
  justifyContent,
  alignItems,
  borderRadius,
  border,
  width,
  height,
  flexDirection,
  onClick,
  dataTestId,
  textAlign,
}: IBoxContainerProps) {
  return (
    <>
      {type == 'SimpleBox' && (
        <SimpleBox
          padding={padding}
          margin={margin}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          border={border}
          width={width}
          height={height}
          onClick={onClick}
          dataTestId={dataTestId}
          textAlign={textAlign}
        >
          {children}
        </SimpleBox>
      )}
      {type == 'AbsoluteDiv' && (
        <AbsoluteDiv
          padding={padding}
          margin={margin}
          backgroundColor={backgroundColor}
          right={right}
          left={left}
          top={top}
          bottom={bottom}
          borderRadius={borderRadius}
          border={border}
          width={width}
          height={height}
          onClick={onClick}
          dataTestId={dataTestId}
          textAlign={textAlign}
        >
          {children}
        </AbsoluteDiv>
      )}
      {type == 'FlexBox' && (
        <SimpleFlexBox
          padding={padding}
          margin={margin}
          backgroundColor={backgroundColor}
          justifyContent={justifyContent}
          alignItem={alignItems}
          borderRadius={borderRadius}
          border={border}
          width={width}
          height={height}
          flexDirection={flexDirection}
          onClick={onClick}
          dataTestId={dataTestId}
          textAlign={textAlign}
        >
          {children}
        </SimpleFlexBox>
      )}
      {type == 'IconBox' && (
        <IconBox
          padding={padding}
          margin={margin}
          backgroundColor={backgroundColor}
          bottom={bottom}
          borderRadius={borderRadius}
          border={border}
          width={width}
          height={height}
          onClick={onClick}
          dataTestId={dataTestId}
          textAlign={textAlign}
        >
          {children}
        </IconBox>
      )}
    </>
  );
}
