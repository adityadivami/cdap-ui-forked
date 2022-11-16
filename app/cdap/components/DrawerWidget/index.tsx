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

import { Box, Container, Drawer } from '@material-ui/core';
import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DrawerWidgetHeading from 'components/DrawerWidget/DrawerWidgetHeading';
import { IDrawerWidgetProps } from 'components/DrawerWidget/types';
import { BackIcon } from 'components/DrawerWidget/IconStore/backIcon';
import { FlexAlignCenter, PointerBox } from 'components/common/BoxContainer';
import { VerticalDividerBox } from 'components/common/Divider';
import styled from 'styled-components';

const FlexWrapper = styled(Box)`
  display: flex;
`;

const SimpleBox = styled(Box)`
  display: block;
`;

const DrawerContainerBox = styled(Container)`
  width: 460px;
  height: 100%;
  padding-left: 30px;
`;

const DrawerContainerInnerFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const BackIconBox = styled(Box)`
  cursor: pointer;
  margin-right: 10px;
`;

const DrawerWidgetComponent = styled(Drawer)`
  & .MuiDrawer-paper {
    top: 46px;
    height: calc(100vh - 47px);
  }
`;

export default function({
  headingText,
  openDrawer,
  showDivider,
  headerActionTemplate,
  children,
  closeClickHandler,
  showBackIcon,
  anchor,
  dataTestId
}: IDrawerWidgetProps) {
  return (
    <DrawerWidgetComponent anchor={anchor ? anchor : 'right'} open={openDrawer}>
      <DrawerContainerBox role="presentation" data-testid={dataTestId}>
        <DrawerContainerInnerFlex>
          <FlexAlignCenter>
            {showBackIcon && (
              <BackIconBox onClick={closeClickHandler} data-testid="box-id">
                {BackIcon}
              </BackIconBox>
            )}
            <DrawerWidgetHeading headingText={headingText.toString()} />
          </FlexAlignCenter>
          <FlexWrapper>
            {headerActionTemplate && (
              <SimpleBox data-testid="header-action-template">{headerActionTemplate}</SimpleBox>
            )}
            {showDivider && <VerticalDividerBox data-testid="show-divider-box" />}
            <PointerBox>
              <CloseRoundedIcon
                color="action"
                fontSize="large"
                onClick={closeClickHandler}
                data-testid="drawer-widget-close-round-icon"
              />
            </PointerBox>
          </FlexWrapper>
        </DrawerContainerInnerFlex>
        {children}
      </DrawerContainerBox>
    </DrawerWidgetComponent>
  );
}
