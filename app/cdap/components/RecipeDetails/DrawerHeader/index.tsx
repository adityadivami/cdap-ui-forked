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
import { Box, Typography } from '@material-ui/core';
import T from 'i18n-react';

const UnderLine = (
  <svg
    width="67"
    height="2"
    viewBox="0 0 67 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="underline"
  >
    <path d="M0 0H50L53 2H3L0 0Z" fill={blue[500]} />
    <path d="M54 0H63.5L66.5 2H57L54 0Z" fill={blue[500]} />
  </svg>
);

const MainHeadWrapper = styled(Box)`
  margin-top: 30px;
`;

const HeadWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const HeadingBox = styled(Box)``;

const RecipeHead = styled(Typography)`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  color: ${grey[900]};
`;

const IconsWrapper = styled(Box)``;

const CustomizedEditIcon = styled(EditIcon)`
  fill: ${grey[600]};
  cursor: pointer;
  margin-right: 5px;
  width: 25px;
  height: 25px;
`;

const CustomizedSaveIcon = styled(SaveAltIcon)`
  fill: ${grey[600]};
  cursor: pointer;
  margin-right: 5px;
  width: 25px;
  height: 25px;
`;

const CustomizedDeleteIcon = styled(DeleteOutlineIcon)`
  fill: ${grey[600]};
  cursor: pointer;
  margin-right: 5px;
  width: 25px;
  height: 25px;
`;

const CustomizedCloseIcon = styled(CloseIcon)`
  fill: ${grey[600]};
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 25px;
  border: 1px solid ${grey[300]};
`;

export default function({ onCloseDetail }) {
  return (
    <MainHeadWrapper>
      <HeadWrapper>
        <HeadingBox>
          <RecipeHead>
            {T.translate('features.WranglerNewUI.RecipeDetails.recipeDetailHead')}
          </RecipeHead>
          {UnderLine}
        </HeadingBox>
        <IconsWrapper>
          <CustomizedEditIcon />
          <CustomizedDeleteIcon />
          <CustomizedSaveIcon />
          <VerticalDivider />
          <CustomizedCloseIcon data-testid="close-recipe-detail" onClick={onCloseDetail} />
        </IconsWrapper>
      </HeadWrapper>
    </MainHeadWrapper>
  );
}
