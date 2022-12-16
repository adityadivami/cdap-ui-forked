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

import { Box, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { grey, blue } from '@material-ui/core/colors';

interface IDrawerWidgetHeadingProps {
  headingText: React.ReactNode;
}

const UnderLine = (
  <svg width="67" height="2" viewBox="0 0 67 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H50L53 2H3L0 0Z" fill={blue[500]} />
    <path d="M54 0H63.5L66.5 2H57L54 0Z" fill={blue[500]} />
  </svg>
);

export default function({ headingText }: IDrawerWidgetHeadingProps) {
  const StyledHeadingIconWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const StyledHeadingText = styled(Typography)`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 0.15px;
    color: ${grey[900]};
  `;

  return (
    <StyledHeadingIconWrapper>
      <StyledHeadingText data-testid="drawer-widget-heading">{headingText}</StyledHeadingText>
      {UnderLine}
    </StyledHeadingIconWrapper>
  );
}
