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
import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { Box, IconButton, Typography } from '@material-ui/core';
import T from 'i18n-react';
import { UnderlineIcon } from 'components/RecipeDetails/IconStore/UnderlineSVG';

interface IDrawerHeaderProps {
  onCloseDetail: () => void;
}

const MainHeadWrapper = styled(Box)`
  margin-top: 30px;
`;

const HeadWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const RecipeHeaderLabel = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  color: ${grey[900]};
`;

const IconsWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledCommonIconButton = styled(IconButton)`
  padding: 12px;
`;

const StyledEditIcon = styled(EditIcon)`
  fill: ${grey[600]};
  width: 25px;
  height: 25px;
`;

const StyledSaveIcon = styled(SaveAltIcon)`
  fill: ${grey[600]};
  width: 25px;
  height: 25px;
`;

const StyledDeleteIcon = styled(DeleteOutlineIcon)`
  fill: ${grey[600]};
  width: 25px;
  height: 25px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: ${grey[600]};
  width: 25px;
  height: 25px;
`;

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 25px;
  border-left: 1px solid ${grey[300]};
  margin: 0 5px;
`;

export default function({ onCloseDetail }: IDrawerHeaderProps) {
  return (
    <MainHeadWrapper>
      <HeadWrapper>
        <Box>
          <RecipeHeaderLabel>
            {T.translate('features.WranglerNewUI.RecipeDetails.drawerHeader')}
          </RecipeHeaderLabel>
          <UnderlineIcon />
        </Box>
        <IconsWrapper>
          <StyledCommonIconButton>
            <StyledEditIcon />
          </StyledCommonIconButton>
          <StyledCommonIconButton>
            <StyledDeleteIcon />
          </StyledCommonIconButton>
          <StyledCommonIconButton>
            <StyledSaveIcon />
          </StyledCommonIconButton>
          <VerticalDivider />
          <StyledCommonIconButton data-testid="close-detail-icon-button" onClick={onCloseDetail}>
            <StyledCloseIcon data-testid="close-recipe-detail" />
          </StyledCommonIconButton>
        </IconsWrapper>
      </HeadWrapper>
    </MainHeadWrapper>
  );
}
