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
import Close from '@material-ui/icons/Close';
import SearchRounded from '@material-ui/icons/SearchRounded';
import HeaderSearchInputField from 'components/ConnectionList/Components/HeaderSearchInputField';
import { IHeaderSearchProps } from 'components/ConnectionList/types';
import React, { MouseEvent } from 'react';
import styled from 'styled-components';

const ConnectionListSearchWrapper = styled(Box)`
  display: ${(props) => (props.toggleSearch ? 'flex' : 'none')};
  background-color: #fff;
  align-items: center;
  height: 50px;
  padding-right: 20px;
  padding-left: 18px;
  text-decoration: none;
`;

export default function({
  eachFilteredData,
  columnIndex,
  refs,
  makeCursorFocused,
  handleSearch,
  handleClearSearch,
}: IHeaderSearchProps) {
  return (
    <ConnectionListSearchWrapper
      toggleSearch={eachFilteredData.toggleSearch}
      onMouseOver={() => makeCursorFocused(columnIndex)}
    >
      <SearchRounded />
      <HeaderSearchInputField
        refs={refs}
        onChange={handleSearch}
        columnIndex={columnIndex}
        type="text"
      />
      <Box
        onClick={(e: MouseEvent<HTMLInputElement>) => {
          return handleClearSearch(e, columnIndex);
        }}
      >
        <Close />
      </Box>
    </ConnectionListSearchWrapper>
  );
}
