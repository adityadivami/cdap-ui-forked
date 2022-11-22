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
import styled from 'styled-components';
import { BackIcon } from 'components/WranglerGrid/SelectColumnPanel/IconStore/backIcon';
import { UnderLine } from 'components/WranglerGrid/SelectColumnPanel/IconStore/underline';
import { FlexAlignCenter, PointerBox } from 'components/common/BoxContainer';
import { HeadFont } from 'components/common/TypographyText';
import T from 'i18n-react';
import { ADD_TRANSFORMATION_PREFIX } from 'components/WranglerGrid/SelectColumnPanel/constants';

interface ISelectColumnDrawerHeaderProps {
  closeClickHandler: () => void;
}

const FlexWrapper = styled(Box)`
  display: flex;
`;

const DrawerContainerBox = styled(Container)`
  padding-left: 0;
  padding-right: 0;
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

const DrawerHeadWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export default function({ closeClickHandler }: ISelectColumnDrawerHeaderProps) {
  return (
    <DrawerContainerBox role="presentation" data-testid="select-column-drawer">
      <DrawerContainerInnerFlex>
        <FlexAlignCenter>
          <BackIconBox onClick={closeClickHandler} data-testid="box-id">
            {BackIcon}
          </BackIconBox>
          <DrawerHeadWrapper>
            <HeadFont component="p" data-testid="drawer-heading">
              {T.translate(`${ADD_TRANSFORMATION_PREFIX}.selectColumnPara`)}
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
    </DrawerContainerBox>
  );
}
