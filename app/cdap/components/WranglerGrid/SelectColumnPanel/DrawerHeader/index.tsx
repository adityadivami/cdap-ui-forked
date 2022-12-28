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

import { Box, Container, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import styled from 'styled-components';
import { FlexAlignCenter, PointerBox } from 'components/common/BoxContainer';
import { HeadFont } from 'components/common/TypographyText';
import T from 'i18n-react';
import {
  ADD_TRANSFORMATION_PREFIX,
  MULTI_SELECTION_COLUMN,
} from 'components/WranglerGrid/SelectColumnPanel/constants';
import grey from '@material-ui/core/colors/grey';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { blue } from '@material-ui/core/colors';
import { IMultipleSelectedFunctionDetail } from '../types';

interface IDrawerHeaderProps {
  closeClickHandler: () => void;
  transformationName: string;
}

export const UnderLine = (
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

const FlexWrapper = styled(Box)`
  display: flex;
`;

const Wrapper = styled(Container)`
  padding-left: 0;
  padding-right: 0;
`;

const DrawerContainerInnerFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const DrawerHeadWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export default function({ closeClickHandler, transformationName }: IDrawerHeaderProps) {
  const [isSingleSelection, setIsSingleSelection] = useState(true);

  useEffect(() => {
    const multiSelect = MULTI_SELECTION_COLUMN?.findIndex(
      (functionDetail: IMultipleSelectedFunctionDetail) =>
        functionDetail.value.toLowerCase() === transformationName.toLowerCase()
    );
    multiSelect > -1 && setIsSingleSelection(false);
  }, []);

  return (
    <Wrapper data-testid="select-column-drawer">
      <DrawerContainerInnerFlex>
        <FlexAlignCenter>
          <StyledIconButton
            onClick={closeClickHandler}
            aria-label="back-icon"
            data-testid="back-icon"
          >
            <BackIcon />
          </StyledIconButton>
          <DrawerHeadWrapper>
            <HeadFont component="p" data-testid="drawer-heading">
              {isSingleSelection && T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnHeading`)}
              {!isSingleSelection &&  T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectMultiColumnsHeading`)}
            </HeadFont>
            {UnderLine}
          </DrawerHeadWrapper>
        </FlexAlignCenter>
        <FlexWrapper>
          <PointerBox>
            <CloseRoundedIcon
              color="action"
              fontSize="large"
              onClick={closeClickHandler}
              data-testid="select-column-drawer-close-icon"
            />
          </PointerBox>
        </FlexWrapper>
      </DrawerContainerInnerFlex>
    </Wrapper>
  );
}
