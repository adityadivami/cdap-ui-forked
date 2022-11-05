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
import HeaderCustomTooltip from 'components/ConnectionList/Components/HeaderCustomTooltip';
import HeaderSearch from 'components/ConnectionList/Components/HeaderSearch';
import { useStyles } from 'components/ConnectionList/styles';
import { IHeaderContentProps } from 'components/ConnectionList/types';
import React from 'react';

export default function({
  eachFilteredData,
  headersRefs,
  index,
  dataForTabs,
  filteredData,
  searchHandler,
  makeCursorFocused,
  handleSearch,
  refs,
  handleClearSearch,
}: IHeaderContentProps) {
  const classes = useStyles();

  return (
    <>
      <Box
        className={
          eachFilteredData.toggleSearch
            ? classes.hideComponent
            : classes.beforeSearchIconClickDisplay
        }
      >
        <HeaderCustomTooltip
          headersRefs={headersRefs}
          index={index}
          dataForTabs={dataForTabs}
          filteredData={filteredData}
        />

        <Box
          onClick={() => {
            searchHandler(index);
          }}
        >
          <IconButton>
            <SearchRounded />
          </IconButton>
        </Box>
      </Box>
      <HeaderSearch
        eachFilteredData={eachFilteredData}
        index={index}
        refs={refs}
        makeCursorFocused={makeCursorFocused}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
    </>
  );
}
