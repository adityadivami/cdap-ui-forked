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

import React, { PropsWithChildren } from 'react';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Divider, Typography } from '@material-ui/core';
import { grey, lightGreen } from '@material-ui/core/colors';
import styled from 'styled-components';

export interface ISectionComponentProps {
  showTickIcon: boolean;
  title: string;
  showDivider?: boolean;
}

const SectionTitle = styled(Typography)`
  &&& {
    color: ${grey[700]};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.25px;
    line-height: 36px;
    text-transform: uppercase;
  }
`;

const TitleTextIconWrapper = styled.section`
  &&& {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;

const TickIcon = styled(CheckCircleOutlinedIcon)`
  color: ${lightGreen[400]};
  font-size: 20px;
  height: 20px;
  width: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export default function SectionComponent({
  children,
  showDivider,
  showTickIcon,
  title,
}: PropsWithChildren<ISectionComponentProps>) {
  return (
    <>
      <TitleTextIconWrapper>
        <SectionTitle component="h4">{title}</SectionTitle>
        {showTickIcon && <TickIcon />}
      </TitleTextIconWrapper>
      <FlexContainer>
        {children}
        {showDivider && <Divider />}
      </FlexContainer>
    </>
  );
}
