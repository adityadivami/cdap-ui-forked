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

import React from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

export interface ISearchResultListItemProps {
  secondaryText: string;
  icon: boolean;
  primaryText?: string;
  onClick?: () => void;
}

const SearchBarWrapper = styled(Box)`
  display: flex;
  margin: 0px 20px;
  padding: 15px;
  align-items: flex-end;
  cursor: pointer;
  border-bottom: 1px solid ${grey[300]};
`;

const SearchBarTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const PrimaryTextWrapper = styled(Box)`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const SecondaryTextWrapper = styled(Box)`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;

const ArrowForwardIosOutlinedIconWrapper = styled(ArrowForwardIosOutlinedIcon)`
  margin-bottom: 3px;
  opacity: 0.8;
`;

export default function SearchResultsListItem({
  primaryText,
  secondaryText,
  icon,
  onClick,
}: ISearchResultListItemProps) {
  return (
    <SearchBarWrapper onClick={onClick}>
      <SearchBarTextWrapper>
        {primaryText && <PrimaryTextWrapper>{primaryText}</PrimaryTextWrapper>}
        <SecondaryTextWrapper>{secondaryText}</SecondaryTextWrapper>
      </SearchBarTextWrapper>
      {icon && <ArrowForwardIosOutlinedIconWrapper />}
    </SearchBarWrapper>
  );
}
