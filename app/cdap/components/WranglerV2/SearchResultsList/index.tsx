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

import { Box } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import SearchResultsListItem, { ISearchResultListItemProps } from '../SearchResultsListItem';

export interface ISearchResultListProps {
  resultsList: ISearchResultListItemProps[];
  showIcon: boolean;
  handleClick: (value: ISearchResultListItemProps) => void;
  anchorEl: Element;
  handleClose: () => void;
}

const SearchListWrapper = styled(Box)`
  height: 247px;
  position: absolute;
  width: 100%;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  bottom: 120px;
  background: #ffffff;
`;

export default function SearchResultsList({
  resultsList = [],
  showIcon,
  handleClick,
  anchorEl,
  handleClose,
}: ISearchResultListProps) {
  return (
    <SearchListWrapper>
      {resultsList.map((eachResult, index) => (
        <SearchResultsListItem
          key={index}
          icon={showIcon}
          onClick={() => handleClick(eachResult)}
          primaryText={eachResult.primaryText}
          secondaryText={eachResult.secondaryText}
        />
      ))}
    </SearchListWrapper>
  );
}
