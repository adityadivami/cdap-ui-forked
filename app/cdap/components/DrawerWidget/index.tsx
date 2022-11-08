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
import React, { Fragment } from 'react';
import { useStyles } from 'components/DrawerWidget/styles';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DrawerWidgetHeading from 'components/DrawerWidget/DrawerWidgetHeading';
import { IDrawerWidgetProps } from 'components/DrawerWidget/types';
import { BackIcon } from 'components/DrawerWidget/iconStore';
import BoxContainer from 'components/common/BoxContainer';

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
        <BoxContainer
          type="FlexBox"
          justifyContent="space-between"
          alignItems="center"
          height="60px"
        >
          <BoxContainer type="FlexBox" alignItems="center">
            {showBackIcon && (
              <BoxContainer type="IconBox" onClick={closeClickHandler} dataTestId="box-id">
                {BackIcon}
              </BoxContainer>
            )}
            <DrawerWidgetHeading headingText={headingText.toString()} />
          </BoxContainer>
          <BoxContainer type="FlexBox" alignItems="center">
            {headerActionTemplate && (
              <BoxContainer type="SimpleBox" dataTestId="header-action-template">
                {headerActionTemplate}
              </BoxContainer>
            )}
            {showDivider && (
              <BoxContainer
                type="SimpleBox"
                alignItems="center"
                dataTestId="show-divider-box"
                width="1px"
                height="28px"
                backgroundColor="#DADCE0"
                margin="0 15px"
              />
            )}
            <CloseRoundedIcon
              className={classes.pointerStyles}
              color="action"
              fontSize="large"
              onClick={closeClickHandler}
              data-testid="drawer-widget-close-round-icon"
            />
          </BoxContainer>
        </BoxContainer>
        <>{children}</>
      </Container>
    </Drawer>
  );
}
