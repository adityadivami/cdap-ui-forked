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

import { Box, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { UnderLine } from 'components/RecipeSteps/IconStore/Underline';
import styled from 'styled-components';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { grey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';

const DrawerWidgetTitleIconWrapper = styled(Box)`
  display: flex;
  align-items: self-start;
  margin-top: 16px;
`;

const DrawerWidgetTitleLabel = styled(Typography)`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 0.15;
  color: ${grey[900]};
`;

const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackIcon = styled(ChevronLeftRoundedIcon)`
  font-size: 40px;
  color: ${grey[600]};
`;

const StyledIconButton = styled(IconButton)`
  padding: 0px;
  width: 26px;
  justify-content: end;
  &.MuiIconButton-root:hover {
    background-color: transparent;
  }
  & .MuiTouchRipple-root {
    display: none;
  }
`;

export default function({ headingText, previousStep }) {
  return (
    <HeaderWrapper data-testid="import-recipe-header">
      <DrawerWidgetTitleIconWrapper>
        <StyledIconButton data-testid="back-icon-step" onClick={() => previousStep()}>
          <BackIcon />
        </StyledIconButton>
        <Box>
          <DrawerWidgetTitleLabel>{headingText}</DrawerWidgetTitleLabel>
          {UnderLine}
        </Box>
      </DrawerWidgetTitleIconWrapper>
      <StyledIconButton data-testid="close-icon-step" onClick={() => previousStep()}>
        <CloseIcon />
      </StyledIconButton>
    </HeaderWrapper>
  );
}
