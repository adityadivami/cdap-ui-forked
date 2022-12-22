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
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderTemplate from 'components/ImportRecipeStepper/HeaderTemplate';
import { grey } from '@material-ui/core/colors';
import T from 'i18n-react';
import { PrimaryTextLowercaseButton } from 'components/shared/Buttons/PrimaryTextLowercaseButton';
import RecipeList from 'components/RecipeList';
import IconSVG from 'components/shared/IconSVG';
import { SortBy, SortOrder } from 'components/RecipeList/types';

export const dateFormatting = (millisecondsTime) => {
  const normalDateString = new Date(millisecondsTime);
  const splitTime = normalDateString.toLocaleTimeString('en-US').split(':');
  const timeFormat = `${splitTime[0]}:${splitTime[1]}${splitTime[2].split(' ')[1]}`;
  const getMonthName = normalDateString.toLocaleString('default', { month: 'long' });
  const finalFormat = `${normalDateString.getDate()} ${getMonthName}, ${timeFormat}`;
  return finalFormat;
};

const Wrapper = styled(Box)`
  padding-left: 25px;
`;

const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 25% 15% 40% 20%;
  align-items: center;
  padding: 20px 10px;
  &:hover {
    background: ${grey[300]};
    cursor: pointer;
  }
`;

const GridHeadWrapper = styled(GridWrapper)`
  padding: 10px;
  &:hover {
    background: transparent;
    cursor: unset;
  }
  cursor: unset;
`;

const HeadDivider = styled(Box)`
  width: 100%;
  opacity: 0.6;
  border-bottom: 1px solid ${grey[700]};
`;

const CellDivider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${grey[300]};
`;

const GridHead = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

const GridCellText = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${grey[700]};
`;

export const DrawerContainerStyle = styled(Box)`
  width: 1010px;
  height: calc(100vh - 190px);
  border-right: 1px solid ${grey[300]};
  padding-left: 20px;
  padding-right: 20px;
`;

const PREFIX = 'features.WranglerNewUI.Recipe';
export default function({ previousStep, nextStep }) {
  const handleSelectRecipe = (selectedObject: any) => {
    console.log('selectedObject', selectedObject);
    nextStep(selectedObject);
    // alert(`Selected Recipe to apply : ${JSON.stringify(selectedObject)}`);
    // To do : Implement apply functionality from here
  };

  return (
    <Box m={2}>
      <RecipeList
        isOpen={true}
        showAllColumns={false}
        showActions={false}
        selectHandler={handleSelectRecipe}
        sortBy={SortBy.UPDATED}
        sortOrder={SortOrder.DESCENDING}
        pageSize={6}
        showPagination={true}
        enableSorting={true}
      />
    </Box>
  );
}
