/*
 *  Copyright © 2022 Cask Data, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy of
 *  the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations under
 *  the License.
 */

import { blue, grey } from '@material-ui/core/colors';
import React, { useState, MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { Box, Button, IconButton, MenuItem, Popover, Typography } from '@material-ui/core';
import T from 'i18n-react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

interface IDrawerHeaderProps {
  onCloseDetail: () => void;
}

const MainHeadWrapper = styled(Box)`
  margin-top: 20px;
`;

const HeadWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecipeHeaderLabel = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  color: ${grey[900]};
  padding: 1px;
`;

const IconsWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledCommonIconButton = styled(IconButton)`
  padding: 12px;
`;

const CommonIcons = css`
  fill: ${grey[600]};
  width: 25px;
  height: 25px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  ${CommonIcons}
`;

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 25px;
  border-left: 1px solid ${grey[300]};
  margin: 0 5px;
`;

const HeaderWithUnderline = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledActionButton = styled(Button)`
  color: ${grey[700]};
  font-weight: 500;
`;

const PREFIX = 'features.WranglerNewUI.RecipeDetails'

export default function ({ onCloseDetail }: IDrawerHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleActions = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <MainHeadWrapper>
      <HeadWrapper>
        <HeaderWithUnderline>
          <RecipeHeaderLabel>
            {T.translate(`${PREFIX}.drawerHeader`)}
          </RecipeHeaderLabel>
        </HeaderWithUnderline>
        <IconsWrapper>
          <StyledActionButton data-testid="actions-applied-button" aria-describedby={id} variant="text" onClick={handleActions}>
            {T.translate(`${PREFIX}.actions`)}
            {anchorEl && <ArrowDropUpIcon/>}
            {anchorEl === null && <ArrowDropDownIcon/>}
          </StyledActionButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem>{T.translate(`${PREFIX}.edit`)}</MenuItem>
            <MenuItem>{T.translate(`${PREFIX}.download`)}</MenuItem>
            <MenuItem>{T.translate(`${PREFIX}.delete`)}</MenuItem>
          </Popover>
          <VerticalDivider />
          <StyledCommonIconButton data-testid="close-detail-icon-button" onClick={onCloseDetail}>
            <StyledCloseIcon data-testid="close-recipe-detail" />
          </StyledCommonIconButton>
        </IconsWrapper>
      </HeadWrapper>
    </MainHeadWrapper>
  );
}
