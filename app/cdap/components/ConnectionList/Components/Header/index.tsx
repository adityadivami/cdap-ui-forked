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

import { Box, IconButton } from '@material-ui/core';
import SearchRounded from '@material-ui/icons/SearchRounded';
import Search from 'components/ConnectionList/Components/Search';
import HeaderLabelWrapper from 'components/ConnectionList/Components/HeaderLabelWrapper';
import { IHeaderContentProps } from 'components/ConnectionList/types';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const ConnectionListHeaderWrapper = styled(Box)`
  display: ${(props) => (props.toggleSearch ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-right: 18px;
  padding-left: 30px;
`;

export default function({
  eachFilteredData,
  headersRefs,
  columnIndex,
  tabsData,
  filteredData,
  searchHandler,
  makeCursorFocused,
  handleSearch,
  refs,
  handleClearSearch,
}: IHeaderContentProps) {
  return (
    <Fragment>
      <ConnectionListHeaderWrapper toggleSearch={eachFilteredData.toggleSearch}>
        <HeaderLabelWrapper
          headersRefs={headersRefs}
          columnIndex={columnIndex}
          tabsData={tabsData}
          filteredData={filteredData}
        />
        <IconButton onClick={() => searchHandler(columnIndex)}>
          <SearchRounded />
        </IconButton>
      </ConnectionListHeaderWrapper>
      <Search
        eachFilteredData={eachFilteredData}
        columnIndex={columnIndex}
        refs={refs}
        makeCursorFocused={makeCursorFocused}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
    </Fragment>
  );
}
