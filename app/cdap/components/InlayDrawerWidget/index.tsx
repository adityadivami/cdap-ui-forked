/*
 * Copyright © 2023 Cask Data, Inc.
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

import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { PREFIX } from 'components/InlayDrawerWidget/InlayDrawerWidget.stories';
import T from 'i18n-react';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface IMenuItem {
  clickHandler: () => void;
  label: string;
  value: string;
}

interface IRecipeStepWidgetProps {
  actionsOptions: IMenuItem[];
  headingText: string;
  onClose: () => void;
  position: 'left' | 'right';
  disableActionsButton?: boolean;
  showDivider?: boolean;
}

const Container = styled(Box)`
  border-left: 1px solid ${grey[300]};
  height: calc(100vh - 232px);
  overflow: scroll;
  padding-left: 20px;
  padding-right: 10px;
  position: relative;
  width: 500px;
`;

const Divider = styled.div`
  background-color: ${grey[300]};
  height: 28px;
  margin-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0px;
  width: 1px;
`;

const Label = styled(Typography)`
  &.MuiTypography-body1 {
    color: ${grey[900]};
    font-style: normal;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 32px;
    text-align: left;
  }
`;

const IconWrapper = styled(Box)`
  align-items: center;
  display: flex;
`;

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
`;

const LeftContainer = styled(Container)`
  border-left: none;
  border-right: 1px solid ${grey[300]};
`;

const MenuButton = styled(Button)`
  &.MuiButton-root {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.25px;
    line-height: 24px;
    text-align: center;
  }
`;

const StyledIconButton = styled(IconButton)`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-align: left;
  }
`;

const getContainerComponent = (position: 'left' | 'right') => {
  if (position === 'left') {
    return LeftContainer;
  }
  return Container;
};

/**
 *
 * @param label - any space-separated string
 * @returns - an hyphen-separated string, spaces in the received string are replaced by hyphens
 */
export const getTestIdString = (label: string) =>
  label
    .trim()
    .split(' ')
    .join('-')
    .toLowerCase();

/**
 *
 * @param actionsOptions - the options to be rendered inside the actions dropdown, an array of objects
 * @param children - the child component to be rendered as body in this panel
 * @param disableActionsButton - boolean value to disable the Actions button in panel header when set to true
 * @param headingText - text to be displayed as header of the panel
 * @param onClose - handles event triggered when close icon is clicked
 * @param position - the position of the panel, either left or right, based on how components are positioned in parent. by default position is right
 * @param showDivider - when set to true, displays a divider to the left side of the close icon, generally used to separate close icon from other action icons
 * @returns InlayDrawerWidget component
 */

export default function InlayDrawerWidget({
  actionsOptions,
  children,
  disableActionsButton,
  headingText,
  onClose,
  position = 'right',
  showDivider,
}: PropsWithChildren<IRecipeStepWidgetProps>) {
  const PanelContainer = getContainerComponent(position);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PanelContainer data-testid="inlay-drawer-widget-parent" role="presentation">
      <StyledHeader>
        <Label data-testid="drawer-widget-heading">{headingText}</Label>
        <IconWrapper>
          {Boolean(actionsOptions.length) && (
            <div>
              <MenuButton
                aria-controls="inlay-drawer-widget-menu"
                aria-haspopup="true"
                data-testid="inlay-drawer-actions-menu"
                disabled={disableActionsButton}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
              >
                {T.translate(`${PREFIX}.buttonLabels.actions`)}
              </MenuButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                getContentAnchorEl={null}
                id="inlay-drawer-widget-menu"
                keepMounted
                onClose={handleClose}
                open={Boolean(anchorEl)}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
              >
                {actionsOptions.map((eachOption) => {
                  const testId = getTestIdString(eachOption.label);
                  return (
                    <StyledMenuItem
                      data-testid={`menu-item-${testId}`}
                      key={`menu-item-${testId}`}
                      onClick={eachOption.clickHandler}
                    >
                      {eachOption.label}
                    </StyledMenuItem>
                  );
                })}
              </Menu>
            </div>
          )}
          {showDivider && <Divider />}
          <StyledIconButton
            aria-label="inlay drawer widget close icon"
            data-testid="inlay-drawer-widget-close-icon"
            onClick={onClose}
          >
            <CloseRoundedIcon color="action" />
          </StyledIconButton>
        </IconWrapper>
      </StyledHeader>
      {children}
    </PanelContainer>
  );
}
