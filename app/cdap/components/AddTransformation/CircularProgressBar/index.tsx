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

import { Typography, Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { red, green } from '@material-ui/core/colors';
import { ErrorFont, SuccessText } from 'components/common/TypographyText';

const ArcContainer = styled(Typography)`
  position: absolute;
  top: 0;
  left: 0;
  width: 59px;
  height: 59px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 4px solid #dbdbdb;
  border-bottom-color: ${({ value }) => (value < 100 ? red[600] : green[600])};
  border-right-color: ${({ value }) => (value < 100 ? red[600] : green[600])};
  transform: ${({ value }) => `rotate(${45 + value * 1.8}deg)` || 'rotate(0deg)'};
`;

const ProgressBoxWrapper = styled(Box)`
  position: relative;
  margin: 4px;
  float: left;
  text-align: center;
`;

const ProgressBoxInnerWrapper = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 30px;
  margin-bottom: -20px !important;
`;

export default function({ value }: { value: number }) {
  return (
    <ProgressBoxWrapper>
      <ProgressBoxInnerWrapper>
        <ArcContainer value={Math.round(value)} />
      </ProgressBoxInnerWrapper>
      {Math.round(value) < 100 ? (
        <ErrorFont component="div" data-testid="circular-bar-value">
          {Math.round(value)}%
        </ErrorFont>
      ) : (
        <SuccessText component="div" data-testid="circular-bar-value">
          {Math.round(value)}%
        </SuccessText>
      )}
    </ProgressBoxWrapper>
  );
}
