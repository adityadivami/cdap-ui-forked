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

import { Container, Drawer, Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from 'components/DrawerWidget/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DrawerWidgetHeading from 'components/DrawerWidget/DrawerWidgetHeading';
import { IDrawerWidgetProps } from 'components/DrawerWidget/types';
import { BackIcon } from 'components/DrawerWidget/iconStore';
import { BackIconBox, DrawerContainerInnerFlex, FlexWrapper, FlexAlignCenter } from 'components/common/BoxContainer';
import {VerticalDividerBox} from 'components/common/Divider';

export default function({
  headingText,
  openDrawer,
  showDivider,
  headerActionTemplate,
  children,
  closeClickHandler,
  showBackIcon,
  anchor,
}: IDrawerWidgetProps) {
  const classes = useStyles();

  return (
    <Drawer classes={{ paper: classes.paper }} anchor={anchor ? anchor : 'right'} open={openDrawer}>
      <Container className={classes.drawerContainerStyles} role="presentation">
        <DrawerContainerInnerFlex
        >
          <FlexAlignCenter>
            {showBackIcon && (
              <BackIconBox
                onClick={closeClickHandler}
                data-testid="box-id"
              >
                {BackIcon}
              </BackIconBox>
            )}
            <DrawerWidgetHeading headingText={headingText.toString()} />
          </FlexAlignCenter>
          <FlexWrapper>
            {headerActionTemplate && (
              <Box data-testid="header-action-template">
                {headerActionTemplate}
              </Box>
            )}
            {showDivider && (
              <VerticalDividerBox
                data-testid="show-divider-box"
              />
            )}
            <CloseRoundedIcon
              className={classes.pointerStyles}
              color="action"
              fontSize="large"
              onClick={closeClickHandler}
              data-testid="drawer-widget-close-round-icon"
            />
          </FlexWrapper>
        </DrawerContainerInnerFlex>
        {children}
      </Container>
    </Drawer>
  );
}
